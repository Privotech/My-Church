import 'dotenv/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicImageDirectory = path.join(projectRoot, 'public', 'image');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

if (!process.env.CLOUDINARY_URL || !process.env.DATABASE_URL) {
  throw new Error('Set CLOUDINARY_URL and DATABASE_URL in .env before running the migration.');
}

const cloudName = new URL(process.env.CLOUDINARY_URL).hostname;
cloudinary.config({
  cloud_name: cloudName,
  api_key: new URL(process.env.CLOUDINARY_URL).username,
  api_secret: new URL(process.env.CLOUDINARY_URL).password,
  secure: true,
});

function slugify(value) {
  return value.normalize('NFKD').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
}

async function getImageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? getImageFiles(fullPath) : [fullPath];
  }));
  return paths.flat().filter((filePath) => imageExtensions.has(path.extname(filePath).toLowerCase()));
}

async function updateEnv(values) {
  const envPath = path.join(projectRoot, '.env');
  const source = await readFile(envPath, 'utf8');
  const lines = source.split(/\r?\n/);
  for (const [key, value] of Object.entries(values)) {
    const index = lines.findIndex((line) => line.startsWith(`${key}=`));
    const line = `${key}=${value}`;
    if (index < 0) lines.push(line);
    else lines[index] = line;
  }
  await writeFile(envPath, `${lines.filter((line, index) => index < lines.length - 1 || line).join('\n')}\n`, 'utf8');
}

const prisma = new PrismaClient();

try {
  await cloudinary.api.ping();
  await prisma.$connect();

  const imageFiles = await getImageFiles(publicImageDirectory);
  const uploadedByLocalPath = new Map();

  for (const filePath of imageFiles) {
    const filename = path.basename(filePath, path.extname(filePath));
    const publicId = `asws/site/image/${slugify(filename)}`;
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
    });
    const localPath = `/${path.relative(path.join(projectRoot, 'public'), filePath).split(path.sep).join('/')}`;
    uploadedByLocalPath.set(localPath, result.secure_url);
  }

  let updatedRecords = 0;
  for (const model of [prisma.galleryImage, prisma.teamMember, prisma.churchUpdate]) {
    const rows = await model.findMany({ where: { imageUrl: { startsWith: '/image/' } }, select: { id: true, imageUrl: true } });
    for (const row of rows) {
      const cloudinaryUrl = uploadedByLocalPath.get(row.imageUrl);
      if (!cloudinaryUrl) continue;
      await model.update({ where: { id: row.id }, data: { imageUrl: cloudinaryUrl } });
      updatedRecords += 1;
    }
  }

  await updateEnv({
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloudName,
    NEXT_PUBLIC_CLOUDINARY_ASSETS_READY: 'true',
  });

  console.log(`Uploaded ${imageFiles.length} existing image assets and updated ${updatedRecords} database records.`);
  console.log('Cloudinary image delivery is enabled. Restart the app to load the updated environment.');
} catch (error) {
  const status = error?.http_code ?? error?.error?.http_code;
  if (status === 401) {
    throw new Error('Cloudinary rejected the configured API credentials. Update CLOUDINARY_URL in .env and retry.');
  }
  throw new Error(`Image migration stopped before completion${status ? ` (HTTP ${status})` : ''}. Check network access and retry; uploaded assets can be safely overwritten on a retry.`);
} finally {
  await prisma.$disconnect();
}
