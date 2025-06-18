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

export const revalidate = 60;

type PostsProps = {
  posts: Post[];
  locale?: string;
};

export async function Posts({ posts, locale = blogConfig.defaultLocale }: PostsProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const {
          slug,
          frontmatter: {
            title,
            description,
            date,
            tags,
            image,
            imageAlt
          },
          readingTime
        } = post;

        return (
          <article
            key={slug}
            className="max-w-sm shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.025] hover:shadow-lg"
          >
            <div
              className="mx-auto grid auto-rows-[16rem_auto_auto_auto] text-balance border-none text-card hover:bg-secondary sm:min-h-[34rem] sm:max-w-full"
            >
              {/* Content */}
              <Card className="relative row-span-4 grid w-full grid-rows-subgrid gap-4 overflow-hidden rounded shadow-custom">
                <Link
                  href={`/posts/${slug}`}
                  className="contents cursor-pointer"
                >
                  <CardHeader className="relative h-64 space-y-0 overflow-hidden p-0 font-medium uppercase">
                    {image && (
                      <div className="relative h-full w-full">
                        <Image
                          src={image}
                          alt={imageAlt || title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute left-0 top-0 mt-0 h-1/4 w-full bg-gradient-to-b from-black to-transparent" />
                    <p className="absolute right-6 top-3 rounded text-xs font-medium text-white">
                      {formatDateWithFallback(date, locale)}
                    </p>
                  </CardHeader>
                  <CardTitle className="px-[1.5rem] font-heading text-xl">
                    {title && capitalizeFirstLetter(title)}
                  </CardTitle>
                  <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {readingTime.text}
                    </p>
                  </CardContent>
                </Link>
                <CardFooter className="mt-auto flex flex-wrap gap-2 text-sm">
                  {tags &&
                    tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Badge
                          variant="outline"
                          className="rounded-full border px-3 py-1 text-sm transition duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-primary"
                        >
                          {tag}
                        </Badge>
                      </Link>
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