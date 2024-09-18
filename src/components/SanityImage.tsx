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
  src: SanityImageSource;
  alt?: string;
  className?: string;
};

const SanityImage: React.FC<SanityImageProps> = ({ src, alt, ...props }) => {
  const imageProps = useNextSanityImage(configuredSanityClient, src);
  // console.log(imageProps);
  // console.log('image:', image);

  const lqip = (src as any)?.asset?.metadata?.lqip || '';

  return (
    <Image
      src={imageProps.src}
      alt={alt || 'image'}
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
