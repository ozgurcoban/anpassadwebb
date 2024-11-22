// Purpose: Display all tags on the site.

import Tags from '@/components/Tags';
import { sanityFetch } from '@/sanity/lib/client';
import { ALL_TAGS_QUERY } from '@/sanity/lib/queries';
import {
  POSTS_BY_TAG_QUERYResult,
  ALL_TAGS_QUERYResult,
} from '../../../../sanity.types';
import SubHero from '@/components/SubHero';

export const revalidate = 60;

export default async function TagsPage() {
  const tags = await sanityFetch<ALL_TAGS_QUERYResult>({
    query: ALL_TAGS_QUERY,
    tags: ['tag'],
  });

  return (
    <>
      {/* <SubHero
        title="Tags"
        textAlign="center"
        description="hitta din favvotag"
        alt="Tags"
      /> */}
      {tags?.length > 0 && <Tags tags={tags} />}
    </>
  );
}
