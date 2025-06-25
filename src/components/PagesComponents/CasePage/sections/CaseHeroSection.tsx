import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const CaseHeroSection = () => {
  return (
    <GradientHero
      title="Från osynlig till omtyckt - Palermos digitala resa"
      description="Se hur en klassisk kvarterskrog blev enklare att hitta, besöka och beställa från"
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
    />
  );
};

export default CaseHeroSection;
