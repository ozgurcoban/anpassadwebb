import SubHero from '@/components/SubHero';
import img from '@/assets/about-us-hero.png';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import { ContactButton } from '@/components/ContactButton';
import { ContactForm } from '@/components/ContactForm';

const KontaktPage = () => {
  return (
    <>
      <SubHero
        title="Kontakta oss"
        description="Har du frågor eller vill diskutera ditt nästa projekt? Vi finns här för att hjälpa dig ta nästa steg i din digitala resa."
        imageSrc={img}
        textAlign="right"
        alt="Kontaktbild"
        minHeight="40vh"
      />
      <Section className="grid gap-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <Text as="h2" className="text-center text-4xl">
            Vi vill höra från dig
          </Text>
          <Text as="p" className="text-center text-lg text-muted-foreground">
            Oavsett om du har en konkret idé eller bara vill utforska möjligheterna, 
            är vi redo att lyssna och hjälpa till. Kontakta oss idag för en kostnadsfri konsultation.
          </Text>
        </div>
        
        <div className="mx-auto w-full max-w-2xl">
          <ContactForm />
        </div>

        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Text as="h3" className="text-2xl">
            Eller boka ett möte direkt
          </Text>
          <Text as="p" className="text-lg text-muted-foreground">
            Föredrar du att boka in ett möte direkt? Klicka nedan för att välja en tid som passar dig.
          </Text>
          <ContactButton className="mx-auto" />
        </div>
      </Section>
    </>
  );
};

export default KontaktPage;
