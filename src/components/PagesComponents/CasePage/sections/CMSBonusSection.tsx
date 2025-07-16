'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [modalIndex, setModalIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  
  // Touch handling for modal
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const startTranslateX = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

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
        <div className="relative h-full w-full bg-black overflow-hidden">
          <Image
            src="/images/palermo-case/cms-mobile-edit1.webp"
            alt="CMS mobile editing interface showing menu editing functionality"
            fill
            className="-m-[1px] scale-[1.01] object-contain"
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
        <div className="relative h-full w-full bg-black overflow-hidden">
          <Image
            src="/images/palermo-case/cms-mobile-edit2.png"
            alt="CMS mobile customization interface"
            fill
            className="-m-[1px] scale-[1.01] object-contain"
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
        <div className="relative h-full w-full bg-black overflow-hidden">
          <Image
            src="/images/palermo-case/cms-mobile-edit3.png"
            alt="CMS mobile error protection interface"
            fill
            className="-m-[1px] scale-[1.01] object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={true}
          />
        </div>
      ),
    },
  ];

  // Handle modal open
  const openModal = (index: number) => {
    setModalIndex(index);
    setModalImage(true);
    setTranslateX(-index * 100);
  };

  // Handle modal close
  const closeModal = () => {
    setModalImage(null);
    setTranslateX(0);
    setIsDragging(false);
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    startTranslateX.current = translateX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // If vertical movement is dominant, don't handle horizontal swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    
    // Calculate new position with resistance at edges
    let newTranslateX = startTranslateX.current + (deltaX / window.innerWidth) * 100;
    
    // Add resistance at edges
    if (newTranslateX > 0) {
      newTranslateX = newTranslateX * 0.3; // Resistance at start
    } else if (newTranslateX < -(features.length - 1) * 100) {
      const overflow = newTranslateX + (features.length - 1) * 100;
      newTranslateX = -(features.length - 1) * 100 + overflow * 0.3; // Resistance at end
    }
    
    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    
    // Swipe down to close
    if (deltaY > 100 && Math.abs(deltaX) < 100) {
      closeModal();
      return;
    }
    
    // Calculate which image to snap to
    const threshold = 50; // pixels
    const currentPosition = -translateX / 100;
    let targetIndex = modalIndex;
    
    if (deltaX < -threshold && modalIndex < features.length - 1) {
      targetIndex = modalIndex + 1;
    } else if (deltaX > threshold && modalIndex > 0) {
      targetIndex = modalIndex - 1;
    } else {
      // Snap back to current if swipe wasn't far enough
      targetIndex = Math.round(currentPosition);
    }
    
    // Ensure target is within bounds
    targetIndex = Math.max(0, Math.min(features.length - 1, targetIndex));
    
    // Animate to target position
    setModalIndex(targetIndex);
    setTranslateX(-targetIndex * 100);
  };

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
                        onClick={() => openModal(index)}
                        className="mobile-mockup-content group cursor-pointer overflow-hidden"
                      >
                        <div className="relative h-full overflow-hidden bg-[#181818]">
                          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            <div className="relative h-full w-[280px] overflow-hidden">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-in fade-in duration-200"
          onClick={closeModal}
          ref={modalRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Drag handle indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
          
          {/* Close button - bigger for mobile */}
          <button
            className="absolute right-4 top-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/10 active:bg-white/20"
            onClick={closeModal}
          >
            <X className="h-10 w-10 md:h-8 md:w-8" />
          </button>
          
          {/* Image container */}
          <div
            className="relative w-full max-w-sm animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
              {/* All images in a horizontal row */}
              <div
                className={cn(
                  "absolute inset-0 flex transition-transform ease-out",
                  isDragging ? "duration-0" : "duration-300"
                )}
                style={{ transform: `translateX(${translateX}%)` }}
              >
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="min-w-full relative bg-black"
                  >
                    {feature.mockupContent}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    modalIndex === index ? "bg-white w-8" : "bg-white/40"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIndex(index);
                    setTranslateX(-index * 100);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default CMSBonusSection;
