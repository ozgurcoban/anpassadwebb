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
import SanityImage from './SanityImage';

export const revalidate = 60;

export async function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        // console.log('mainImage', mainImage);

        return (
          <article key={id}>
            <Link
              className="hover:bg-secondary"
              href={`/posts/${post?.slug?.current}`}
            >
              <Card className="relative -z-10 mx-auto grid min-h-[30rem] max-w-[80vw] auto-rows-[minmax(8rem,10rem)_3rem_minmax(6rem,8rem)_auto] text-balance border-none text-card sm:min-h-[34rem] sm:max-w-full">
                {/* Overlay */}
                <div className="absolute inset-0 z-10 rounded border-none bg-black opacity-70" />
                {/* Background Image */}
                {/* <SanityImage
                  src={mainImage}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 z-0 rounded"
                /> */}

                {/* Content */}
                <div className="relative z-20 row-span-4 grid grid-rows-subgrid gap-4 rounded shadow-custom">
                  <CardHeader className="font-medium uppercase">
                    <CardTitle className="text-xl">
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
