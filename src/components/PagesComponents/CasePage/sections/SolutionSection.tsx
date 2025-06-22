import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { Zap, Smartphone, Target } from 'lucide-react';
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
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobilfokus',
      description: 'Designade för telefonen först - där 75% surfar',
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Vår lösning</h2>
          <Text className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tre enkla steg som förändrade allt för Palermo
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className={`flex justify-center mb-4 ${solution.color}`}>
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
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