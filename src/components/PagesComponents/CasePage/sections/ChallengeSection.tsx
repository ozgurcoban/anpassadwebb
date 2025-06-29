import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import { AlertCircle } from 'lucide-react';
import Text from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/card';

const ChallengeSection = () => {
  const problems = [
    'Inte mobilanpassad',
    'Långsam laddningstid',
    'Dålig SEO-optimering',
  ];

  return (
    <Section className="bg-muted/30 py-16">
      <SectionContainer>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Utmaningen"
            className="mb-6"
            titleClassName="mb-4 text-3xl font-bold text-left"
          />

          <Text className="mb-6 text-lg">
            Palermo hade en hemsida som inte fungerade på mobiler. Google
            straffade dem för det. Kunderna hittade inte menyn. De tappade
            affärer till konkurrenter som syntes bättre online.
          </Text>

          <Card className="mb-8">
            <CardContent className="space-y-3 pt-6">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                  <Text className="text-muted-foreground">{problem}</Text>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-destructive bg-destructive/10">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
              <Text className="font-semibold text-destructive">
                Resultatet: Få hittade dem på Google
              </Text>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default ChallengeSection;
