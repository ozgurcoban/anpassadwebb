'use client';

import { PortableText } from '@portabletext/react';
import { POST_QUERYResult } from '../../sanity.types';
import Link from 'next/link';
import useDialog from '@/hooks/useDialog';

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
import { AnimatedButton } from './ui/Buttons';
import { DynamicMotion } from './ui/DynamicMotion';
import SanityImage from './SanityImage';
import Modal from './Modal';
import ContactForm from './form/ContactForm';
import { ContactButton } from './ContactButton';

const customPortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const { alt } = value;

      return (
        <DynamicMotion type="figure" className="" delay={0.5}>
          <SanityImage src={value} className="mb-0.5 rounded-lg" />
          <figcaption className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </figcaption>
        </DynamicMotion>
      );
    },
  },
};

export default function POST({ post }: { post: POST_QUERYResult }) {
  // const setDialog = useDialog((state) => state.setDialog);

  // const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setDialog({
  //     isOpen: true,
  //     title: 'Kontakta mig',
  //     description: 'Fyll i formuläret nedan så återkommer jag inom kort.',
  //     children: <ContactForm />,
  //   });
  // };

  const { title, mainImage, body, subtitle } = post || {};
  const alt = (mainImage as { alt?: string })?.alt;

  return (
    <article>
      <h2 className="text-center text-7xl">ÖzByte</h2>
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
                <CardTitle className="mt-4 break-words text-4xl leading-normal text-card-foreground">
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
        </header>
        <CardContent>
          {mainImage?.asset?.url ? (
            <DynamicMotion
              delay={0.6}
              duration={0.8}
              className="md:mx-2 lg:-mx-10 xl:-mx-32"
              type="figure"
            >
              <SanityImage className="mt-4 w-full rounded-lg" src={mainImage} />
              <DynamicMotion
                type="figcaption"
                delay={0.6}
                duration={0.8}
                className="mt-4 text-sm"
              >
                {alt}
              </DynamicMotion>
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
            className="my-8 rounded-md bg-secondary p-6 text-center font-medium"
          >
            <p className="mb-4 max-w-lg text-base leading-loose">
              Vill du veta mer om hur du kan förbättra din webbnärvaro? Kontakta
              mig för rådgivning eller frågor.
            </p>
            <ContactButton />
          </DynamicMotion>
          <DynamicMotion delay={0.8}>
            <Link href="/blog">&larr; Return to blog</Link>
          </DynamicMotion>
        </CardFooter>
        {/* <Modal /> */}
      </Card>
    </article>
  );
}
