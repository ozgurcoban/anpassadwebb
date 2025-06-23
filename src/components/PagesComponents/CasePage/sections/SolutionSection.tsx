import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { Zap, Settings, Target } from 'lucide-react';
import Text from '@/components/ui/Text';

interface SolutionBlock {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const SolutionSection = () => {
  const solutions: SolutionBlock[] = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Snabb som blixten',
      description: 'Vi byggde om allt från grunden med modern teknik',
      color: 'text-yellow-600',
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Full CMS-kontroll',
      description: 'Komplett kontroll över webbplatsens alla detaljer',
      color: 'text-blue-600',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Google-vänlig',
      description: 'Optimerad för sökmotorer från dag ett',
      color: 'text-green-600',
    },
  ];

  return (
    <Section className="py-16 md:py-20">
      <SectionContainer>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Vår lösning</h2>
          <Text className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tre enkla steg som förändrade allt för Palermo
          </Text>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="p-8 text-center transition-shadow hover:shadow-lg"
            >
              <div className={`mb-4 flex justify-center ${solution.color}`}>
                {solution.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{solution.title}</h3>
              <Text className="text-muted-foreground">
                {solution.description}
              </Text>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
};

export default SolutionSection;
