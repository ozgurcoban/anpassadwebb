import { getFeaturedPosts } from '@/lib/mdx';
import { Posts } from '@/components/Posts';
import { FadeInView } from '@/components/ui/FadeInView';

export const revalidate = 60;

const FeaturedPostsSection = async () => {
  const posts = getFeaturedPosts(3);
  
  if (!posts || posts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30">
      <div className="container mx-auto px-4">
        <FadeInView as="header" className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-sm font-medium text-gray-700 mb-6 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-pink-900/50 dark:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Utvalda artiklar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Våra mest populära{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              inlägg
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handplockade artiklar som hjälper dig att förstå webbutveckling och SEO bättre
          </p>
        </FadeInView>
        <Posts posts={posts} />
      </div>
    </section>
  );
};

export default FeaturedPostsSection;