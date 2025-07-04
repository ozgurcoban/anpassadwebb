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
  contentMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  className?: string;
};

const Content: React.FC<ContentProps> = ({ content, image, imageAlt, contentMedia, className }) => {
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
      {contentMedia && (
        <FadeInView
          delay={0.6}
          duration={0.8}
          className="relative w-full md:w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+8rem)] md:-mx-4 lg:-mx-8 xl:-mx-16"
          as="figure"
        >
          <div className="relative mt-4 w-full aspect-video">
            {contentMedia.type === 'video' ? (
              <video
                className="w-full h-full rounded-lg object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={contentMedia.src} type="video/mp4" />
                Din webbläsare stödjer inte video.
              </video>
            ) : (
              <Image
                src={contentMedia.src}
                alt={contentMedia.alt || ''}
                fill
                className="rounded-lg object-cover"
              />
            )}
          </div>
          {contentMedia.alt && (
            <FadeInView
              as="figcaption"
              delay={0.6}
              duration={0.8}
              className="mt-4 mx-auto max-w-2xl rounded-lg bg-gray-100 dark:bg-gray-900 px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300"
            >
              {contentMedia.alt}
            </FadeInView>
          )}
          <Separator className="my-4" />
        </FadeInView>
      )}
      {mdxSource && (
        <FadeInView className="prose prose-lg dark:prose-invert max-w-none prose-img:!mt-0 prose-figure:!mt-0">
          <MDXRemote {...mdxSource} components={components} />
        </FadeInView>
      )}
    </CardContent>
  );
};
export default Content;