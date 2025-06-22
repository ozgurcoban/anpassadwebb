import React from 'react';
import { cn } from '@/lib/utils';
import { type GradientBackgroundProps } from './types';
import { FloatingElements } from './FloatingElements';
import { InteractiveEffects } from './InteractiveEffects';

export function GradientBackground({
  transformedColors,
  isHovering,
  mousePosition,
  minHeight,
  children,
  handlers,
  containerRef,
  isLowPerformance = false,
}: GradientBackgroundProps) {
  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden lg:rounded-2xl"
      style={{ 
        minHeight,
        willChange: isHovering ? 'contents' : 'auto'
      }}
      onMouseMove={handlers.onMouseMove}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
    >
      {/* Interactive Gradient Background */}
      <div className="absolute inset-0">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(-45deg, 
                ${transformedColors[0]}, 
                ${transformedColors[1]}, 
                ${transformedColors[2]}, 
                ${transformedColors[1]}, 
                ${transformedColors[0]})`,
              backgroundSize: '300% 300%',
              backgroundPosition: '0% 50%',
            }}
          />
        </div>

        {/* Static radial gradient overlay for depth */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${transformedColors[2]}40 0%, transparent 50%), 
                       radial-gradient(circle at 70% 80%, ${transformedColors[1]}30 0%, transparent 50%)`,
          }}
        />

        {/* Enhanced Mesh Overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern
                id="mesh-pattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                {/* Dots */}
                <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.5" />
                <circle cx="30" cy="0" r="1.5" fill="white" opacity="0.5" />
                <circle cx="60" cy="0" r="1.5" fill="white" opacity="0.5" />
                <circle cx="0" cy="30" r="1.5" fill="white" opacity="0.5" />
                <circle cx="30" cy="30" r="2" fill="white" opacity="0.7" />
                <circle cx="60" cy="30" r="1.5" fill="white" opacity="0.5" />
                <circle cx="0" cy="60" r="1.5" fill="white" opacity="0.5" />
                <circle cx="30" cy="60" r="1.5" fill="white" opacity="0.5" />
                <circle cx="60" cy="60" r="1.5" fill="white" opacity="0.5" />

                {/* Connecting lines */}
                <line
                  x1="0"
                  y1="0"
                  x2="30"
                  y2="30"
                  stroke="white"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="60"
                  y1="0"
                  x2="30"
                  y2="30"
                  stroke="white"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="30"
                  y2="30"
                  stroke="white"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="60"
                  y1="60"
                  x2="30"
                  y2="30"
                  stroke="white"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
          </svg>
        </div>

        {!isLowPerformance && (
          <FloatingElements
            transformedColors={transformedColors}
            isHovering={isHovering}
            mousePosition={mousePosition}
            isLowPerformance={isLowPerformance}
          />
        )}

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
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
          containerRef={containerRef}
          onMouseClick={handlers.onClick}
        />
      )}

      {children}
    </div>
  );
}