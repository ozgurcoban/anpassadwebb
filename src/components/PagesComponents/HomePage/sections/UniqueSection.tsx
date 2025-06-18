import ContentSection from '@/components/ui/ContentSection';
import uniqueImg from '@/assets/unique-services.png';

const UniqueSection = () => {
  return (
    <ContentSection
      title={
        <>
          Varje företag är{' '}
          <strong className="inline-block bg-gradient-to-r from-pink-400 via-yellow-400 via-50% to-teal-400 bg-clip-text font-extrabold text-transparent">
            unikt.
          </strong>
        </>
      }
      description="Därför erbjuder vi skräddarsydda webbsidor – allt för att hjälpa ditt företag att sticka ut online."
      imageSrc={uniqueImg}
      buttonLabel="Våra tjänster"
    />
  );
};

export default UniqueSection;