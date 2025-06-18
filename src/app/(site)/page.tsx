import FeaturedPosts from '@/components/FeaturedPosts';
import uniqueImg from '@/assets/unique-services.png';
import Hero from '@/components/Hero';
import ContentSection from '@/components/ui/ContentSection';
import ServicesSection from '@/components/ServicesSection';

export default function Page() {
  return (
    <>
      <Hero />
      <ServicesSection />
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
      <FeaturedPosts />
    </>
  );
}
