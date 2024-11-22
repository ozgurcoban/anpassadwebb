import { headers } from 'next/headers';
import SubHero from '@/components/SubHero';
import { client, sanityFetch } from '@/sanity/lib/client';
import {
  ALL_TAGS_QUERYResult,
  POSTS_QUERYResult,
} from '../../../../sanity.types';
import { ALL_TAGS_QUERY, POSTS_BY_TAG_QUERY } from '@/sanity/lib/queries';

// export async function generateStaticParams() {
//   const tags = await client.fetch<{ slug: string }[]>(
//     `*[_type == "tag" && defined(slug.current)]{
//       "slug": slug.current
//     }`,
//   );

//   return tags.map((tag) => ({
//     slug: tag.slug,
//   }));
// }

export default async function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  const slug = pathname?.split('/').pop();

  const tags = await sanityFetch<ALL_TAGS_QUERYResult>({
    query: ALL_TAGS_QUERY,
    tags: ['tag'],
  });

  const mathedTag = tags.find((tag) => tag.slug?.current === slug);
  const slugTag = mathedTag?.slug?.current;
  console.log('slugTag', slugTag);
  const title = mathedTag?.title;
  const description = mathedTag?.description || 'hitta din favvotag';

  return (
    <>
      <SubHero
        title={title}
        textAlign="center"
        description={description}
        alt="Tags"
      />
      {children}
    </>
  );
}
