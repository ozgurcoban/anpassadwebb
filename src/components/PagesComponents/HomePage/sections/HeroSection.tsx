import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';
import heroImage from '../../../../../public/images/hero.webp';

const HeroSection = () => {
  return (
    <GradientHero
      title={
        <>
          Anpassade webblösningar som{' '}
          <span className="bg-gradient-to-r from-brand-blue-light via-brand-purple-light to-brand-pink-light bg-clip-text !text-transparent [text-shadow:none]">
            driver din affär
          </span>{' '}
          framåt
        </>
      }
      description="Vi skapar snabba, Google-optimerade hemsidor och är din lokala partner för webbutveckling i Uppsala."
      colorScheme="blue-purple"
      particleColors={DEFAULT_PARTICLE_COLORS}
      textAlign="left"
      minHeight="70dvh"
      backgroundImage={{
        src: heroImage,
        alt: 'Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik.',
        priority: true,
      }}
      overlayOpacity={0.85}
      secondaryCTA={{
        text: 'Se vårt arbete',
        href: '/case',
        variant: 'ghost-hero',
      }}
      verticalCenter={true}
      showValueProposition={true}
    />
  );
};

export default HeroSection;
