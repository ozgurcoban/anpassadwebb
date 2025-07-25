import Image from 'next/image'
import Link from 'next/link'
import { type MDXComponents } from 'mdx/types'
import { KeyTakeawayBox } from '@/components/Blog/KeyTakeawayBox'
import { ImageWithOverlayCaption } from '@/components/Blog/ImageWithOverlayCaption'
import { ImageWithLightbox } from '@/components/Blog/ImageWithLightbox'
import { AIPromptImageExample } from '@/components/Blog/AIPromptImageExample'
import { AIPrompt } from '@/components/Blog/AIPrompt'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Image,
    ImageWithOverlayCaption,
    ImageWithLightbox,
    KeyTakeaway: KeyTakeawayBox,
    AIPromptImageExample,
    AIPrompt,
    
    // Alert components for different types of callouts
    Note: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Alert className="my-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">
          {title || 'Bra att veta'}
        </AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          {children}
        </AlertDescription>
      </Alert>
    ),
    
    Tip: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Alert className="my-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">
          {title || 'Tips'}
        </AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          {children}
        </AlertDescription>
      </Alert>
    ),
    
    Warning: ({ children, title }: { children: React.ReactNode; title?: string }) => (
      <Alert className="my-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-900 dark:text-amber-100">
          {title || 'Viktigt'}
        </AlertTitle>
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          {children}
        </AlertDescription>
      </Alert>
    ),
    
    // HTML element overrides with enhanced reader-friendly styles
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-gray-900 dark:text-gray-100" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-bold tracking-tight first:mt-0 mb-6 mt-10 text-gray-900 dark:text-gray-100" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold tracking-tight mb-4 mt-8 text-gray-900 dark:text-gray-100" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-semibold tracking-tight mb-3 mt-6 text-gray-900 dark:text-gray-100" {...props}>
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    a: ({ href, children }) => {
      const isAnchor = href && href.startsWith('#')
      const isInternal = href && href.startsWith('/') && !isAnchor
      
      const className = cn(
        "font-medium underline underline-offset-4 transition-colors",
        "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
      )
      
      // For anchor links, use regular <a> tag
      if (isAnchor) {
        return (
          <a href={href} className={className}>
            {children}
          </a>
        )
      }
      
      // For internal links, use Next.js Link
      if (isInternal) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        )
      }
      
      // For external links
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      )
    },
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 marker:text-purple-600 dark:marker:text-purple-400">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 marker:text-purple-600 dark:marker:text-purple-400">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-purple-200 dark:border-purple-800 pl-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="relative rounded-md bg-purple-100 dark:bg-purple-900/30 px-[0.4rem] py-[0.2rem] font-mono text-sm font-medium text-purple-900 dark:text-purple-100">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 mt-6 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-sm">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-10 border-gray-200 dark:border-gray-800" />
    ),
    img: ({ src, alt, ...props }) => {
      // If alt text contains figcaption marker, render as figure with caption
      if (alt && alt.includes('|')) {
        const [altText, caption] = alt.split('|').map((s: string) => s.trim());
        return (
          <figure className="my-8">
            <div className="relative w-full aspect-video">
              <Image
                src={src || ''}
                alt={altText}
                fill
                className="rounded-lg object-cover"
                {...props}
              />
            </div>
            <figcaption className="mt-3 mx-auto max-w-2xl rounded-lg bg-gray-100 dark:bg-gray-900 px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
              {caption}
            </figcaption>
          </figure>
        );
      }
      // Regular image without caption
      return (
        <div className="relative my-8 w-full aspect-video">
          <Image
            src={src || ''}
            alt={alt || ''}
            fill
            className="rounded-lg object-cover"
            {...props}
          />
        </div>
      );
    },
    table: ({ children }) => (
      <div className="my-8 w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 text-gray-700 dark:text-gray-300 [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    figure: (props) => (
      <figure {...props} className={cn(props.className)} />
    ),
    ...components,
  }
}