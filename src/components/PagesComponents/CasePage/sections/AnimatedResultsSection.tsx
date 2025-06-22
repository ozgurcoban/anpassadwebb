'use client';

import React, { useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import Text from '@/components/ui/Text';

interface AnimatedNumber {
  value: number;
  suffix: string;
  label: string;
}

const AnimatedResultsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const results: AnimatedNumber[] = [
    {
      value: 45,
      suffix: '% fler',
      label: 'online-beställningar',
    },
    {
      value: 10,
      suffix: ' timmar',
      label: 'sparad tid varje månad',
    },
    {
      value: 4,
      suffix: ':a plats',
      label: 'på Google för "pizza uppsala"',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      results.forEach((result, index) => {
        let currentStep = 0;
        const increment = result.value / steps;

        const timer = setInterval(() => {
          currentStep++;
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(currentStep * increment, result.value);
            return newCounts;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible]);

  return (
    <Section className="py-20 bg-muted/30" ref={sectionRef}>
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Resultat som räknas</h2>
          <Text className="text-lg text-muted-foreground">
            Konkreta siffror som visar på verklig förändring
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {results.map((result, index) => (
            <Card key={index} className="p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {Math.floor(counts[index])}{result.suffix}
              </div>
              <Text className="text-lg text-muted-foreground">
                {result.label}
              </Text>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
};

export default AnimatedResultsSection;