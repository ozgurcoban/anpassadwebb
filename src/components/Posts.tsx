import Link from 'next/link';
import Image from 'next/image';
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
import { capitalizeFirstLetter } from '@/utils/stringUtils';

export const revalidate = 60;

export async function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {posts.map((post) => {
        const {
          title,
          _id: id,
          excerpt,
          mainImage,
          publishedAt,
          tags,
        } = post || {};
        const alt = (mainImage as { alt?: string })?.alt;
        console.log('tags', tags);

        return (
          <article key={id}>
            <Link
              className="hover:bg-secondary"
              href={`/posts/${post?.slug?.current}`}
            >
              <Card className="max-auto relative grid min-h-[31rem] max-w-[90vw] auto-rows-[8rem_3rem_minmax(10rem,auto)_auto] text-balance rounded border-none">
                {/* Background Image */}
                {/* <Image
                  src="/background.png"
                  alt="background image"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 z-0"
                /> */}

                {/* Overlay */}
                {/* <div className="absolute inset-0 z-10 rounded border-none bg-black opacity-30" /> */}

                {/* Content */}
                <div className="relative z-20 row-span-4 grid min-h-[30rem] grid-rows-subgrid gap-4 rounded shadow-custom">
                  <CardHeader className="font-medium">
                    <CardTitle>
                      {title && capitalizeFirstLetter(title)}
                    </CardTitle>
                  </CardHeader>
                  <p className="self-center px-[1.5rem] text-xs font-semibold">
                    {publishedAt
                      ? formattedDate(publishedAt)
                      : formattedDate('2025-01-01')}
                  </p>
                  <CardContent>
                    {/* {mainImage?.asset?.url ? (
                    <SanityImage
                    className="mt-4 w-full rounded-lg"
                      src={mainImage}
                      alt={alt}
                    />
                  ) : null} */}

                    {excerpt}
                  </CardContent>

                  {/* <Image src="" alt="jackson" /> */}

                  <CardFooter className="mt-auto flex flex-wrap gap-2 text-sm">
                    {tags &&
                      tags.map((tag, index) => {
                        const { title, _id: id } = tag || {};
                        return (
                          <p
                            key={id}
                            className={`gap-1 lowercase ${index >= 2 ? 'col-span-2' : ''}`}
                          >
                            #{title}
                          </p>
                        );
                      })}
                  </CardFooter>
                </div>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
