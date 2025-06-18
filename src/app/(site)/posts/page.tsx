import { Posts } from '@/components/Posts';
import { getAllPosts } from '@/lib/mdx';
import SubHero from '@/components/SubHero';
import img from '@/assets/blog-hero.png';
import Section from '@/components/ui/Section';

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <SubHero
        title="Välkommen till vår blogg"
        description="Här delar vi med oss av nyheter, insikter och tips om webbdesign och SEO."
        imageSrc={img}
        textAlign="center"
        alt="Anteckningsbok med pennor i förgrunden och digitala effekter i bakgrunden, som symboliserar kreativitet och teknisk utveckling för bloggen."
        secondaryCTA={{ text: 'Utforska Tags', href: '/tag' }}
      />
      {posts?.length > 0 && (
        <Section>
          <Posts posts={posts} />
        </Section>
      )}
    </>
  );
}
