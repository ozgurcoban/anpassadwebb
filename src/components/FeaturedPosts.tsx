import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERYResult } from '../../sanity.types';
import { FEATURED_POSTS_QUERY } from '@/sanity/lib/queries';
import { Posts } from './Posts';
import Section from './ui/Section';
import Text from './ui/Text';

const FeaturedPosts = async () => {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: FEATURED_POSTS_QUERY,
  });
  if (!posts) {
    return <div>Failed to load featured posts.</div>;
  }
  return (
    <Section>
      <Text as="h3" size="xl" className="mb-6">
        Featured posts
      </Text>
      <Posts posts={posts} />
    </Section>
  );
};
export default FeaturedPosts;
