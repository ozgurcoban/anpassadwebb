import React from 'react';
import { cn } from '@/lib/utils';
import { type GradientBackgroundProps } from './types';
import { InteractiveEffects } from './InteractiveEffects';
import { ImageBackground } from './ImageBackground';
import { DotPattern } from './DotPattern';
import { GradientShapes } from './GradientShapes';
import { GradientOverlay } from './GradientOverlay';
import { OPACITY } from './constants';

export function GradientBackground({
  transformedColors,
  particleColors,
  isHovering,
  mousePosition,
  minHeight,
  children,
  handlers,
  containerRef,
  isLowPerformance = false,
  backgroundImage,
  overlayOpacity,
}: GradientBackgroundProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex overflow-hidden lg:rounded-lg bg-muted/50",
        !minHeight && "min-h-fit"
      )}
      style={{ 
        ...(minHeight && { minHeight }),
        willChange: isHovering ? 'contents' : 'auto'
      }}
      onMouseMove={handlers.onMouseMove}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
    >
      {/* Interactive Gradient Background */}
      <div className="absolute inset-0">
        {/* Render image background if provided */}
        {backgroundImage && (
          <ImageBackground 
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            priority={backgroundImage.priority}
            overlayOpacity={overlayOpacity}
          />
        )}
        
        {/* Gradient background elements (only for non-image backgrounds) */}
        {!backgroundImage && (
          <>
            <GradientOverlay transformedColors={transformedColors} />
            <GradientShapes transformedColors={transformedColors} />
          </>
        )}

        {/* Modern Dot Pattern */}
        <DotPattern 
          transformedColors={transformedColors} 
          isImageBackground={!!backgroundImage} 
        />

        {/* Floating elements removed for cleaner look */}

        {/* Noise Texture - subtle */}
        <div
          className="absolute inset-0"
          style={{
            opacity: OPACITY.NOISE_TEXTURE,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Interactive Cursor Effects */}
      {!isLowPerformance && (
        <InteractiveEffects
          mousePosition={mousePosition}
          isHovering={isHovering}
          transformedColors={transformedColors}
          particleColors={particleColors}
          containerRef={containerRef}
          onMouseClick={handlers.onClick}
        />
      )}

      {children}
    </div>
  );
}