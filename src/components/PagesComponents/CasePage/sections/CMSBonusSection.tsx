'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/card';
import { Smartphone, Globe, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Text from '@/components/ui/Text';
import useEmblaCarousel from 'embla-carousel-react';

interface CMSFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  mockupContent: React.ReactNode;
}

const CMSBonusSection = () => {
  const [activeFeature, setActiveFeature] = useState('mobile');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalImage, setModalImage] = useState<React.ReactNode | null>(null);
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

  const features: CMSFeature[] = [
    {
      id: 'mobile',
      icon: <Smartphone className="size-5" />,
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

          {/* Mobile Layout - Carousel */}
          <div className="mobile-mockup-wrapper md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="mobile-mockup-slide min-w-0 flex-[0_0_90%] pl-4 first:pl-0"
                  >
                    <Card className="mobile-mockup-card overflow-hidden">
                      {/* Compact header */}
                      <div className="mobile-mockup-header">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{feature.title}</h3>
                          <Text className="text-sm text-muted-foreground">
                            {feature.description}
                          </Text>
                        </div>
                      </div>

                      {/* Large mockup preview - natural size */}
                      <button
                        onClick={() => setModalImage(feature.mockupContent)}
                        className="mobile-mockup-content group cursor-pointer"
                      >
                        <div className="relative h-full overflow-hidden bg-[#181818]">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative h-full w-[280px]">
                              {feature.mockupContent}
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-active:opacity-100">
                          <span className="rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                            Tryck för fullskärm
                          </span>
                        </div>
                      </button>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-2 transition-all duration-200',
                    selectedIndex === index
                      ? 'w-8 rounded-full bg-primary'
                      : 'w-2 rounded-full bg-gray-300 hover:bg-gray-400',
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden items-center gap-8 md:grid lg:grid-cols-2">
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

      {/* Fullscreen Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModalImage(null)}
        >
          <button
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-white transition-colors hover:bg-white/10"
            onClick={() => setModalImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-gray-900">
              {modalImage}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default CMSBonusSection;
