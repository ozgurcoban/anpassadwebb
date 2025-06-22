'use client';

import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import ContactForm from '@/components/ContactForm';

const ContactFormSection = () => {
  return (
    <Section className="grid gap-16 py-24">
      <div className="mx-auto max-w-4xl space-y-10">
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
    </Section>
  );
};

export default ContactFormSection;