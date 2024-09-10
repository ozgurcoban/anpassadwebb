import Image from 'next/image';
import { PortableText } from '@portabletext/react';

import { urlFor } from '@/sanity/lib/image';
import { POST_QUERYResult } from '../../sanity.types';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { badgeVariants } from '@/components/ui/badge';
import { Separator } from './ui/separator';

const customPortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const { asset, alt } = value;
      // console.log('value: ', value);

      return (
        <div className="">
          <Image
            src={urlFor(asset._ref).url()}
            alt={alt || 'Image'}
            layout="responsive"
            width={700}
            height={500}
            className="mb-0.5 rounded-lg"
          />
          <p className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </p>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="font-normal">{children}</p>,
  },
};

export default function POST({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, subtitle, excerpt } = post || {};
  // console.log(post);

  return (
    <>
      <h2 className="text-center text-7xl">ÖzByte</h2>
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        <div className="mx-auto max-w-4xl">
          <CardHeader>
            <div className="my-4">
              <Link
                className={`${badgeVariants({ variant: 'default' })}text-4xl`}
                href={''}
              >
                Badge
              </Link>
            </div>
            {title ? (
              <CardTitle className="text-4xl text-card-foreground">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </CardTitle>
            ) : null}
            {subtitle ? (
              <CardDescription className="text-lg text-card-foreground">
                {subtitle}
              </CardDescription>
            ) : null}
          </CardHeader>
          <CardContent>
            {mainImage?.asset?._ref ? (
              <div className="md:mx-2 lg:-mx-10 xl:-mx-32">
                <Image
                  className="w-full rounded-lg"
                  src={urlFor(mainImage?.asset._ref).url()}
                  width={1200}
                  height={700}
                  alt={title || ''}
                />
                <Separator className="my-4" />
              </div>
            ) : null}
            {body ? (
              <div className="drop-cap">
                <PortableText
                  value={body}
                  components={customPortableTextComponents}
                />
              </div>
            ) : null}
          </CardContent>
          <hr />
          <CardFooter>
            <CardDescription>
              <Link href="/">&larr; Return home</Link>
            </CardDescription>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
