import Image from 'next/image'
import Link from 'next/link'
import { type MDXComponents } from 'mdx/types'
import H3 from '@/components/ui/H3'
import H4 from '@/components/ui/H4'
import P from '@/components/ui/P'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Image,
    
    // HTML element overrides
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <H3>{children}</H3>
    ),
    h4: ({ children }) => (
      <H4>{children}</H4>
    ),
    p: ({ children }) => (
      <P>{children}</P>
    ),
    a: ({ href, children }) => {
      const isInternal = href && (href.startsWith('/') || href.startsWith('#'))
      
      if (isInternal) {
        return (
          <Link 
            href={href} 
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            {children}
          </Link>
        )
      }
      
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          {children}
        </a>
      )
    },
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base text-muted-foreground">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-muted" />,
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    ...components,
  }
}