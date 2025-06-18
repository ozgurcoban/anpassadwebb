import { headers } from 'next/headers';
import SubHero from '@/components/SubHero';
import { getAllTags } from '@/lib/mdx';

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
  const headerList = await headers();
  const pathname = headerList.get('x-current-path');
  const slug = pathname?.split('/').pop();

  const tags = getAllTags();
  const matchedTag = tags.find((tag) => tag.slug === slug);
  const title = matchedTag?.name;
  const description = 'hitta din favvotag';

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
