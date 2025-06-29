import { getFeaturedPosts } from '@/lib/mdx';
import { Posts } from './Posts';
import Section from './ui/Section';
import SectionContainer from './ui/SectionContainer';
import SectionHeading from './ui/SectionHeading';

export const revalidate = 60;

const FeaturedPosts = async () => {
  const posts = getFeaturedPosts(3);
  
  if (!posts || posts.length === 0) {
    return <div>No featured posts available.</div>;
  }
  
  return (
    <Section variant="wide">
      <SectionContainer>
        <SectionHeading
          title="Senaste från bloggen"
          subtitle="Tips och insikter för att växa online"
          subtitleClassName="text-gray-600 dark:text-gray-400"
        />
        <Posts posts={posts} />
      </SectionContainer>
    </Section>
  );
};
export default FeaturedPosts;
