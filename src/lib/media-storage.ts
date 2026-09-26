import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

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

function uploadBuffer(buffer: Buffer, options: UploadApiOptions): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    getCloudinary().uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else if (result) resolve(result);
      else reject(new Error('Cloudinary did not return an upload result.'));
    }).end(buffer);
  });
}

export async function uploadCloudinaryImage(file: FormDataEntryValue | null): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!allowedTypes.has(file.type)) throw new Error('Choose a JPEG, PNG, WebP, or AVIF image.');
  if (file.size > MAX_IMAGE_SIZE) throw new Error('Images must be 8 MB or smaller.');

  const result = await uploadBuffer(Buffer.from(await file.arrayBuffer()), {
    folder: 'asws/uploads',
    resource_type: 'image',
    unique_filename: true,
    overwrite: false,
  });

  return result.secure_url;
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
