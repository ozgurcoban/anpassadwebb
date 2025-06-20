import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '@/lib/mdx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateWithFallback } from '@/utils/formattedDate';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { Badge } from '@/components/ui/badge';
import { blogConfig } from '@/lib/blog-config';

type PostsProps = {
  posts: Post[];
  locale?: string;
};

export async function Posts({
  posts,
  locale = blogConfig.defaultLocale,
}: PostsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 [grid-template-rows:auto_1fr_auto_auto] md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const {
          slug,
          frontmatter: { title, description, date, tags, image, imageAlt },
          readingTime,
        } = post;

        return (
          <article
            key={slug}
            className="group grid overflow-hidden rounded-xl bg-white shadow-sm transition-all [grid-row:span_4] [grid-template-rows:subgrid] hover:shadow-md dark:bg-gray-800"
          >
            {/* Image - Row 1 */}
            <Link
              href={`/posts/${slug}`}
              className="relative h-48 w-full overflow-hidden"
            >
              {image ? (
                <>
                  <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-pink-300/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
              )}
            </Link>

            {/* Content - Row 2 */}
            <div className="flex flex-col p-6">
              <Link href={`/posts/${slug}`} className="flex-grow">
                <h3 className="mb-2 font-heading text-xl font-semibold transition-colors group-hover:text-primary">
                  {title && capitalizeFirstLetter(title)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </Link>
            </div>

            {/* Meta - Row 3 */}
            <div className="flex items-center gap-2 px-6 pb-4 text-sm text-gray-500 dark:text-gray-500">
              <span>{formatDateWithFallback(date, locale)}</span>
              <span>•</span>
              <span>{readingTime.text}</span>
            </div>

            {/* Tags - Row 4 */}
            <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-700">
              {tags && tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-3 py-1 text-xs font-medium text-gray-700 transition-all hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="h-6" />
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
