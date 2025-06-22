'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Text from '@/components/ui/Text';
import { palermoProject } from '@/data/caseStudies';

const MenuRevolutionSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('pizza');
  
  const menuCategories = [
    { id: 'pizza', label: 'Pizza' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'sallad', label: 'Sallad' },
    { id: 'dryck', label: 'Dryck' },
    { id: 'dessert', label: 'Dessert' },
  ];

  const menuStory = palermoProject.story?.find(s => s.title === 'Meny som säljer');

  return (
    <Section className="py-16 md:py-20 bg-muted/30">
      <SectionContainer>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Menyrevolutionen</h2>
            <Text className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design som gör gäster hungriga
            </Text>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Before - Old Menu */}
            <div className="space-y-4">
              <Card className="p-6 bg-muted/50">
                <Text className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Förut
                </Text>
                <Text className="text-lg mb-4">
                  {menuStory?.beforeDescription || 'Svårnavigerad meny. Innehållet var rörigt och oöverskådligt.'}
                </Text>
                
                {menuStory?.beforeImage && (
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white">
                    <Image
                      src={menuStory.beforeImage}
                      alt="Gammal meny"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </Card>
            </div>

            {/* After - New Interactive Menu */}
            <div className="space-y-4">
              <Card className="p-6 bg-primary/5">
                <Text className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
                  Nu
                </Text>
                <Text className="text-lg mb-6">
                  {menuStory?.afterDescription || 'Vi tog fram en menystruktur för mobil som sorterar innehållet i "chips" (kategorier) och döljer onödigt brus.'}
                </Text>
                
                {/* Interactive Menu Demo */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Text className="font-semibold mb-4">Klicka på kategorierna för att se hur enkelt det blev:</Text>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {menuCategories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'outline'}
                        className="cursor-pointer text-sm py-2 px-4 transition-all"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.label}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[200px]">
                    <Text className="text-center text-muted-foreground">
                      Visar alla {selectedCategory}-rätter här...
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Result highlight */}
          <div className="text-center mt-12">
            <Text className="text-3xl font-bold text-primary">
              {menuStory?.value || '45% fler beställningar online'}
            </Text>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
};

export default MenuRevolutionSection;