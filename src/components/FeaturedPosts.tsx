import { getFeaturedPosts } from '@/lib/mdx';
import { Posts } from './Posts';
import Section from './ui/Section';
import SectionContainer from './ui/SectionContainer';
import Text from './ui/Text';

export const revalidate = 60;

const FeaturedPosts = async () => {
  const posts = getFeaturedPosts(3);
  
  if (!posts || posts.length === 0) {
    return <div>No featured posts available.</div>;
  }
  
  return (
    <Section variant="wide">
      <SectionContainer>
        <header className="mb-12 text-center">
          <Text as="h2" size="xl" className="mb-4">
            Senaste från bloggen
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Tips och insikter för att växa online
          </Text>
        </header>
        <Posts posts={posts} />
      </SectionContainer>
    </Section>
  );
};
export default FeaturedPosts;
