// Purpose: Display all tags on the site.

import Tags from '@/components/Tags';
import { getAllTags } from '@/lib/mdx';
import { TagComponents } from '@/components/PagesComponents/TagPage';
import Section from '@/components/ui/Section';

export const revalidate = 60;

export default async function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <TagComponents
        title="Upptäck kategorier"
        description="Utforska våra artiklar sorterade efter ämne och hitta precis det du söker"
        showCTA={true}
        ctaText="Alla artiklar"
        ctaHref="/posts"
      />
      
      {tags?.length > 0 && (
        <Section className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Alla kategorier
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {tags.length} kategorier att utforska
              </p>
            </header>
            <Tags tags={tags} />
          </div>
        </Section>
      )}
    </>
  );
}
