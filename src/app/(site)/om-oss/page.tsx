import SubHero from '@/components/SubHero';
import img from '@/assets/about-us-hero.png';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

const AboutPage = () => {
  return (
    <>
      <SubHero
        title="Din lokala partner för digital tillväxt"
        description="Vi brinner för att hjälpa småföretag i Uppsala med webblösningar för att skapa digital närvaro och tillväxt."
        imageSrc={img}
        textAlign="right"
        alt="xirren"
        minHeight="40vh"
      />
      <Section className="grid gap-8">
        <Text as="h2" className="text-4xl">
          About moi
        </Text>
      </Section>
    </>
  );
};

export default AboutPage;
