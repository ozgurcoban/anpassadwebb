'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { Smartphone, Globe, Clock, Save, Check, Menu, Calendar, Settings } from 'lucide-react';
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
      description: 'Uppdatera menyn var som helst, när som helst',
      mockupContent: (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-3">
            <div className="flex items-center justify-between">
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">Redigera meny</span>
              <Save className="h-5 w-5 text-primary" />
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 bg-gray-50 p-4 space-y-3">
            <div className="bg-white rounded-lg p-3 border-2 border-primary">
              <div className="text-xs font-medium mb-1">Pizza Margherita</div>
              <input 
                type="text" 
                value="125 kr" 
                className="text-sm bg-gray-100 rounded px-2 py-1 w-full"
                readOnly
              />
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Pizza Capricciosa</div>
              <div className="text-sm">135 kr</div>
            </div>
          </div>
          {/* Keyboard mockup */}
          <div className="bg-gray-200 p-2">
            <div className="grid grid-cols-10 gap-1">
              {[...'1234567890'].map((key) => (
                <div key={key} className="bg-white rounded text-xs p-1 text-center">
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
      title: '100% anpassningsbar',
      description: 'Skräddarsydd för dina specifika behov',
      mockupContent: (
        <div className="h-full bg-gray-50 p-4">
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Menu className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Menyhantering</span>
              </div>
              <div className="text-xs text-gray-600">Pizza, Pasta, Sallader</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Öppettider</span>
              </div>
              <div className="text-xs text-gray-600">Mån-Fre: 11-22</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Språkinställningar</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-primary/10 px-2 py-1 rounded">🇸🇪 Svenska</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">🇬🇧 English</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'timesaver',
      icon: <Clock className="h-5 w-5" />,
      title: 'Sparar 10 timmar/månad',
      description: 'Ingen mer väntan på utvecklare',
      mockupContent: (
        <div className="h-full bg-gray-50 p-4">
          <div className="space-y-3">
            {/* Quick edit */}
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium mb-2">Dagens lunch</div>
              <textarea 
                className="w-full text-xs bg-gray-100 rounded p-2"
                rows={3}
                value="Pasta Carbonara - 95 kr
Caesarsallad - 89 kr
Veckans soppa - 79 kr"
                readOnly
              />
            </div>
            {/* Success notification */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-800">Ändringar publicerade!</span>
              </div>
            </div>
            {/* Time saved */}
            <div className="bg-primary/10 rounded-lg p-3 text-center">
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bonusen: De styr allt själva</h2>
            <Text className="text-2xl font-semibold text-primary">
              Uppdatera menyn från soffan
            </Text>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Mobile Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[9/16] max-w-sm mx-auto bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] p-4 shadow-2xl">
                <div className="h-full w-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Dynamic content based on selected feature */}
                  <div className="absolute inset-0">
                    {features.find(f => f.id === activeFeature)?.mockupContent}
                  </div>
                  
                  {/* Phone notch */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-2xl"></div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 order-1 lg:order-2">
              {features.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={cn(
                    "p-6 flex gap-4 items-start cursor-pointer transition-all",
                    activeFeature === feature.id 
                      ? "border-primary shadow-lg scale-[1.02]" 
                      : "hover:shadow-md hover:scale-[1.01]"
                  )}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className={cn(
                    "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                    activeFeature === feature.id
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                  )}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
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