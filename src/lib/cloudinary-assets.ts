export function cloudinaryPublicIdForLocalImage(src: string): string | null {
  if (!src.startsWith('/image/')) return null;
  const filename = decodeURIComponent(src.split('/').pop()?.split('?')[0] ?? '');
  const basename = filename.replace(/\.[^.]+$/, '');
  const slug = basename
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ? `asws/site/image/${slug}` : null;
}

export function useCloudinarySiteAssets(): boolean {
  return process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_READY === 'true';
}
