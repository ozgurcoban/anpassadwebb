import { Posts } from '@/components/Posts';
import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { POSTS_QUERYResult } from '../../../../sanity.types';
import SubHero from '@/components/SubHero';
import img from '@/assets/blog-hero.png';

export default async function PostsPage() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  });

  return (
    <>
      <SubHero
        title="Välkommen till vår blogg"
        description="Här delar vi med oss av nyheter, insikter och tips om webbdesign och SEO."
        imageSrc={img}
        textAlign="center"
        alt="Anteckningsbok med pennor i förgrunden och digitala effekter i bakgrunden, som symboliserar kreativitet och teknisk utveckling för bloggen."
      />
      {posts?.length > 0 && <Posts posts={posts} />}
    </>
  );
}
