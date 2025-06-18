import SubHero from '@/components/SubHero';
import img from '@/assets/blog-hero.png';

const BlogHeroSection = () => {
  return (
    <SubHero
      title="Välkommen till vår blogg"
      description="Här delar vi med oss av nyheter, insikter och tips om webbdesign och SEO."
      imageSrc={img}
      textAlign="center"
      alt="Anteckningsbok med pennor i förgrunden och digitala effekter i bakgrunden, som symboliserar kreativitet och teknisk utveckling för bloggen."
      secondaryCTA={{ text: 'Utforska Tags', href: '/tag' }}
    />
  );
};

export default BlogHeroSection;