import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERYResult } from '../../sanity.types';
import { FEATURED_POSTS_QUERY } from '@/sanity/lib/queries';
import { Posts } from './Posts';

const FeaturedPosts = async () => {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: FEATURED_POSTS_QUERY,
  });
  if (!posts) {
    console.error('Failed to fetch posts');
    return <div>Failed to load featured posts.</div>;
  }
  return (
    <section>
      <h2 className="mb-6 text-4xl">Featured posts</h2>
      <Posts posts={posts} />
    </section>
  );
};
export default FeaturedPosts;
