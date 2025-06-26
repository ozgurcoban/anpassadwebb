import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const ContactHeroSection = () => {
  return (
    <GradientHero
      title="Kontakta oss"
      description="Har du frågor eller vill diskutera ditt nästa projekt? Vi finns här för att hjälpa dig ta nästa steg i din digitala resa."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      overlayOpacity={0.85}
    />
  );
};

export default ContactHeroSection;