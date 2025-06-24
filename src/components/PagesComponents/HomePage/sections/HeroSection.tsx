import GradientHero from '@/components/GradientHero';
import heroImage from '../../../../../public/images/hero.webp';

const HeroSection = () => {
  return (
    <GradientHero
      title={
        <>
          Hemsidor som{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            funkar
          </span>{' '}
          på riktigt
        </>
      }
      description="Vi skapar skräddarsydda hemsidor som laddar snabbt, rankar på Google och hjälper småföretag att växa online"
      colorScheme="blue-purple"
      textAlign="left"
      minHeight="80vh"
      backgroundImage={{
        src: heroImage,
        alt: "Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik.",
        priority: true
      }}
      overlayOpacity={0.85}
      secondaryCTA={{
        text: "Se vårt arbete",
        href: "#arbete"
      }}
      verticalCenter={true}
    />
  );
};

export default HeroSection;