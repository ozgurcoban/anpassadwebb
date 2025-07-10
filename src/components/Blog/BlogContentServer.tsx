import { Separator } from '@/components/ui/separator';
import { CardContent } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { cn } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MediaDisplay } from '@/components/ui/MediaDisplay';
import { blogStyles } from '@/lib/styles/blog';
import Image from 'next/image';
import Link from 'next/link';
import { KeyTakeawayBox } from '@/components/Blog/KeyTakeawayBox';
import { ImageWithOverlayCaption } from '@/components/Blog/ImageWithOverlayCaption';
import { ImageWithLightbox } from '@/components/Blog/ImageWithLightbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

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

// Define MDX components inline to avoid hook issues in async component
const mdxComponents = {
  Image,
  ImageWithOverlayCaption,
  ImageWithLightbox,
  KeyTakeaway: KeyTakeawayBox,
  
  // Alert components for different types of callouts
  Note: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-800 dark:text-blue-300">
        {title || 'Note'}
      </AlertTitle>
      <AlertDescription className="text-blue-700 dark:text-blue-200">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  Tip: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-300">
        {title || 'Tip'}
      </AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-200">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  Warning: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-300">
        {title || 'Warning'}
      </AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-200">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  Error: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      <AlertTitle className="text-red-800 dark:text-red-300">
        {title || 'Error'}
      </AlertTitle>
      <AlertDescription className="text-red-700 dark:text-red-200">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  // Typography overrides
  h1: (props: any) => <h1 className="scroll-mt-20" {...props} />,
  h2: (props: any) => <h2 className="scroll-mt-20" {...props} />,
  h3: (props: any) => <h3 className="scroll-mt-20" {...props} />,
  h4: (props: any) => <h4 className="scroll-mt-20" {...props} />,
  h5: (props: any) => <h5 className="scroll-mt-20" {...props} />,
  h6: (props: any) => <h6 className="scroll-mt-20" {...props} />,
  
  // Link styling
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#');
    return (
      <Link
        href={href}
        className={cn(
          "text-primary underline-offset-4 hover:underline",
          "transition-colors hover:text-primary/80"
        )}
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </Link>
    );
  },
  
  // Pre and code styling
  pre: (props: any) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-gray-100 p-4",
        "dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
      )}
      {...props}
    />
  ),
  
  code: (props: any) => (
    <code
      className={cn(
        "rounded bg-gray-100 px-1 py-0.5 font-mono text-sm",
        "dark:bg-gray-800"
      )}
      {...props}
    />
  ),
};

async function BlogContentServer({ content, image, imageAlt, contentMedia, className }: ContentProps) {
  // Server-side MDX serialization
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
      ],
    },
  });

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
          "prose-img:!mt-0 prose-figure:!mt-0"
        )}
      >
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </FadeInView>
    </CardContent>
  );
};

export default BlogContentServer;