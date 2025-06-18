'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { CardContent } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { cn } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useMDXComponents } from '@/components/MDXComponents';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

type ContentProps = {
  content: string;
  image?: string;
  imageAlt?: string;
  className?: string;
};

const Content: React.FC<ContentProps> = ({ content, image, imageAlt, className }) => {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    const processMDX = async () => {
      const serialized = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }]
          ],
        },
      });
      setMdxSource(serialized);
    };
    processMDX();
  }, [content]);

  return (
    <CardContent className={cn("px-4 md:px-8 lg:px-16 xl:px-32", className)}>
      {image && (
        <FadeInView
          delay={0.6}
          duration={0.8}
          className="relative w-full md:w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+8rem)] md:-mx-4 lg:-mx-8 xl:-mx-16"
          as="figure"
        >
          <div className="relative mt-4 w-full aspect-video">
            <Image
              src={image}
              alt={imageAlt || ''}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {imageAlt && (
            <FadeInView
              as="figcaption"
              delay={0.6}
              duration={0.8}
              className="mt-4 text-sm text-center text-muted-foreground"
            >
              {imageAlt}
            </FadeInView>
          )}
          <Separator className="my-4" />
        </FadeInView>
      )}
      {mdxSource && (
        <FadeInView className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} components={components} />
        </FadeInView>
      )}
    </CardContent>
  );
};
export default Content;