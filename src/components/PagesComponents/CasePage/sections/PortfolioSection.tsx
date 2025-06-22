'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import { Badge } from '@/components/ui/badge';
import { CaseCard } from '@/components/Case/CaseCard';
import { caseStudies } from '@/data/caseStudies';
import { IconBriefcase } from '@tabler/icons-react';

// Get unique categories from case studies
const categories = ['Alla', ...Array.from(new Set(caseStudies.map(cs => cs.category)))];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('Alla');

  // Filter cases based on selected category
  const filteredCases = selectedCategory === 'Alla' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === selectedCategory);

  return (
    <Section className="space-y-12 bg-secondary sm:rounded-md">
      <div className="text-center">
        <h3 className="px-2 text-3xl font-medium leading-snug mb-4">Utvalda projekt</h3>
        <Text size="lg" className="mx-auto max-w-2xl text-muted-foreground">
          Från e-handelslösningar till företagswebbplatser - varje projekt är 
          unikt anpassat efter kundens behov och mål.
        </Text>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((caseStudy) => (
          <CaseCard 
            key={caseStudy.id} 
            caseStudy={caseStudy}
            className={cn(
              "transition-all duration-300",
              caseStudy.featured && "lg:col-span-2"
            )}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredCases.length === 0 && (
        <div className="py-12 text-center">
          <IconBriefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <Text className="text-muted-foreground">
            Inga projekt hittades i denna kategori.
          </Text>
        </div>
      )}
    </Section>
  );
};

export default PortfolioSection;