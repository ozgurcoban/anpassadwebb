import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { Zap, Settings, Target } from 'lucide-react';
import Text from '@/components/ui/Text';
import { PRIMARY_GRADIENT } from '@/lib/gradient-constants';

interface SolutionBlock {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SolutionSection = () => {
  const solutions: SolutionBlock[] = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: 'Snabb som blixten',
      description: 'Vi byggde om allt från grunden med modern teknik',
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: 'Full CMS-kontroll',
      description: 'Komplett kontroll över webbplatsens alla detaljer',
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: 'Google-vänlig',
      description: 'Optimerad för sökmotorer från dag ett',
    },
  ];

  return (
    <Section className="py-16 md:py-20">
      <SectionContainer>
        {/* SVG Gradient Definition */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" /> {/* blue-400 */}
              <stop offset="50%" stopColor="#a78bfa" /> {/* purple-400 */}
              <stop offset="100%" stopColor="#f472b6" /> {/* pink-400 */}
            </linearGradient>
          </defs>
        </svg>
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
              className="group p-8 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mb-6 flex justify-center [&_svg]:fill-[url(#icon-gradient)] [&_svg]:stroke-black [&_svg]:stroke-1 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110">
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
