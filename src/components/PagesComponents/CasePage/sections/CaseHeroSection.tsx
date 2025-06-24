import GradientHero from '@/components/GradientHero';

const CaseHeroSection = () => {
  return (
    <GradientHero
      title="Från osynlig till omtyckt - Palermos digitala resa"
      description="Se hur en klassisk kvarterskrog blev enklare att hitta, besöka och beställa från"
      colorScheme="blue-purple"
      particleColors={['#ff6b6b', '#4ecdc4', '#ffe66d']}
      textAlign="left"
      minHeight="60vh"
      secondaryCTA={{
        text: 'Se transformationen',
        href: '#before-after-section',
      }}
    />
  );
};

export default CaseHeroSection;
