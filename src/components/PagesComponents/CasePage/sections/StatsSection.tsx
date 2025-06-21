import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { palermoProject } from '@/data/caseStudies';

const StatsSection = () => {
  const { results } = palermoProject;
  
  if (!results || results.length === 0) return null;

  return (
    <Section className="py-20">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-3">
          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              <p className="text-5xl font-light">{result.value}</p>
              <p className="text-lg text-muted-foreground">{result.metric}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
};

export default StatsSection;