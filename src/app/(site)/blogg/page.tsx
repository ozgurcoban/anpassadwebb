import { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { BlogComponents } from '@/components/PagesComponents/BlogPage';
import { BlogPostsContainer } from '@/components/Blog/BlogPostsContainer';
import FeaturedPostsSection from '@/components/Blog/FeaturedPostsSection';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Blogg - AI & Digital marknadsföring för småföretagare | Anpassad Webb',
  description: 'Praktiska guider om AI, webbutveckling och digital marknadsföring. Lär dig hur du som småföretagare kan växa online med enkla, beprövade strategier.',
  openGraph: {
    title: 'Blogg - AI & Digital marknadsföring för småföretagare',
    description: 'Enkla guider och beprövade strategier för att lyckas digitalt - utan teknisk bakgrund.',
    type: 'website',
  },
};

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogComponents />
      <FeaturedPostsSection />
      {posts?.length > 0 && (
        <Section className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <header className="mb-8 lg:mb-12 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Alla artiklar
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Bläddra igenom våra senaste tips och guider
              </p>
            </header>
            <BlogPostsContainer posts={posts} />
          </div>
        </Section>
      )}
    </>
  );
}
