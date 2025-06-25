// Purpose: Display all tags on the site.

import Link from 'next/link';
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
            
            {/* Back to all articles button */}
            <div className="mt-16 text-center">
              <Link 
                href="/posts" 
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-gray-700 bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tillbaka till alla artiklar
              </Link>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
