import Image from 'next/image';
import { PortableText } from '@portabletext/react';
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
// import { Button } from './ui/button';
import AnimatedButton from './ui/MotionButton';
import { DynamicMotion } from './ui/DynamicMotion';
import SanityImage from './SanityImage';

// type POSTProps = {
//   post: POST_QUERYResult;
//   mainImage: any;
// };

const customPortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const { asset, alt } = value;
      // console.log('value: ', value);

      return (
        <DynamicMotion type="div" className="" delay={0.5}>
          <Image
            src={urlFor(asset._ref).url()}
            alt={alt || 'Image'}
            layout="responsive"
            width={700}
            height={500}
            className="mb-0.5 rounded-lg"
          />
          <figcaption className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </figcaption>
        </DynamicMotion>
      );
    },
  },
};

export default function POST({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, subtitle, excerpt } = post || {};

  return (
    <article>
      <h2 className="text-center text-7xl">ÖzByte</h2>
      {mainImage && <SanityImage image={mainImage} alt={''} />}
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        <header className="mx-auto max-w-4xl">
          <CardHeader className="py-0">
            <DynamicMotion delay={0.3} className="mt-8">
              <Link
                className={`${badgeVariants({ variant: 'default' })}text-4xl`}
                href={''}
              >
                Badge
              </Link>
            </DynamicMotion>
            {title ? (
              <DynamicMotion delay={0.5}>
                <CardTitle className="mt-4 text-4xl text-card-foreground">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </CardTitle>
              </DynamicMotion>
            ) : null}
            {subtitle ? (
              <DynamicMotion type="div" delay={0.75}>
                <CardDescription className="mt-4 text-pretty text-xl leading-relaxed tracking-tight text-card-foreground">
                  {subtitle}
                </CardDescription>
              </DynamicMotion>
            ) : null}
          </CardHeader>
          <CardContent>
            {mainImage?.asset?._ref ? (
              <DynamicMotion
                delay={0.6}
                duration={0.8}
                className="md:mx-2 lg:-mx-10 xl:-mx-32"
              >
                <Image
                  className="mt-4 w-full rounded-lg"
                  src={urlFor(mainImage?.asset._ref).url()}
                  width={1200}
                  height={700}
                  alt={title || ''}
                />
                <Separator className="my-4" />
              </DynamicMotion>
            ) : null}
            {body ? (
              <DynamicMotion
                className="drop-cap leading-[1.9rem]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <PortableText
                  value={body}
                  components={{
                    ...customPortableTextComponents,

                    block: ({ children }) => (
                      <DynamicMotion delay={0.4} className="my-4">
                        {children}
                      </DynamicMotion>
                    ),
                  }}
                />
              </DynamicMotion>
            ) : null}
          </CardContent>
          {/* <hr /> */}
          <CardFooter className="flex flex-col items-center gap-y-10">
            <DynamicMotion
              delay={0.6}
              className="my-8 rounded-md bg-accent p-6 text-center font-medium"
            >
              <p className="mb-4 max-w-lg text-base leading-loose text-primary">
                Vill du veta mer om hur du kan förbättra din webbnärvaro?
                Kontakta mig för rådgivning eller frågor.
              </p>
              <AnimatedButton
                size="lg"
                href="/contact"
                // onClick={() => setModalOpen(true)}
              >
                Kontakta mig
              </AnimatedButton>
            </DynamicMotion>
            <DynamicMotion delay={0.8}>
              <Link href="/blog">&larr; Return to blog</Link>
            </DynamicMotion>
          </CardFooter>
        </header>
      </Card>
    </article>
  );
}
