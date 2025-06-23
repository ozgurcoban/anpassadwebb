'use client';

import { type Post } from '@/lib/mdx';
import BlogPost from './BlogPost';
import { useTrackPostView } from '@/lib/hooks/useTrackPostView';

type BlogPostWithTrackingProps = {
  post: Post;
  locale?: string;
};

export default function BlogPostWithTracking({ post, locale }: BlogPostWithTrackingProps) {
  // Track page view
  useTrackPostView(post.slug);
  
  return <BlogPost post={post} locale={locale} />;
}