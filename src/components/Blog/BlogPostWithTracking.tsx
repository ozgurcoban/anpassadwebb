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
  // Temporärt avaktiverad tills Redis är konfigurerat
  // TODO: Aktivera när KV_REST_API_URL och KV_REST_API_TOKEN är konfigurerade
  // useTrackPostView(post.slug);
  
  return <BlogPostClient post={post} mdxSource={mdxSource} locale={locale} />;
}