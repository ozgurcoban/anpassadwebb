import { POSTS_QUERYResult } from '../../../../../sanity.types';
import { client, sanityFetch } from '@/sanity/lib/client';
import { Posts } from '@/components/Posts';
import { POSTS_QUERY } from '@/sanity/lib/queries';

type PageProps = {
  params: {
    slug: string;
  };
};

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

const SingleTagPage = async ({ params }: PageProps) => {
  const { slug } = params;

  const query = `*[_type == "post" && _type == "tag"]{
  _id,
  title,
  excerpt,
  tags[]->{title, slug},
  publishedAt,
  mainImage {
    asset->{
      url,
      metadata {
        lqip
      }
    },
    alt
  },
}`;

  const posts = await sanityFetch<POSTS_QUERYResult>({
    query,
    params: { slug },
  });

  return (
    <div>
      <h1 className="text-4xl uppercase">#{params?.slug} #tags</h1>
      <Posts posts={posts} />
    </div>
  );
};
export default SingleTagPage;
