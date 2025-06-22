import GradientHero from '@/components/GradientHero';

const PackagesHeroSection = () => {
  return (
    <GradientHero
      title="Paket som passar din verksamhet"
      description="Från enkel startsida till komplett digital lösning. Välj det paket som passar dina behov och budget."
      colorScheme="purple-pink"
      textAlign="left"
      minHeight="50vh"
      secondaryCTA={{
        text: "Se våra paket",
        href: "#paket"
      }}
    />
  );
};

export default PackagesHeroSection;