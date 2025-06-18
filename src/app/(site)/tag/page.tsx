// Purpose: Display all tags on the site.

import Tags from '@/components/Tags';
import { getAllTags } from '@/lib/mdx';
import SubHero from '@/components/SubHero';

export const revalidate = 60;

export default async function TagsPage() {
  const tags = getAllTags();

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
