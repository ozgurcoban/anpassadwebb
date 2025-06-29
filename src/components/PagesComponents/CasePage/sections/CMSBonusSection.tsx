'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/card';
import { Smartphone, Globe, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Text from '@/components/ui/Text';

interface CMSFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  mockupContent: React.ReactNode;
}

const CMSBonusSection = () => {
  const [activeFeature, setActiveFeature] = useState('mobile');

  const features: CMSFeature[] = [
    {
      id: 'mobile',
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Ändra från mobilen',
      description: 'Uppdatera direkt i mobilen - var du än befinner dig',
      mockupContent: (
        <div className="relative h-full w-full bg-black">
          <Image
            src="/images/palermo-case/cms-mobile-edit1.webp"
            alt="CMS mobile editing interface showing menu editing functionality"
            fill
            className="-m-[1px] scale-[1.01] object-fill"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ),
    },
    {
      id: 'customizable',
      icon: <Globe className="h-5 w-5" />,
      title: 'Designa precis som du vill',
      description: 'Skräddarsydd för dina specifika behov',
      mockupContent: (
        <div className="relative h-full w-full bg-black">
          <Image
            src="/images/palermo-case/cms-mobile-edit2.png"
            alt="CMS mobile customization interface"
            fill
            className="-m-[1px] scale-[1.01] object-fill"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={true}
          />
        </div>
      ),
    },
    {
      id: 'timesaver',
      icon: <Clock className="h-5 w-5" />,
      title: 'Skydd mot misstag',
      description: 'Systemet säger till om något inte stämmer',
      mockupContent: (
        <div className="relative h-full w-full bg-black">
          <Image
            src="/images/palermo-case/cms-mobile-edit3.png"
            alt="CMS mobile error protection interface"
            fill
            className="-m-[1px] scale-[1.01] object-fill"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={true}
          />
        </div>
      ),
    },
  ];

  return (
    <Section className="py-16 md:py-20">
      <SectionContainer>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Bonusen: De styr allt själva"
            subtitle="Uppdatera menyn från soffan"
            subtitleClassName="text-2xl font-semibold text-primary mx-auto max-w-2xl"
          />

          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Mobile Mockup */}
            <div className="relative order-2 lg:order-1">
              <div
                className="relative mx-auto aspect-[9/16] max-w-sm overflow-hidden rounded-[2.1rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-2 shadow-2xl"
                style={{ height: 'calc(100% - 2px)' }}
              >
                {/* Metallic shine overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[2.1rem] bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                <div className="pointer-events-none absolute left-0 top-0 h-1/3 w-full rounded-t-[2.1rem] bg-gradient-to-b from-white/20 to-transparent" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-black">
                  {/* Dynamic content based on selected feature */}
                  <div className="absolute inset-0">
                    {
                      features.find((f) => f.id === activeFeature)
                        ?.mockupContent
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="order-1 space-y-4 lg:order-2">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-4 p-6 transition-all',
                    activeFeature === feature.id
                      ? 'scale-[1.02] border-primary shadow-lg'
                      : 'hover:scale-[1.01] hover:shadow-md',
                  )}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
                      activeFeature === feature.id
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary',
                    )}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{feature.title}</h3>
                    <Text className="text-muted-foreground">
                      {feature.description}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default CMSBonusSection;
