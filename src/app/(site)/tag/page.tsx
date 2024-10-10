// Purpose: Display all tags on the site.

import Tags from '@/components/Tags';
import { sanityFetch } from '@/sanity/lib/client';
import { ALL_TAGS_QUERY } from '@/sanity/lib/queries';
import { POSTS_BY_TAG_QUERYResult } from '../../../../sanity.types';

export default async function TagsPage() {
  const tags = await sanityFetch<POSTS_BY_TAG_QUERYResult>({
    query: ALL_TAGS_QUERY,
  });

  return (
    <>
      <h2>kiren</h2>
      {tags?.length > 0 && <Tags tags={tags} />}
    </>
  );
}
