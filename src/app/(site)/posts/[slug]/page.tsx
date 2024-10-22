import { QueryParams } from 'next-sanity';
import { notFound } from 'next/navigation';

import { POST_QUERY, POSTS_QUERY } from '@/sanity/lib/queries';

import { client, sanityFetch } from '@/sanity/lib/client';
import {
  POST_QUERYResult,
  POSTS_QUERYResult,
} from '../../../../../sanity.types';
import BlogPost from '@/components/Blog/BlogPost';
import { revalidatePath } from 'next/cache';

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: 'published' },
  );

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }));
}

export default async function Page(props: { params: Promise<QueryParams> }) {
  const params = await props.params;
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params,
  });
  if (!post) {
    return notFound();
  }
  return <BlogPost post={post} />;
}
