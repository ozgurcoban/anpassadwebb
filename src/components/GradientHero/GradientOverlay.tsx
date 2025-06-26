import React from 'react';
import { OPACITY, GRADIENT_ANIMATION } from './constants';
import { GRADIENTS } from './styles';

interface GradientOverlayProps {
  transformedColors: string[];
}

export const GradientOverlay = React.memo(function GradientOverlay({ transformedColors }: GradientOverlayProps) {
  return (
    <>
      {/* Dark purple/pink overlay - matching the image hero */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900"
        style={{ opacity: 0.85 }}
      />
      
      {/* Bottom gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 ${GRADIENTS.overlay.glass}`} />
      
      {/* Static gradient background - subtle on top of dark overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.1, // Reduced opacity for subtle effect
            ...GRADIENTS.overlay.linear(transformedColors),
            backgroundSize: GRADIENT_ANIMATION.BACKGROUND_SIZE,
            backgroundPosition: GRADIENT_ANIMATION.BACKGROUND_POSITION,
          }}
        />
      </div>
      
      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.1, // Reduced opacity for subtle effect
          ...GRADIENTS.overlay.radial(transformedColors),
        }}
      />
    </>
  );
});