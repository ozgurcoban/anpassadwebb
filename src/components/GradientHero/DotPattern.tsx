import React from 'react';
import { cn } from '@/lib/utils';

interface DotPatternProps {
  transformedColors: string[];
  isImageBackground: boolean;
  className?: string;
}

export const DotPattern = React.memo(function DotPattern({ transformedColors, isImageBackground, className }: DotPatternProps) {
  // Define colors based on background type
  const dotColors = isImageBackground 
    ? ['hsl(var(--background))', 'hsl(var(--accent))', 'hsl(var(--primary))'] // Theme colors for image backgrounds
    : transformedColors;

  return (
    <div className={cn(
      "absolute inset-0",
      isImageBackground ? "opacity-25" : "opacity-20",
      className
    )}>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient definitions */}
          {dotColors.map((color, index) => (
            <radialGradient key={`gradient-${index}`} id={`dot-gradient-${index + 1}`}>
              <stop offset="0%" stopColor={color} stopOpacity={isImageBackground ? "0.8" : "1"} />
              <stop offset="70%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          ))}
          
          {/* Blur filters */}
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
            {/* Large focal dots */}
            <circle cx="20" cy="20" r="2.5" fill="url(#dot-gradient-1)" filter="url(#dot-blur-soft)" opacity={isImageBackground ? "0.6" : "0.8"} />
            <circle cx="80" cy="50" r="2.8" fill="url(#dot-gradient-2)" filter="url(#dot-blur-soft)" opacity={isImageBackground ? "0.5" : "0.7"} />
            <circle cx="50" cy="85" r="2.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur-soft)" opacity={isImageBackground ? "0.6" : "0.8"} />
            
            {/* Medium accent dots */}
            <circle cx="35" cy="10" r="1.5" fill="url(#dot-gradient-2)" filter="url(#dot-blur)" opacity={isImageBackground ? "0.4" : "0.6"} />
            <circle cx="65" cy="25" r="1.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur)" opacity={isImageBackground ? "0.3" : "0.5"} />
            <circle cx="10" cy="45" r="1.5" fill="url(#dot-gradient-1)" filter="url(#dot-blur)" opacity={isImageBackground ? "0.4" : "0.6"} />
            <circle cx="90" cy="70" r="1.5" fill="url(#dot-gradient-2)" filter="url(#dot-blur)" opacity={isImageBackground ? "0.3" : "0.5"} />
            <circle cx="25" cy="75" r="1.5" fill="url(#dot-gradient-3)" filter="url(#dot-blur)" opacity={isImageBackground ? "0.4" : "0.6"} />
            
            {/* Small atmospheric dots */}
            <circle cx="5" cy="30" r="1" fill="url(#dot-gradient-3)" opacity={isImageBackground ? "0.25" : "0.4"} />
            <circle cx="45" cy="5" r="1" fill="url(#dot-gradient-1)" opacity={isImageBackground ? "0.25" : "0.4"} />
            <circle cx="70" cy="45" r="1" fill="url(#dot-gradient-2)" opacity={isImageBackground ? "0.2" : "0.3"} />
            <circle cx="15" cy="65" r="1" fill="url(#dot-gradient-1)" opacity={isImageBackground ? "0.25" : "0.4"} />
            <circle cx="95" cy="15" r="1" fill="url(#dot-gradient-3)" opacity={isImageBackground ? "0.2" : "0.3"} />
            <circle cx="55" cy="60" r="1" fill="url(#dot-gradient-2)" opacity={isImageBackground ? "0.25" : "0.4"} />
            <circle cx="85" cy="90" r="1" fill="url(#dot-gradient-1)" opacity={isImageBackground ? "0.2" : "0.3"} />
            
            {/* Tiny detail dots */}
            <circle cx="30" cy="50" r="0.6" fill="url(#dot-gradient-2)" opacity={isImageBackground ? "0.15" : "0.3"} />
            <circle cx="60" cy="40" r="0.6" fill="url(#dot-gradient-3)" opacity={isImageBackground ? "0.15" : "0.3"} />
            <circle cx="75" cy="75" r="0.6" fill="url(#dot-gradient-1)" opacity={isImageBackground ? "0.15" : "0.3"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#modern-dots)" />
      </svg>
    </div>
  );
});