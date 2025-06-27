'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import {
  Smartphone,
  Globe,
  Clock,
  Save,
  Check,
  Menu,
  Calendar,
  Settings,
} from 'lucide-react';
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
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b bg-white p-3">
            <div className="flex items-center justify-between">
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">Redigera meny</span>
              <Save className="h-5 w-5 text-primary" />
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 space-y-3 bg-gray-50 p-4">
            <div className="rounded-lg border-2 border-primary bg-white p-3">
              <div className="mb-1 text-xs font-medium">Pizza Margherita</div>
              <input
                type="text"
                value="125 kr"
                className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
                readOnly
              />
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="mb-1 text-xs text-gray-600">
                Pizza Capricciosa
              </div>
              <div className="text-sm">135 kr</div>
            </div>
          </div>
          {/* Keyboard mockup */}
          <div className="bg-gray-200 p-2">
            <div className="grid grid-cols-10 gap-1">
              {[...'1234567890'].map((key) => (
                <div
                  key={key}
                  className="rounded bg-white p-1 text-center text-xs"
                >
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'customizable',
      icon: <Globe className="h-5 w-5" />,
      title: 'Designa precis som du vill',
      description: 'Skräddarsydd för dina specifika behov',
      mockupContent: (
        <div className="h-full bg-gray-50 p-4">
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Menu className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Menyhantering</span>
              </div>
              <div className="text-xs text-gray-600">
                Pizza, Pasta, Sallader
              </div>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Öppettider</span>
              </div>
              <div className="text-xs text-gray-600">Mån-Fre: 11-22</div>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Språkinställningar</span>
              </div>
              <div className="mt-1 flex gap-2">
                <span className="rounded bg-primary/10 px-2 py-1 text-xs">
                  🇸🇪 Svenska
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  🇬🇧 English
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'timesaver',
      icon: <Clock className="h-5 w-5" />,
      title: 'Skydd mot fel',
      description: 'Systemet säger till om något inte stämmer',
      mockupContent: (
        <div className="h-full bg-gray-50 p-4">
          <div className="space-y-3">
            {/* Quick edit */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 text-xs font-medium">Dagens lunch</div>
              <textarea
                className="w-full rounded bg-gray-100 p-2 text-xs"
                rows={3}
                value="Pasta Carbonara - 95 kr
Caesarsallad - 89 kr
Veckans soppa - 79 kr"
                readOnly
              />
            </div>
            {/* Success notification */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-800">
                  Ändringar publicerade!
                </span>
              </div>
            </div>
            {/* Time saved */}
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <div className="text-lg font-bold text-primary">2 minuter</div>
              <div className="text-xs text-gray-600">istället för 2 timmar</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section className="py-16 md:py-20">
      <SectionContainer>
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Bonusen: De styr allt själva
            </h2>
            <Text className="text-2xl font-semibold text-primary">
              Uppdatera menyn från soffan
            </Text>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Mobile Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="mx-auto aspect-[9/16] max-w-sm rounded-[3rem] bg-gradient-to-br from-gray-900 to-gray-700 p-4 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white">
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
