'use client';

import { type Post } from '@/lib/mdx';
import BlogPostClient from './BlogPostClient';
import { useTrackPostView } from '@/lib/hooks/useTrackPostView';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

type BlogPostWithTrackingProps = {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  locale?: string;
};

export default function BlogPostWithTracking({ post, mdxSource, locale }: BlogPostWithTrackingProps) {
  useTrackPostView(post.slug);
  
  return <BlogPostClient post={post} mdxSource={mdxSource} locale={locale} />;
}