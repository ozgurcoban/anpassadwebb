import GradientHero from '@/components/GradientHero';

const BlogHeroSection = () => {
  return (
    <GradientHero
      title={
        <>
          Insikter &{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            inspiration
          </span>
        </>
      }
      description="Här delar vi med oss av nyheter, insikter och tips om webbdesign, SEO och digital marknadsföring"
      colorScheme="blue-purple"
      particleColors={['#f472b6', '#fb7185', '#fbbf24']}
      textAlign="center"
      verticalCenter={true}
      minHeight="50vh"
      secondaryCTA={{
        text: "Utforska kategorier",
        href: "/tag"
      }}
    />
  );
};

export default BlogHeroSection;