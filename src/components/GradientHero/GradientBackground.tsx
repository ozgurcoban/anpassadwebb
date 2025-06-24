import React from 'react';
import { cn } from '@/lib/utils';
import { type GradientBackgroundProps } from './types';
import { InteractiveEffects } from './InteractiveEffects';
import { ImageBackground } from './ImageBackground';

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
      className="relative flex overflow-hidden lg:rounded-lg bg-gray-50 dark:bg-gray-900/50"
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
        {/* Render image background if provided */}
        {backgroundImage && (
          <ImageBackground 
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            priority={backgroundImage.priority}
            overlayOpacity={overlayOpacity}
          />
        )}
        
        {/* Only show gradient background if no image */}
        {!backgroundImage && (
          <>
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-white/5 dark:bg-white/10" />
            {/* Static gradient background - toned down */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-10"
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
          </>
        )}

        {/* Static radial gradient overlay for depth - reduced (only for non-image backgrounds) */}
        {!backgroundImage && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${transformedColors[2]}40 0%, transparent 50%), 
                         radial-gradient(circle at 70% 80%, ${transformedColors[1]}30 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Subtle gradient shapes like service icons (only for non-image backgrounds) */}
        {!backgroundImage && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute left-[10%] top-[20%] h-32 w-32 rounded-xl opacity-5"
              style={{
                background: `linear-gradient(135deg, ${transformedColors[0]}50, ${transformedColors[1]}50, ${transformedColors[2]}50)`,
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute right-[15%] bottom-[25%] h-40 w-40 rounded-xl opacity-5"
              style={{
                background: `linear-gradient(135deg, ${transformedColors[1]}50, ${transformedColors[2]}50, ${transformedColors[0]}50)`,
                filter: 'blur(50px)',
              }}
            />
            <div
              className="absolute left-[50%] top-[60%] h-36 w-36 rounded-xl opacity-5"
              style={{
                background: `linear-gradient(135deg, ${transformedColors[2]}50, ${transformedColors[0]}50, ${transformedColors[1]}50)`,
                filter: 'blur(45px)',
              }}
            />
          </div>
        )}

        {/* Modern Dot Pattern - reduce opacity for cleaner look */}
        <div className={cn(
          "absolute inset-0",
          backgroundImage ? "opacity-25" : "opacity-20"
        )}>
          <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Gradient definitions - use white for image backgrounds, colors for gradient backgrounds */}
              <radialGradient id="dot-gradient-1">
                <stop offset="0%" stopColor={backgroundImage ? "#ffffff" : transformedColors[0]} stopOpacity={backgroundImage ? "0.8" : "1"} />
                <stop offset="70%" stopColor={backgroundImage ? "#ffffff" : transformedColors[0]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={backgroundImage ? "#ffffff" : transformedColors[0]} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="dot-gradient-2">
                <stop offset="0%" stopColor={backgroundImage ? "#fbbf24" : transformedColors[1]} stopOpacity={backgroundImage ? "0.8" : "1"} />
                <stop offset="70%" stopColor={backgroundImage ? "#fbbf24" : transformedColors[1]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={backgroundImage ? "#fbbf24" : transformedColors[1]} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="dot-gradient-3">
                <stop offset="0%" stopColor={backgroundImage ? "#60a5fa" : transformedColors[2]} stopOpacity={backgroundImage ? "0.8" : "1"} />
                <stop offset="70%" stopColor={backgroundImage ? "#60a5fa" : transformedColors[2]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={backgroundImage ? "#60a5fa" : transformedColors[2]} stopOpacity="0" />
              </radialGradient>
              
              {/* Blur filter for softer appearance */}
              <filter id="dot-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
              </filter>
              <filter id="dot-blur-soft">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              
              <pattern
                id="modern-dots"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                {/* Large focal dots with blur - reduced size */}
                <circle cx="20" cy="20" r="2.5" fill="url(#dot-gradient-1)" filter="url(#dot-blur-soft)" opacity={backgroundImage ? "0.6" : "0.8"} />
                <circle cx="80" cy="50" r="2.8" fill="url(#dot-gradient-2)" filter="url(#dot-blur-soft)" opacity={backgroundImage ? "0.5" : "0.7"} />
                <circle cx="50" cy="85" r="2.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur-soft)" opacity={backgroundImage ? "0.6" : "0.8"} />
                
                {/* Medium accent dots - reduced size and opacity */}
                <circle cx="35" cy="10" r="1.5" fill="url(#dot-gradient-2)" filter="url(#dot-blur)" opacity={backgroundImage ? "0.4" : "0.6"} />
                <circle cx="65" cy="25" r="1.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur)" opacity={backgroundImage ? "0.3" : "0.5"} />
                <circle cx="10" cy="45" r="1.5" fill="url(#dot-gradient-1)" filter="url(#dot-blur)" opacity={backgroundImage ? "0.4" : "0.6"} />
                <circle cx="90" cy="70" r="1.5" fill="url(#dot-gradient-2)" filter="url(#dot-blur)" opacity={backgroundImage ? "0.3" : "0.5"} />
                <circle cx="25" cy="75" r="1.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur)" opacity={backgroundImage ? "0.4" : "0.6"} />
                
                {/* Small atmospheric dots - further reduced for image backgrounds */}
                <circle cx="5" cy="30" r="1" fill="url(#dot-gradient-3)" opacity={backgroundImage ? "0.25" : "0.4"} />
                <circle cx="45" cy="5" r="1" fill="url(#dot-gradient-1)" opacity={backgroundImage ? "0.25" : "0.4"} />
                <circle cx="70" cy="45" r="1" fill="url(#dot-gradient-2)" opacity={backgroundImage ? "0.2" : "0.3"} />
                <circle cx="15" cy="65" r="1" fill="url(#dot-gradient-1)" opacity={backgroundImage ? "0.25" : "0.4"} />
                <circle cx="95" cy="15" r="1" fill="url(#dot-gradient-3)" opacity={backgroundImage ? "0.2" : "0.3"} />
                <circle cx="55" cy="60" r="1" fill="url(#dot-gradient-2)" opacity={backgroundImage ? "0.25" : "0.4"} />
                <circle cx="85" cy="90" r="1" fill="url(#dot-gradient-1)" opacity={backgroundImage ? "0.2" : "0.3"} />
                
                {/* Tiny detail dots - minimal for image backgrounds */}
                <circle cx="30" cy="50" r="0.6" fill="url(#dot-gradient-2)" opacity={backgroundImage ? "0.15" : "0.3"} />
                <circle cx="60" cy="40" r="0.6" fill="url(#dot-gradient-3)" opacity={backgroundImage ? "0.15" : "0.3"} />
                <circle cx="75" cy="75" r="0.6" fill="url(#dot-gradient-1)" opacity={backgroundImage ? "0.15" : "0.3"} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#modern-dots)" />
          </svg>
        </div>

        {/* Floating elements removed for cleaner look */}

        {/* Noise Texture - subtle */}
        <div
          className="absolute inset-0 opacity-5"
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
          particleColors={particleColors}
          containerRef={containerRef}
          onMouseClick={handlers.onClick}
        />
      )}

      {children}
    </div>
  );
}