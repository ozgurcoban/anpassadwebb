import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

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
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="center"
      verticalCenter={true}
      minHeight="45vh"
    />
  );
};

export default BlogHeroSection;
