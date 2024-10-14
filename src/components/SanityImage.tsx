'use client';
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
  className?: string;
};




const SanityImage: React.FC<SanityImageProps> = ({ src, className }) => {
  const imageProps = useNextSanityImage(configuredSanityClient, src);

  const lqip = (src as any)?.asset?.metadata?.lqip || '';
  const alt = (src as any)?.alt || 'Standardbeskrivning';
  console.log({lqip})

  

  return (
    <Image
      {...imageProps}
      alt={alt}
      placeholder='blur' 
      blurDataURL={lqip}
      style={{ width: '100%', height: 'auto' }}
			sizes="(max-width: 800px) 100vw, 800px"
      className={className}
    />
  );
};

export default SanityImage;
