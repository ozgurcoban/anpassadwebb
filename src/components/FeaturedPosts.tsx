import { getFeaturedPosts } from '@/lib/mdx';
import { Posts } from './Posts';
import Section from './ui/Section';
import Text from './ui/Text';

const FeaturedPosts = async () => {
  const posts = getFeaturedPosts(3);
  
  if (!posts || posts.length === 0) {
    return <div>No featured posts available.</div>;
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
