'use client';

import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import ContactForm from '@/components/ContactForm';

const ContactFormSection = () => {
  return (
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
    </Section>
  );
};

export default ContactFormSection;