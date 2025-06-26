import React from 'react';
import { cn } from '@/lib/utils';
import { type GradientBackgroundProps } from './types';
import { InteractiveEffects } from './InteractiveEffects';
import { ImageBackground } from './ImageBackground';
import { DotPattern } from './DotPattern';
import { GradientShapes } from './GradientShapes';
import { GradientOverlay } from './GradientOverlay';
import { OPACITY } from './constants';
import { LAYOUT, getContainerStyles, NOISE_TEXTURE } from './styles';

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
  darkMode = false,
}: GradientBackgroundProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        LAYOUT.background.base,
        darkMode ? LAYOUT.background.darkMode : LAYOUT.background.default,
        LAYOUT.background.border,
        !minHeight && "min-h-[500px]"
      )}
      style={getContainerStyles(minHeight, isHovering)}
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
        
        {/* Gradient background elements (only for non-image backgrounds or dark mode) */}
        {(!backgroundImage || darkMode) && (
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
          className={NOISE_TEXTURE.className}
          style={{
            backgroundImage: NOISE_TEXTURE.dataUri,
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
          hasBackgroundImage={!!backgroundImage}
        />
      )}

      {children}
    </div>
  );
}