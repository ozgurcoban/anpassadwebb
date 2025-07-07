'use client';

import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import Text from '@/components/ui/Text';
import SectionHeading from '@/components/ui/SectionHeading';
import { packages, packagesConfig } from '@/data/packages';
import { ContactButton } from '@/components/ContactButton';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrackedButton } from '@/components/TrackedLink';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const PackagesListSection = () => {
  const shadowColorMap: Record<string, string> = {
    'from-blue-500': 'shadow-blue-500/20',
    'from-purple-500': 'shadow-purple-500/20',
    'from-pink-500': 'shadow-pink-500/20',
    'from-brand-blue': 'shadow-brand-blue/20',
    'from-brand-purple': 'shadow-brand-purple/20',
    'from-brand-pink': 'shadow-brand-pink/20',
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div id="paket">
      <Section variant="wide" className="bg-gray-50 dark:bg-gray-900/50">
        <SectionContainer>
        <header className="mb-12">
          <SectionHeading
            title="Välj rätt paket för din verksamhet"
            subtitle="Transparent prissättning, inga dolda avgifter"
            subtitleClassName="text-gray-600 dark:text-gray-400"
          />
          {packagesConfig.introDescription && (
            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="bg-muted/50">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-purple rounded-full flex items-center justify-center shadow-sm">
                        <TrendingUp className="w-8 h-8 text-brand-purple-foreground" strokeWidth={1.5} />
                      </div>
                    </div>
                    <Text className="flex-1 text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
                      {packagesConfig.introDescription}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </header>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="min-w-0 flex-[0_0_85%] pl-4 first:pl-0 h-[600px]"
              >
                <Card
                  className={cn(
                    "group relative transition-all h-full",
                    pkg.popular ? "shadow-md ring-2 ring-purple-500/20" : "shadow-sm"
                  )}
                >
                  <CardContent className="p-4 h-full grid" 
                    style={{
                      gridTemplateRows: 'auto minmax(2rem, auto) minmax(3rem, auto) repeat(6, auto) auto auto',
                      gap: '0.5rem'
                    }}
                  >
                    {/* Package icon/badge */}
                    <div className="text-center">
                      <div
                        className={cn(
                          "inline-flex rounded-xl p-3 shadow-lg transition-transform group-hover:scale-110",
                          `bg-gradient-to-r ${pkg.gradientFrom} ${pkg.gradientVia} ${pkg.gradientTo}`,
                          shadowColorMap[pkg.gradientFrom] || ''
                        )}
                      >
                        <Sparkles className="h-8 w-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Package name */}
                    <div className="text-center flex items-center justify-center min-h-[2rem]">
                      <Text as="h3" className="text-lg font-semibold">
                        {pkg.name}
                      </Text>
                    </div>

                    {/* Tagline */}
                    <div className="text-center flex items-center justify-center min-h-[3rem]">
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {pkg.tagline}
                      </Text>
                    </div>

                    {/* Features - each feature is a separate grid item */}
                    {pkg.features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="grid grid-cols-[auto,1fr] gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <Text className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                          {feature}
                        </Text>
                      </div>
                    ))}
                    {/* Fill empty feature slots */}
                    {Array.from({ length: Math.max(0, 6 - pkg.features.length) }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-5" />
                    ))}

                    {/* Delivery time */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 text-center">
                      <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {pkg.delivery}
                      </Text>
                    </div>

                    {/* CTA Button with integrated pricing */}
                    <div>
                      <ContactButton 
                        className="w-full justify-center"
                        text={pkg.id === 'skraddarsytt' ? "Kontakta oss för offert" : pkg.price}
                        variant="outline-hero"
                        packageName={pkg.name}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators for mobile */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {packages.map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-2 transition-all duration-200',
                selectedIndex === index
                  ? 'w-8 rounded-full bg-primary'
                  : 'w-2 rounded-full bg-gray-300 hover:bg-gray-400',
              )}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to package ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop Grid */}
        <div 
          className="hidden md:grid gap-8 md:grid-cols-3"
          style={{
            gridTemplateRows: 'auto auto auto repeat(6, auto) auto auto',
            rowGap: '1.75rem'
          }}
        >
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={cn(
                "group relative transition-all hover:shadow-lg",
                pkg.popular ? "shadow-md ring-2 ring-purple-500/20" : "shadow-sm",
                "grid"
              )}
              style={{
                gridTemplateRows: 'subgrid',
                gridRow: 'span 12'
              }}
            >
              <CardContent className="p-6 grid" style={{ gridTemplateRows: 'subgrid', gridRow: 'span 12' }}>
              {/* Package icon/badge */}
              <div className="text-center">
                <div
                  className={cn(
                    "inline-flex rounded-xl p-4 shadow-lg transition-transform group-hover:scale-110",
                    `bg-gradient-to-r ${pkg.gradientFrom} ${pkg.gradientVia} ${pkg.gradientTo}`,
                    shadowColorMap[pkg.gradientFrom] || ''
                  )}
                >
                  <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Package name */}
              <div className="text-center">
                <Text as="h3" className="text-xl font-semibold">
                  {pkg.name}
                </Text>
              </div>

              {/* Tagline */}
              <div className="text-center">
                <Text className="text-gray-600 dark:text-gray-400">
                  {pkg.tagline}
                </Text>
              </div>

              {/* Features - each feature is a separate grid item */}
              {pkg.features.slice(0, 6).map((feature, idx) => (
                <div key={idx} className="grid grid-cols-[auto,1fr] gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" strokeWidth={1.5} />
                  <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature}
                  </Text>
                </div>
              ))}
              {/* Fill empty feature slots */}
              {Array.from({ length: Math.max(0, 6 - pkg.features.length) }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}

              {/* Delivery time */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-4 text-center">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {pkg.delivery}
                </Text>
              </div>

              {/* CTA Button with integrated pricing */}
              <div className="mt-6">
                <ContactButton 
                  className="w-full justify-center"
                  text={pkg.id === 'skraddarsytt' ? "Kontakta oss för offert" : pkg.price}
                  variant="outline-hero"
                  packageName={pkg.name}
                />
              </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Text className="mb-4 text-gray-600 dark:text-gray-400">
            Osäker på vilket paket som passar dig bäst?
          </Text>
          <Text className="mb-6 text-gray-600 dark:text-gray-400">
            Vi hjälper dig hitta rätt lösning för dina behov och budget.
          </Text>
          <TrackedButton
            href="/boka-mote"
            variant="rainbow"
            size="lg"
            className="mx-auto"
            trackingLabel="Få gratis rådgivning"
            trackingLocation="packages_bottom_cta"
          >
            Få gratis rådgivning
          </TrackedButton>
        </div>
      </SectionContainer>
    </Section>
    </div>
  );
};

export default PackagesListSection;