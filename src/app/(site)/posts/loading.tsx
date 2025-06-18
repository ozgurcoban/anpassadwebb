import { PostsGridSkeleton } from "@/components/Blog/BlogLoading";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Loading posts...</h1>
      <PostsGridSkeleton />
    </main>
  );
}