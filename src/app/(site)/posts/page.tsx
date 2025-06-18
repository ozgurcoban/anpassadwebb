import { Posts } from '@/components/Posts';
import { getAllPosts } from '@/lib/mdx';
import { BlogComponents } from '@/components/PagesComponents/BlogPage';
import Section from '@/components/ui/Section';

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogComponents />
      {posts?.length > 0 && (
        <Section>
          <Posts posts={posts} />
        </Section>
      )}
    </>
  );
}
