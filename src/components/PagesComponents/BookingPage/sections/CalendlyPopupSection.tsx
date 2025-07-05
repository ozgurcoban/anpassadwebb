'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { CalendlyButton } from '@/components/CalendlyButton';
import { CALENDLY_URL } from '@/config/calendly';

interface CalendlyPopupSectionProps {
  calendlyUrl?: string;
}

const CalendlyPopupSection: React.FC<CalendlyPopupSectionProps> = ({ 
  calendlyUrl = CALENDLY_URL
}) => {
  return (
    <Section className="py-20 text-center">
      <div className="mx-auto max-w-2xl space-y-8">
        <SectionHeading
          title="Redo att ta nästa steg?"
          subtitle="Klicka på knappen nedan för att välja en tid som passar dig."
          as="h2"
          titleClassName="text-3xl font-bold"
          subtitleClassName="text-lg text-muted-foreground"
        />
        
        <CalendlyButton 
          url={calendlyUrl}
          text="Välj tid för möte"
          className="mx-auto"
          variant="rainbow"
        />
      </div>
    </Section>
  );
};

export default CalendlyPopupSection;