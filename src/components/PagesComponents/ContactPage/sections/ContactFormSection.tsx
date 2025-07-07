'use client';

import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import Text from '@/components/ui/Text';
import ContactForm from '@/components/ContactForm';

const ContactFormSection = () => {
  return (
    <Section className="py-24">
      <SectionContainer>
        <div className="grid gap-16">
          <div className="space-y-10">
            <Text as="h2" className="text-center text-5xl font-bold tracking-tight">
              Vi vill höra från dig
            </Text>
            <Text as="p" className="text-center text-xl text-muted-foreground leading-relaxed">
              Oavsett om du har en konkret idé eller bara vill utforska möjligheterna, 
              är vi redo att lyssna och hjälpa till. Kontakta oss idag för en kostnadsfri konsultation.
            </Text>
          </div>
          
          <div className="mx-auto w-full max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default ContactFormSection;