import { POSTS_QUERYResult } from '../../../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { Posts } from '@/components/Posts';

type PageProps = {
  params: {
    slug: string;
  };
};

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
