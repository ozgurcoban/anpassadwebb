import React from 'react';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { 
  IconUsers,
  IconRocket,
  IconTrendingUp,
  IconSparkles
} from '@tabler/icons-react';

const stats = [
  {
    icon: IconUsers,
    value: '50+',
    label: 'Nöjda kunder',
    color: '#B84F3C'
  },
  {
    icon: IconRocket,
    value: '100+',
    label: 'Projekt levererade',
    color: '#A98A3E'
  },
  {
    icon: IconTrendingUp,
    value: '95%',
    label: 'Kundnöjdhet',
    color: '#6A8BA2'
  },
  {
    icon: IconSparkles,
    value: '2x',
    label: 'Genomsnittlig ROI',
    color: '#7C3AED'
  }
];

const StatsSection = () => {
  return (
    <Section variant="narrow" className="py-16">
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
    </Section>
  );
};

export default StatsSection;