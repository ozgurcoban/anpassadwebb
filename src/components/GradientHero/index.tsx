'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientBackground } from './GradientBackground';
import { GradientContent } from './GradientContent';
import { type GradientHeroProps, COLOR_SCHEMES } from './types';

export default function GradientHero({
  title,
  description,
  colorScheme = 'blue-purple',
  customColors,
  particleColors,
  textAlign = 'left',
  secondaryCTA,
  className,
  minHeight = '80vh',
}: GradientHeroProps) {
  const colors = customColors || COLOR_SCHEMES[colorScheme];
  
  const {
    containerRef,
    mousePosition,
    isHovering,
    clickPosition,
    transformedColors,
    isLowPerformance,
    handlers,
  } = useInteractiveGradient({ colors });

  return (
    <section
      className={cn(
        'relative mx-auto max-w-screen-2xl px-4 lg:px-8',
        className,
      )}
    >
      <GradientBackground
        transformedColors={transformedColors}
        particleColors={particleColors}
        isHovering={isHovering}
        mousePosition={mousePosition}
        minHeight={minHeight}
        handlers={handlers}
        containerRef={containerRef}
        isLowPerformance={isLowPerformance}
      >
        <GradientContent
          title={title}
          description={description}
          textAlign={textAlign}
          secondaryCTA={secondaryCTA}
          transformedColors={transformedColors}
        />
      </GradientBackground>
    </section>
  );
}

export type { ColorScheme, GradientHeroProps } from './types';