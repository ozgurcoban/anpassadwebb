import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { AlertCircle } from 'lucide-react';
import Text from '@/components/ui/Text';

const ChallengeSection = () => {
  const problems = [
    'Inte mobilanpassad',
    'Långsam laddningstid',
    'Dålig SEO-optimering',
  ];

  return (
    <Section className="py-16 bg-muted/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Utmaningen</h2>
          
          <Text className="text-lg mb-6">
            Palermo hade en hemsida som inte fungerade på mobiler. Google straffade dem för det. 
            Kunderna hittade inte menyn. De tappade affärer till konkurrenter som syntes bättre online.
          </Text>

          <div className="space-y-3 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <Text className="text-muted-foreground">{problem}</Text>
              </div>
            ))}
          </div>

          <div className="bg-destructive/10 text-destructive rounded-lg p-4 inline-block">
            <Text className="font-semibold">
              Resultatet: Få hittade dem på Google
            </Text>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default ChallengeSection;