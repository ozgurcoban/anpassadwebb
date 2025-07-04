import { type Post } from '@/lib/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import BlogPostWithTracking from './BlogPostWithTracking';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

interface BlogPostWrapperProps {
  post: Post;
  locale?: string;
}

export default async function BlogPostWrapper({ post, locale }: BlogPostWrapperProps) {
  // Pre-render MDX content on the server
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
      ],
    },
  });

  // Pass pre-rendered content to client component with tracking
  return (
    <BlogPostWithTracking 
      post={post} 
      mdxSource={mdxSource}
      locale={locale}
    />
  );
}