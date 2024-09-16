import { createClient } from '@sanity/client';
import Img from 'next/image';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

// Define the type for the image prop
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import React from 'react';
import { Image as SanityMainImage } from 'sanity';

const configuredSanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

type SanityImageProps = {
  image: SanityMainImage;
  alt: string;
};

const SanityImage: React.FC<
  SanityImageProps & React.HTMLProps<HTMLImageElement>
> = ({ image, alt, ...props }: SanityImageProps) => {
  const imageProps = useNextSanityImage(configuredSanityClient, image);
  if (!image) {
    return null;
  }
  // console.log(imageProps);
  // console.log('image:', image);

  // const blurData = image.asset.
  // console.log('configuredSanityClient:', configuredSanityClient);

  return (
    // <Image
    //   alt={alt}
    //   {...imageProps}
    //   style={{ width: '100%', height: 'auto' }}
    //   sizes="(max-width: 800px) 100vw, 800px"
    //   placeholder="blur"
    //   blurDataURL={image?.asset?.metadata.lqip}
    // />
    <h2>SanityImage</h2>
  );
};
export default SanityImage;

// If you're using a private dataset you probably have to configure a separate write/read client.
// https://www.sanity.io/help/js-client-usecdn-token
