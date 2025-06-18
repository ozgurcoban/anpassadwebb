import SubHero from '@/components/SubHero';
import img from '@/assets/services-hero.png';

const CaseHeroSection = () => {
  return (
    <SubHero
      title="Våra case"
      description="Utforska våra projekt och se hur vi har hjälpt småföretag i Uppsala att skapa en stark digital närvaro. Varje case visar vår passion för design, teknik och resultat."
      textAlign="left"
      imageSrc={img}
      alt="Portfolio av webbprojekt"
      minHeight="40vh"
    />
  );
};

export default CaseHeroSection;