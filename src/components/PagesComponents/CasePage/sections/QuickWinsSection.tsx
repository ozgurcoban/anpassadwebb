'use client';

import React, { useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { TrendingUp, Palette, Smartphone } from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const QuickWinsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatCard[] = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: 'Från plats 25 → 4',
      label: 'på Google för "pizza uppsala"',
      color: 'text-green-600',
    },
    {
      icon: <Palette className="h-8 w-8" />,
      value: '90-tal → 2025',
      label: 'modern design',
      color: 'text-blue-600',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      value: 'Styr själva',
      label: 'enkelt från mobilen',
      color: 'text-purple-600',
    },
  ];

  return (
    <Section className="py-16 md:py-20">
      <div ref={sectionRef}>
        <SectionContainer>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`transform p-6 text-center transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`mb-4 flex justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </div>
    </Section>
  );
};

export default QuickWinsSection;
