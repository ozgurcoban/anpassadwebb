import GradientHero from '@/components/GradientHero';

const CaseHeroSection = () => {
  return (
    <GradientHero
      title="Palermo - Ett mästerverk"
      description="En djupdykning i hur vi skapade en SEO-optimerad och väldesignad webbplats som sätter nya standarder för restaurangbranschen."
      colorScheme="blue-purple"
      particleColors={['#ff6b6b', '#4ecdc4', '#ffe66d']}
      textAlign="left"
      minHeight="50vh"
    />
  );
};

export default CaseHeroSection;
