import { Posts } from '@/components/Posts';
import { getPostsByTag, getAllTags } from '@/lib/mdx';
import SubHero from '@/components/SubHero';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

const SingleTagPage = async (props: PageProps) => {
  const params = await props.params;
  const { slug } = params;

  // Convert slug back to tag name (reverse the slug transformation)
  const tagName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const posts = getPostsByTag(tagName);

  return (
    <>
      {/* <SubHero
        title={tagName}
        textAlign="center"
        description="hitta din favvotag"
        alt="Tags"
      /> */}
      <Posts posts={posts} />
    </>
  );
};
export default SingleTagPage;
