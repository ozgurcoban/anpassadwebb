import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const BlogHeroSection = () => {
  return (
    <GradientHero
      title="Insikter & inspiration"
      description="Här delar vi med oss av nyheter, insikter och tips om webbdesign, SEO och digital marknadsföring"
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="center"
      verticalCenter={true}
      minHeight="40vh"
      overlayOpacity={0.85}
    />
  );
};

export default BlogHeroSection;
