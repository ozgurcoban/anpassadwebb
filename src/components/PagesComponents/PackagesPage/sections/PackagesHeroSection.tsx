import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const PackagesHeroSection = () => {
  return (
    <GradientHero
      title="Paket som passar din verksamhet"
      description="Prisvärda hemsidor för företag i Uppsala. Från enkel startsida till komplett digital lösning - välj det paket som passar din budget."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      secondaryCTA={{
        text: 'Jämför paket',
        href: '#paket',
        variant: 'ghost-hero',
      }}
    />
  );
};

export default PackagesHeroSection;
