import Link from 'next/link';

type Tag = {
  name: string;
  slug: string;
  count: number;
};

const Tags = async ({ tags }: { tags: Tag[] }) => {
  return (
    <ul className="mt-6 space-y-4">
      {tags.map((tag) => {
        const { name, slug, count } = tag;

        return (
          <li key={slug} className="rounded border border-primary">
            <Link href={`/tag/${slug}`}>
              <p className="text-red p-2">
                #{name} ( {count} inlägg )
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Tags;
