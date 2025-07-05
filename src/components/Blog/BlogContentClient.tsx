'use client';

import { Separator } from '@/components/ui/separator';
import { CardContent } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { cn } from '@/lib/utils';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/components/MDXComponents';
import { MediaDisplay } from '@/components/ui/MediaDisplay';
import { blogStyles } from '@/lib/styles/blog';

type ContentProps = {
  mdxSource: MDXRemoteSerializeResult;
  contentMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  className?: string;
};

const BlogContentClient: React.FC<ContentProps> = ({ mdxSource, contentMedia, className }) => {
  const components = useMDXComponents({});

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
            <MediaDisplay
              src={contentMedia.src}
              alt={contentMedia.alt || ''}
              type={contentMedia.type}
              className="rounded-lg"
              objectFit="cover"
            />
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
      <FadeInView 
        className={cn(
          blogStyles.prose.base,
          blogStyles.prose.headings,
          blogStyles.prose.paragraphs,
          blogStyles.prose.dark,
          "prose-img:!mt-0 prose-figure:!mt-0",
          !contentMedia && "mt-8"
        )}
      >
        <MDXRemote {...mdxSource} components={components} />
      </FadeInView>
    </CardContent>
  );
};

export default BlogContentClient;