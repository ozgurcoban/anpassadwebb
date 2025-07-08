import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const CaseHeroSection = () => {
  return (
    <GradientHero
      title="Från osynlig till omtyckt - Palermos digitala resa"
      description="Se hur vi hjälpte en klassisk kvarterskrog i Uppsala bli enklare att hitta online. Ett lokalt samarbete för webbutveckling Uppsala."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      overlayOpacity={0.85}
    />
  );
};

export default CaseHeroSection;
