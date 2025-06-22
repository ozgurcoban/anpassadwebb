import { Posts } from '@/components/Posts';
import { getPostsByTag, getAllTags } from '@/lib/mdx';
import { TagComponents } from '@/components/PagesComponents/TagPage';
import Section from '@/components/ui/Section';
import { BlogPostsContainer } from '@/components/Blog/BlogPostsContainer';

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

  // Find the original tag name from getAllTags() to preserve correct casing
  const allTags = getAllTags();
  const tagData = allTags.find(tag => tag.slug === slug);
  const tagName = tagData?.name || slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const posts = getPostsByTag(tagName);

  return (
    <>
      <TagComponents
        title={`Artiklar inom ${tagName}`}
        description={`Utforska alla våra artiklar inom kategorin ${tagName}. Hitta djupgående guider, tips och insikter.`}
        showCTA={true}
        ctaText="Alla kategorier"
        ctaHref="/tag"
      />
      
      {posts?.length > 0 ? (
        <Section className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {posts.length} {posts.length === 1 ? 'artikel' : 'artiklar'} inom #{tagName}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Allt du behöver veta om {tagName.toLowerCase()}
              </p>
            </header>
            <BlogPostsContainer posts={posts} />
          </div>
        </Section>
      ) : (
        <Section className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 rounded-full flex items-center justify-center dark:from-emerald-800 dark:via-green-800 dark:to-teal-800">
                  <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Inga artiklar hittades
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Det finns inga artiklar i kategorin &quot;{tagName}&quot; än. Kom tillbaka senare!
                </p>
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
};
export default SingleTagPage;
