import Link from 'next/link';
import { POSTS_QUERYResult } from '../../sanity.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import formattedDate from '@/utils/formattedDate';

export const revalidate = 60;

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {posts.map((post) => {
        const { title, _id: id, excerpt, mainImage, publishedAt } = post || {};
        const alt = (mainImage as { alt?: string })?.alt;
        console.log('Posts.tsx mainImage:', mainImage);

        return (
          <article key={id}>
            <Link
              className="hover:bg-secondary"
              href={`/posts/${post?.slug?.current}`}
            >
              <Card className="">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* {mainImage?.asset?.url ? (
                    <SanityImage
                      className="mt-4 w-full rounded-lg"
                      src={mainImage}
                      alt={alt}
                    />
                  ) : null} */}
                  <CardDescription className="line-clamp-6">
                    {excerpt}
                  </CardDescription>
                </CardContent>

                {/* <Image src="" alt="jackson" /> */}
                <CardFooter>
                  {publishedAt ? (
                    <p>Publicerad:&nbsp;{formattedDate(publishedAt)}</p>
                  ) : (
                    <p>Publicerad:&nbsp;{formattedDate('2022-01-01')}</p>
                  )}
                </CardFooter>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
