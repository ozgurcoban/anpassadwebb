import Link from 'next/link';
import { POSTS_BY_TAG_QUERYResult } from '../../sanity.types';

const Tags = async ({ tags }: { tags: POSTS_BY_TAG_QUERYResult }) => {
  return (
    <>
      <h2>Tags</h2>
      {tags.map((tag) => {
        const { title, _id: id, slug } = tag || {};

        return (
          <Link href={`/tag/${slug?.current}`} key={id}>
            <p className="text-red p-2">#{title}</p>
          </Link>
        );
      })}
    </>
  );
};
export default Tags;
