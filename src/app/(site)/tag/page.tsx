// import { sanityFetch } from '@/sanity/lib/client';
// import { TAGS_QUERY } from '@/sanity/lib/queries';
// import { TAGS_QUERYResult } from '../../../../sanity.types';
// import Tags from '@/components/Tags';
// import Link from 'next/link';

// type Tag = {
//   title: string;
//   slug: { current: string };
//   _id: string;
//   description?: string;
//   // postCount?: number;
// };

// export const revalidate = 60;

// const TagsPage = async () => {
//   const tags: Tag[] = await sanityFetch<TAGS_QUERYResult>({
//     query: TAGS_QUERY,
//   });
//   console.log('tags', tags);

//   return (
//     <>
//       {tags?.length > 0 &&
//         tags.map((tag) => {
//           const { title, slug, description, _id: id } = tag || {};
//           console.log('tag', tag);
//           console.log('slug', slug.current);
//           // console.log('name', name);

//           return (
//             <Link href={`/tag/${slug.current}`} key={id}>
//               <p className="text-red p-2">#{title}</p>
//             </Link>
//           );
//         })}
//     </>
//   );
// };
// export default TagsPage;

import Tags from '@/components/Tags';
import { sanityFetch } from '@/sanity/lib/client';
import { TAGS_QUERY } from '@/sanity/lib/queries';
import { TAGS_QUERYResult } from '../../../../sanity.types';

export default async function TagsPage() {
  const tags = await sanityFetch<TAGS_QUERYResult>({
    query: TAGS_QUERY,
  });

  return (
    <>
      <h2>kiren</h2>
      {tags?.length > 0 && <Tags tags={tags} />}
    </>
  );
}
