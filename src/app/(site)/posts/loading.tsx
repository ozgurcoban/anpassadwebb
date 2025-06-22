import { BlogPostsSkeleton } from '@/components/Blog/BlogPostsSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import Section from '@/components/ui/Section';

export default function BlogLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
        <div className="relative grid min-h-[60vh] overflow-hidden pb-16 pt-20 md:pb-20 md:pt-24 lg:rounded-2xl bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-pink-900/50">
          <div className="relative z-20 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl space-y-8">
              <div className="space-y-6">
                <Skeleton className="h-16 md:h-20 lg:h-24 w-4/5 mx-auto bg-white/20" />
                <Skeleton className="h-6 md:h-8 w-3/5 mx-auto bg-white/20" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Skeleton className="h-12 w-40 bg-white/20" />
                <Skeleton className="h-12 w-48 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Skeleton */}
      <section className="py-16 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30">
        <div className="container mx-auto px-4">
          <header className="mb-12 text-center">
            <Skeleton className="h-8 w-32 mx-auto mb-6" />
            <Skeleton className="h-12 md:h-16 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </header>
          <BlogPostsSkeleton count={3} />
        </div>
      </section>

      {/* All Posts Section Skeleton */}
      <Section className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
        <div className="container mx-auto px-4">
          <header className="mb-12 text-center">
            <Skeleton className="h-10 md:h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </header>
          
          {/* Filter Section Skeleton */}
          <div className="space-y-6 mb-12">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
            
            {/* Filter Tags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
          
          <BlogPostsSkeleton count={9} />
        </div>
      </Section>
    </>
  );
}