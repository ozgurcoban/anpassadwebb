import { type Post } from '@/lib/mdx';
import { blogConfig } from '@/lib/blog-config';
import { PostCard } from '@/components/Blog/PostCard';

type PostsProps = {
  posts: Post[];
  locale?: string;
};

export function Posts({
  posts,
  locale = blogConfig.defaultLocale,
}: PostsProps) {
  return (
    <div id="posts" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 [grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:grid-rows-[auto_auto_1fr_auto_auto]">
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} locale={locale} index={index} />
      ))}
    </div>
  );
}