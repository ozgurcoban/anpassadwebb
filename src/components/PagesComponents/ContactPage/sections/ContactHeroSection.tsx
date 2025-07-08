import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const ContactHeroSection = () => {
  return (
    <GradientHero
      title="Kontakta oss"
      description="Lokal webbyrå i Uppsala redo att hjälpa dig. Vi finns här för att diskutera ditt nästa projekt och hjälpa dig ta nästa steg i din digitala resa."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      overlayOpacity={0.85}
      minHeight="min-h-[300px] md:min-h-[450px]"
    />
  );
};

export default ContactHeroSection;