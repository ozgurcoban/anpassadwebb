import { Posts } from '@/components/Posts';
import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { POSTS_QUERYResult } from '../../../sanity.types';

export default async function Page() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  });
  // console.log(posts);

  return <Posts posts={posts} />;
}
