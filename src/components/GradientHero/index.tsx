'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientBackground } from './GradientBackground';
import { GradientContent } from './GradientContent';
import { type GradientHeroProps, COLOR_SCHEMES } from './types';
import { DEFAULT_PARTICLE_COLORS } from './constants';
import { LAYOUT, SPACING } from './styles';

export default function GradientHero({
  title,
  description,
  colorScheme = 'blue-purple',
  customColors,
  particleColors,
  textAlign = 'left',
  secondaryCTA,
  className,
  minHeight,
  backgroundImage,
  overlayOpacity = 0.8,
  verticalCenter = false,
  darkMode = false,
  showValueProposition = false,
  children,
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
        LAYOUT.container,
        SPACING.section.mobile,
        SPACING.section.desktop,
        className,
      )}
    >
      <GradientBackground
        transformedColors={transformedColors}
        particleColors={particleColors || DEFAULT_PARTICLE_COLORS}
        isHovering={isHovering}
        mousePosition={mousePosition}
        minHeight={minHeight}
        handlers={handlers}
        containerRef={containerRef}
        isLowPerformance={isLowPerformance}
        backgroundImage={backgroundImage}
        overlayOpacity={overlayOpacity}
        darkMode={darkMode}
      >
        <GradientContent
          title={title}
          description={description}
          textAlign={textAlign}
          secondaryCTA={secondaryCTA}
          isImageBackground={!!backgroundImage || darkMode}
          verticalCenter={verticalCenter}
          showValueProposition={showValueProposition}
          showScrollIndicator={!!minHeight && minHeight.includes('vh') && parseInt(minHeight) >= 80}
        >
          {children}
        </GradientContent>
      </GradientBackground>
    </section>
  );
}

export type { ColorScheme, GradientHeroProps } from './types';