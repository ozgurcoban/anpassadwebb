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
import Image from 'next/image';

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {posts.map((post) => {
        // console.log(post);

        return (
          <article key={post._id}>
            <Link
              className="hover:bg-secondary"
              href={`/posts/${post?.slug?.current}`}
            >
              <Card className="p-4">
                {post?.title}
                {/* <Image src="" alt="jackson" /> */}
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
