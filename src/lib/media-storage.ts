import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

let configured = false;

export function isCloudinaryConfigured(): boolean {
  return Boolean(process.env.CLOUDINARY_URL);
}

function getCloudinary() {
  if (!process.env.CLOUDINARY_URL) {
    throw new Error('Cloudinary is not configured. Add CLOUDINARY_URL to .env and restart the app.');
  }

  if (!configured) {
    const credentials = new URL(process.env.CLOUDINARY_URL);
    cloudinary.config({
      cloud_name: credentials.hostname,
      api_key: decodeURIComponent(credentials.username),
      api_secret: decodeURIComponent(credentials.password),
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

export function createCloudinaryUploadSignature() {
  const client = getCloudinary();
  const credentials = new URL(process.env.CLOUDINARY_URL!);
  const timestamp = Math.floor(Date.now() / 1000);
  const parameters = { folder: 'asws/uploads', overwrite: false, timestamp };
  return {
    cloudName: credentials.hostname,
    apiKey: decodeURIComponent(credentials.username),
    folder: parameters.folder,
    overwrite: parameters.overwrite,
    timestamp,
    signature: client.utils.api_sign_request(parameters, decodeURIComponent(credentials.password)),
  };
}

export async function verifyCloudinaryImageUpload(imageUrl: string): Promise<{ url: string; bytes: number }> {
  const publicId = getManagedPublicId(imageUrl);
  if (!publicId?.startsWith('asws/uploads/')) throw new Error('Choose a photo uploaded to the managed church media folder.');

  const resource = await getCloudinary().api.resource(publicId, { resource_type: 'image', type: 'upload' });
  const formats = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif']);
  const createdAt = new Date(resource.created_at).getTime();
  const currentTime = Date.now();
  if (
    resource.type !== 'upload' ||
    resource.public_id !== publicId ||
    !formats.has(String(resource.format).toLowerCase()) ||
    !Number.isFinite(resource.bytes) || resource.bytes <= 0 || resource.bytes > MAX_IMAGE_SIZE ||
    !Number.isFinite(createdAt) || createdAt < currentTime - 60 * 60 * 1000 || createdAt > currentTime + 60 * 1000 ||
    resource.secure_url !== imageUrl
  ) {
    throw new Error('That photo is invalid, too large, or its upload has expired. Please choose it again.');
  }

  return { url: resource.secure_url, bytes: resource.bytes };
}

export async function uploadCloudinaryImage(file: FormDataEntryValue | null): Promise<string | null> {
  if (file == null || file === '') return null;
  if (typeof file !== 'string') throw new Error('Please choose the photo again so it can be uploaded directly.');
  return (await verifyCloudinaryImageUpload(file.trim())).url;
}

function getManagedPublicId(imageUrl?: string | null): string | null {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const segments = url.pathname.split('/').filter(Boolean);
    const expectedCloud = new URL(process.env.CLOUDINARY_URL ?? '').hostname;
    if (url.hostname !== 'res.cloudinary.com' || segments[0] !== expectedCloud) return null;

    const uploadIndex = segments.indexOf('upload');
    if (uploadIndex < 0) return null;

    const assetSegments = segments.slice(uploadIndex + 1);
    if (assetSegments[0]?.match(/^v\d+$/)) assetSegments.shift();
    if (assetSegments.length === 0) return null;

    const last = assetSegments[assetSegments.length - 1];
    assetSegments[assetSegments.length - 1] = last.replace(/\.[^.]+$/, '');
    return decodeURIComponent(assetSegments.join('/'));
  } catch {
    return null;
  }
}

export async function deleteCloudinaryImage(imageUrl?: string | null): Promise<void> {
  const publicId = getManagedPublicId(imageUrl);
  if (!publicId) return;

  const response = await getCloudinary().uploader.destroy(publicId, {
    resource_type: 'image',
    type: 'upload',
    invalidate: true,
  });
  if (response.result !== 'ok' && response.result !== 'not found') {
    throw new Error(`Cloudinary could not remove the image (${response.result}).`);
  }
}

export async function listUnreferencedCloudinaryImages(referencedUrls: string[]) {
  try {
    const client = getCloudinary();
    const referenced = new Set(referencedUrls.filter(Boolean));
    const assets = [] as { publicId: string; url: string; bytes: number }[];
    for (const prefix of ['asws/uploads', 'asws/site']) {
      let cursor: string | undefined;
      do {
        const result = await client.api.resources({ type: 'upload', prefix, max_results: 100, ...(cursor ? { next_cursor: cursor } : {}) });
        for (const resource of result.resources ?? []) {
          if (!referenced.has(resource.secure_url)) assets.push({ publicId: resource.public_id, url: resource.secure_url, bytes: resource.bytes });
        }
        cursor = result.next_cursor;
      } while (cursor);
    }
    return assets;
  } catch (error) {
    console.warn('[Admin] Could not list unused Cloudinary images:', error);
    return [];
  }
}

export async function deleteCloudinaryAsset(publicId: string): Promise<void> {
  if (!publicId.startsWith('asws/uploads/') && !publicId.startsWith('asws/site/')) throw new Error('This image is outside the managed church media folders.');
  const result = await getCloudinary().uploader.destroy(publicId, { resource_type: 'image', type: 'upload', invalidate: true });
  if (result.result !== 'ok' && result.result !== 'not found') throw new Error('Cloudinary could not remove this image.');
}
