import { getFeaturedPosts } from '@/lib/mdx';
import { Posts } from './Posts';
import Section from './ui/Section';
import SectionContainer from './ui/SectionContainer';
import SectionHeading from './ui/SectionHeading';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
        <div className="mt-10 text-center">
          <Link 
            href="/blogg" 
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
          >
            Visa alla artiklar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionContainer>
    </Section>
  );
};
export default FeaturedPosts;
