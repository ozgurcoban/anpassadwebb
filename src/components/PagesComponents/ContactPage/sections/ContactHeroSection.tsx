import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const ContactHeroSection = () => {
  return (
    <GradientHero
      title="Kontakta oss"
      description="Vi finns här i Uppsala för att hjälpa dig med ditt nästa projekt. Låt oss diskutera hur vi kan förbättra din digitala närvaro."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      overlayOpacity={0.85}
      minHeight="min-h-[300px] md:min-h-[450px]"
    />
  );
};

export default ContactHeroSection;