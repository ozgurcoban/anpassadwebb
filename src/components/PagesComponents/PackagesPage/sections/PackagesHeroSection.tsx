import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const PackagesHeroSection = () => {
  return (
    <GradientHero
      title="Paket som passar din verksamhet"
      description="Från enkel startsida till komplett digital lösning. Välj det paket som passar dina behov och budget."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      secondaryCTA={{
        text: 'Kontakta oss',
        href: '/kontakt',
        variant: undefined, // This will use the default button variant (primary)
      }}
    />
  );
};

export default PackagesHeroSection;
