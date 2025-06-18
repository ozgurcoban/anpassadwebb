import Link from 'next/link';
import { POSTS_QUERYResult } from '../../sanity.types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateWithFallback } from '@/utils/formattedDate';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import SanityImage from './SanityImage';
import { TagBadge } from './Blog/TagBadge';
import { blogConfig } from '@/lib/blog-config';

export const revalidate = 60;

type PostsProps = {
  posts: POSTS_QUERYResult;
  locale?: string;
};

export async function Posts({ posts, locale = blogConfig.defaultLocale }: PostsProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const {
          title,
          _id: id,
          excerpt,
          mainImage,
          publishedAt,
          tags,
        } = post || {};

        return (
          <article
            key={id}
            className="max-w-sm shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.025] hover:shadow-lg"
          >
            <div
              className="mx-auto grid auto-rows-[16rem_auto_auto_auto] text-balance border-none text-card hover:bg-secondary sm:min-h-[34rem] sm:max-w-full"
            >
              {/* Content */}
              <Card className="relative row-span-4 grid w-full grid-rows-subgrid gap-4 overflow-hidden rounded shadow-custom">
                <Link
                  href={`/posts/${post?.slug?.current}`}
                  className="contents cursor-pointer"
                >
                  <CardHeader className="relative h-64 space-y-0 overflow-hidden p-0 font-medium uppercase">
                    {mainImage?.asset && (
                      <SanityImage src={mainImage} className="object-cover" />
                    )}

                    {/* Overlay */}
                    <div className="absolute left-0 top-0 mt-0 h-1/4 w-full bg-gradient-to-b from-black to-transparent" />
                    <p className="absolute right-6 top-3 rounded text-xs font-medium text-white">
                      {formatDateWithFallback(publishedAt, locale)}
                    </p>
                  </CardHeader>
                  <CardTitle className="px-[1.5rem] font-heading text-xl">
                    {title && capitalizeFirstLetter(title)}
                  </CardTitle>
                  <CardContent>{excerpt}</CardContent>
                </Link>
                <CardFooter className="mt-auto flex flex-wrap gap-2 text-sm">
                  {tags &&
                    tags.map((tag) => (
                      <TagBadge 
                        key={tag._id} 
                        tag={tag}
                        className="rounded-full border px-3 py-1 text-sm transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-primary"
                      />
                    ))}
                </CardFooter>
              </Card>
            </div>
          </article>
        );
      })}
    </div>
  );
}
