'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientBackground } from '@/components/GradientHero/GradientBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TagHeroSectionProps {
  title: string;
  description: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const TagHeroSection = ({ 
  title, 
  description, 
  showCTA = false, 
  ctaText, 
  ctaHref 
}: TagHeroSectionProps) => {
  // Unikt färgschema för tag-sidor: Emerald-Green-Teal
  const tagColors = ['#10b981', '#059669', '#0d9488'];
  // Kontrastfärger för partiklar: Purple-Pink för att sticka ut
  const particleColors = ['#a855f7', '#d946ef', '#ec4899'];
  
  const {
    containerRef,
    mousePosition,
    isHovering,
    clickPosition,
    transformedColors,
    isLowPerformance,
    handlers,
  } = useInteractiveGradient({ colors: tagColors });

  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
      <GradientBackground
        transformedColors={transformedColors}
        particleColors={particleColors}
        isHovering={isHovering}
        mousePosition={mousePosition}
        minHeight="40vh"
        handlers={handlers}
        containerRef={containerRef}
        isLowPerformance={isLowPerformance}
      >
        {/* Centrerat content */}
        <div className="relative z-10 flex items-center justify-center min-h-[inherit] px-6">
          <div className="text-center max-w-4xl space-y-6">
            <div className="space-y-4">
              <h1
                className="font-quicksand text-5xl font-semibold text-white md:text-6xl lg:text-7xl"
                style={{
                  filter:
                    'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(16,185,129,0.3))',
                }}
              >
                {title}
              </h1>

              <p
                className="max-w-2xl mx-auto text-lg font-light leading-relaxed text-white/90 md:text-xl lg:text-2xl"
                style={{
                  textShadow:
                    '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)',
                }}
              >
                {description}
              </p>
            </div>

            {showCTA && ctaText && ctaHref && (
              <div className="flex justify-center">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="relative bg-black/30 text-white backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-emerald-500 before:via-green-500 before:to-teal-500 before:p-[1px] before:opacity-70 hover:bg-black/40 hover:before:opacity-100"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                >
                  <Link href={ctaHref}>{ctaText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </GradientBackground>
    </section>
  );
};

export default TagHeroSection;