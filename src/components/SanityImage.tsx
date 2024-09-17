import { createClient } from '@sanity/client';
import Image from 'next/image';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { useNextSanityImage } from 'next-sanity-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import React from 'react';

const configuredSanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

type SanityImageProps = {
  image: SanityImageSource;
  alt: string;
};

const SanityImage: React.FC<SanityImageProps> = ({ image, alt, ...props }) => {
  const imageProps = useNextSanityImage(configuredSanityClient, image);
  // console.log(imageProps);
  console.log('image:', image);

  const lqip = (image as any)?.asset?.metadata?.lqip || '';

  return (
    <Image
      src={imageProps.src}
      alt={alt}
      width={imageProps.width}
      height={imageProps.height}
      style={{ width: '100%', height: 'auto' }}
      sizes="(max-width: 800px) 100vw, 800px"
      placeholder="blur"
      blurDataURL={lqip}
      {...props}
    />
  );
};

export default SanityImage;
