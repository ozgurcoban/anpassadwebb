import Link from 'next/link';
import {
  POSTS_BY_TAG_QUERYResult,
  ALL_TAGS_QUERYResult,
} from '../../sanity.types';

const Tags = async ({ tags }: { tags: ALL_TAGS_QUERYResult }) => {
  return (
    <ul className="mt-6 space-y-4">
      {tags.map((tag) => {
        const { title, _id: id, slug, postCount } = tag || {};

        return (
          <li key={id} className="rounded border border-primary">
            <Link href={`/tag/${slug?.current}`}>
              <p className="text-red p-2">
                #{title} ( {postCount} inlägg )
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Tags;
