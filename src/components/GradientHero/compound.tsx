/**
 * Compound Component Pattern for GradientHero
 * Provides a more flexible API for complex use cases
 */
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientHeroProvider } from './GradientHeroContext';
import { GradientBackground } from './GradientBackground';
import { GradientContent } from './GradientContent';
import { FloatingElements } from './FloatingElements';
import { InteractiveEffects } from './InteractiveEffects';
import { type GradientHeroProps, COLOR_SCHEMES } from './types';

interface GradientHeroCompoundProps {
  children: React.ReactNode;
  colorScheme?: GradientHeroProps['colorScheme'];
  customColors?: string[];
  className?: string;
}

function GradientHeroRoot({ 
  children, 
  colorScheme = 'blue-purple', 
  customColors, 
  className 
}: GradientHeroCompoundProps) {
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

  const contextValue = {
    transformedColors,
    mousePosition,
    isHovering,
    clickPosition,
    isLowPerformance,
    containerRef,
    handlers,
  };

  return (
    <GradientHeroProvider value={contextValue}>
      <section
        className={cn(
          'relative mx-auto max-w-screen-2xl px-4 lg:px-8',
          className,
        )}
      >
        {children}
      </section>
    </GradientHeroProvider>
  );
}

// Compound components
const Background = GradientBackground;
const Content = GradientContent;
const Floating = FloatingElements;
const Interactive = InteractiveEffects;

// Export compound API
export const GradientHeroCompound = {
  Root: GradientHeroRoot,
  Background,
  Content,
  Floating,
  Interactive,
};

// Example usage:
/*
<GradientHeroCompound.Root colorScheme="purple-pink">
  <GradientHeroCompound.Background minHeight="60vh">
    <GradientHeroCompound.Content
      title="Custom Layout"
      description="Build your own layout"
      textAlign="center"
    />
    <GradientHeroCompound.Floating />
    <GradientHeroCompound.Interactive />
  </GradientHeroCompound.Background>
</GradientHeroCompound.Root>
*/