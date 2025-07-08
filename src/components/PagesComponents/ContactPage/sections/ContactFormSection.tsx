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
              Låt oss prata om ditt projekt
            </Text>
            <Text as="p" className="text-center text-xl text-muted-foreground leading-relaxed">
              Har du frågor eller vill diskutera ett projekt? 
              Fyll i formuläret så hör vi av oss inom kort.
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