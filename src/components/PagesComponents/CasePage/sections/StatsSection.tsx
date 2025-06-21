import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  IconBrandGoogle,
  IconRocket,
  IconTrendingUp,
  IconDeviceMobile
} from '@tabler/icons-react';

const stats = [
  {
    icon: IconBrandGoogle,
    value: '98/100',
    label: 'PageSpeed Score',
    color: '#B84F3C'
  },
  {
    icon: IconRocket,
    value: '0.6s',
    label: 'Laddningstid',
    color: '#A98A3E'
  },
  {
    icon: IconTrendingUp,
    value: 'Top 3',
    label: 'Google ranking',
    color: '#6A8BA2'
  },
  {
    icon: IconDeviceMobile,
    value: '+85%',
    label: 'Konvertering',
    color: '#7C3AED'
  }
];

const StatsSection = () => {
  return (
    <Section className="py-16 bg-secondary">
      <SectionContainer>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon 
                    className="mx-auto mb-4 h-10 w-10" 
                    style={{ color: stat.color }}
                    stroke={1.5}
                  />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </Section>
  );
};

export default StatsSection;