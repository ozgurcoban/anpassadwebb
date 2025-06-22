import { Skeleton } from '@/components/ui/skeleton';

export function BlogPostsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg dark:bg-gray-800/70 dark:border-gray-700/30"
        >
          {/* Image Skeleton */}
          <div className="relative h-56 w-full">
            <Skeleton className="h-full w-full rounded-t-2xl" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <Skeleton className="h-8 w-4/5" />
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-20" />
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}