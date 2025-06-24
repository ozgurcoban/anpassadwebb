import React from 'react';
import { OPACITY, GRADIENT_ANIMATION } from './constants';

interface GradientOverlayProps {
  transformedColors: string[];
}

export const GradientOverlay = React.memo(function GradientOverlay({ transformedColors }: GradientOverlayProps) {
  return (
    <>
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 dark:bg-white/10" />
      
      {/* Static gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            opacity: OPACITY.GRADIENT_BACKGROUND,
            background: `linear-gradient(-45deg, 
              ${transformedColors[0]}, 
              ${transformedColors[1]}, 
              ${transformedColors[2]}, 
              ${transformedColors[1]}, 
              ${transformedColors[0]})`,
            backgroundSize: GRADIENT_ANIMATION.BACKGROUND_SIZE,
            backgroundPosition: GRADIENT_ANIMATION.BACKGROUND_POSITION,
          }}
        />
      </div>
      
      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: OPACITY.GRADIENT_BACKGROUND,
          background: `radial-gradient(circle at 30% 50%, ${transformedColors[2]}40 0%, transparent 50%), 
                     radial-gradient(circle at 70% 80%, ${transformedColors[1]}30 0%, transparent 50%)`,
        }}
      />
    </>
  );
});