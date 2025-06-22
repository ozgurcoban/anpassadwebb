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
            <h3 className="px-2 text-3xl font-medium leading-snug">Redo att klättra på Google?</h3>
            <Text size="lg" className="text-muted-foreground">
              Vi hjälpte Palermo från plats 25 till 4. Var står du idag?
            </Text>
            <ContactButton className="mt-6" text="Boka gratis genomgång" />
          </CardContent>
        </Card>
      </SectionContainer>
    </Section>
  );
};

export default CTASection;