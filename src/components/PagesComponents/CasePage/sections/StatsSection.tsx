import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card, CardContent } from '@/components/ui/card';
import { palermoProject } from '@/data/caseStudies';

const StatsSection = () => {
  const { results } = palermoProject;
  
  if (!results || results.length === 0) return null;

  return (
    <Section className="py-20">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {results.map((result, index) => (
            <Card key={index} className="group transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center space-y-2 p-8 text-center">
                <p className="text-5xl font-light transition-colors group-hover:text-primary">{result.value}</p>
                <p className="text-lg text-muted-foreground">{result.metric}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
};

export default StatsSection;