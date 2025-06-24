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

// Move static data outside component to prevent recreations
const RESULTS: AnimatedNumber[] = [
  {
    value: 30,
    suffix: '% snabbare',
    label: 'betjäning under rusningstid',
  },
  {
    value: 25,
    suffix: '% ökning',
    label: 'av återkommande kunder',
  },
  {
    value: 92,
    suffix: '% nöjda',
    label: 'kunder enligt recensioner',
  },
];

const AnimatedResultsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after triggering to prevent further observations
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []); // Remove isVisible from dependencies

  useEffect(() => {
    if (isVisible) {
      // Clear any existing intervals before starting new ones
      intervalRefs.current.forEach(timer => clearInterval(timer));
      intervalRefs.current = [];

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      RESULTS.forEach((result, index) => {
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
            // Remove this timer from the ref array
            intervalRefs.current = intervalRefs.current.filter(t => t !== timer);
          }
        }, stepDuration);

        // Store the timer reference
        intervalRefs.current.push(timer);
      });
    }

    // Cleanup function to clear all intervals on unmount or when isVisible changes
    return () => {
      intervalRefs.current.forEach(timer => clearInterval(timer));
      intervalRefs.current = [];
    };
  }, [isVisible]);

  return (
    <Section className="py-20 bg-muted/30">
      <div ref={sectionRef}>
        <SectionContainer>
          <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Resultat som räknas</h2>
          <Text className="text-lg text-muted-foreground">
            Konkreta siffror som visar på verklig förändring
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {RESULTS.map((result, index) => (
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
      </div>
    </Section>
  );
};

export default AnimatedResultsSection;