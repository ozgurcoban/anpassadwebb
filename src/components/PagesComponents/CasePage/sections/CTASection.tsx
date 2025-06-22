import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import Text from '@/components/ui/Text';
import { ContactButton } from '@/components/ContactButton';
import { Card, CardContent } from '@/components/ui/card';
import { IconTarget } from '@tabler/icons-react';

const CTASection = () => {
  return (
    <Section className="py-20">
      <SectionContainer>
        <Card className="mx-auto max-w-2xl bg-accent text-center">
          <CardContent className="space-y-6 p-10">
            <IconTarget className="mx-auto h-12 w-12 text-primary" stroke={1.5} />
            <h3 className="px-2 text-3xl font-medium leading-snug">Redo att starta ditt nästa projekt?</h3>
            <Text size="lg" className="text-muted-foreground">
              Låt oss hjälpa dig att skapa en digital närvaro som driver resultat. 
              Kontakta oss idag för en kostnadsfri konsultation.
            </Text>
            <ContactButton className="mt-6" />
          </CardContent>
        </Card>
      </SectionContainer>
    </Section>
  );
};

export default CTASection;