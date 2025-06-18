import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <article>
      <Skeleton className="mx-auto h-16 w-64 text-center" />
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        <div className="mx-auto max-w-4xl space-y-4 p-6">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="px-4 md:px-8 lg:px-16 xl:px-32">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Card>
    </article>
  );
}

export function PostsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <article
          key={i}
          className="max-w-sm shadow-md"
        >
          <Card className="relative row-span-4 grid w-full grid-rows-subgrid gap-4 overflow-hidden rounded shadow-custom">
            <Skeleton className="h-64 w-full" />
            <div className="px-6 py-2">
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="px-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>
            <div className="mt-auto flex flex-wrap gap-2 p-6">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </Card>
        </article>
      ))}
    </div>
  );
}