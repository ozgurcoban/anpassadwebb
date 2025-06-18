import SubHero from '@/components/SubHero';
import img from '@/assets/about-us-hero.png';

const ContactHeroSection = () => {
  return (
    <SubHero
      title="Kontakta oss"
      description="Har du frågor eller vill diskutera ditt nästa projekt? Vi finns här för att hjälpa dig ta nästa steg i din digitala resa."
      imageSrc={img}
      textAlign="right"
      alt="Kontaktbild"
      minHeight="40vh"
    />
  );
};

export default ContactHeroSection;