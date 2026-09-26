'use client';

import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import type { ComponentProps } from 'react';
import { cloudinaryPublicIdForLocalImage, useCloudinarySiteAssets } from '@/lib/cloudinary-assets';

type ImageProps = ComponentProps<typeof Image>;

export default function ChurchImage(props: ImageProps) {
  const { src, ...imageProps } = props;
  if (typeof src !== 'string') return <Image {...props} />;

  const isCloudinaryUrl = src.startsWith('https://res.cloudinary.com/');
  const localPublicId = useCloudinarySiteAssets() ? cloudinaryPublicIdForLocalImage(src) : null;
  if (isCloudinaryUrl || localPublicId) {
    return <CldImage {...imageProps} src={localPublicId ?? src} />;
  }

  return <Image {...props} />;
}
