import React from 'react';
import { cn } from '@/lib/utils';
import { type FloatingElementsProps } from './types';

// Helper function to calculate magnetic transform based on mouse position
const calculateMagneticTransform = (
  elementPos: { x: number; y: number },
  mousePos: { x: number; y: number },
  isHovering: boolean,
  containerSize: { width: number; height: number },
  magneticRadius: number = 150,
  strength: number = 0.3
): string => {
  if (!isHovering) return 'translate3d(0px, 0px, 0) scale(1)';
  
  const mouseX = mousePos.x * containerSize.width;
  const mouseY = mousePos.y * containerSize.height;
  
  const elementX = (elementPos.x / 100) * containerSize.width;
  const elementY = (elementPos.y / 100) * containerSize.height;
  
  const deltaX = mouseX - elementX;
  const deltaY = mouseY - elementY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance > magneticRadius) {
    return 'translate3d(0px, 0px, 0) scale(1)';
  }
  
  const factor = (magneticRadius - distance) / magneticRadius;
  const translateX = deltaX * factor * strength;
  const translateY = deltaY * factor * strength;
  const scale = 1 + (factor * 0.1);
  
  return `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
};

const CodeSnippet = ({ 
  code, 
  className,
  position,
  mousePosition,
  isHovering,
  containerSize
}: { 
  code: string; 
  className: string;
  position: { x: number; y: number };
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  containerSize: { width: number; height: number };
}) => {
  const transform = calculateMagneticTransform(
    position,
    mousePosition,
    isHovering,
    containerSize,
    120,
    0.2
  );

  return (
    <div
      className={cn("opacity-40 transition-transform duration-300 ease-out", className)}
      style={{
        transform,
        willChange: isHovering ? 'transform' : 'auto'
      }}
    >
      <div className="font-mono rounded bg-white/5 px-3 py-1 text-xs text-white/60 shadow-lg backdrop-blur-sm">
        {code}
      </div>
    </div>
  );
};

const FloatingSymbol = ({ 
  symbol, 
  className,
  position,
  mousePosition,
  isHovering,
  containerSize
}: { 
  symbol: string; 
  className: string;
  position: { x: number; y: number };
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  containerSize: { width: number; height: number };
}) => {
  const transform = calculateMagneticTransform(
    position,
    mousePosition,
    isHovering,
    containerSize,
    100,
    0.25
  );

  return (
    <div
      className={cn("font-mono text-white/20 transition-transform duration-300 ease-out", className)}
      style={{
        transform,
        willChange: isHovering ? 'transform' : 'auto'
      }}
    >
      {symbol}
    </div>
  );
};


const InteractiveBlob = ({ 
  transformedColors,
  isHovering,
  mousePosition,
  className,
  colors,
  translateMultiplier = { x: 60, y: 60 },
  scaleMultiplier = 0.15,
  magneticStrength = 0.08
}: {
  transformedColors: string[];
  isHovering: boolean;
  mousePosition: { x: number; y: number };
  className: string;
  colors: [number, number];
  translateMultiplier?: { x: number; y: number };
  scaleMultiplier?: number;
  magneticStrength?: number;
}) => {
  // Simplified magnetic pull calculation for better performance
  const translateX = isHovering ? (mousePosition.x - 0.5) * translateMultiplier.x * (1 + magneticStrength) : 0;
  const translateY = isHovering ? (mousePosition.y - 0.5) * translateMultiplier.y * (1 + magneticStrength) : 0;
  const scale = isHovering ? 1 + mousePosition.y * scaleMultiplier : 1;

  return (
    <div
      className={cn(
        "absolute rounded-full transition-all duration-500 ease-out",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${transformedColors[colors[0]]} 0%, ${transformedColors[colors[1]]}80 50%, transparent 70%)`,
        opacity: isHovering ? 0.7 : 0.6,
        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
        filter: isHovering ? 'blur(40px) brightness(1.05)' : 'blur(50px)',
        willChange: isHovering ? 'transform, filter, opacity' : 'auto',
      }}
    />
  );
};

export function FloatingElements({
  transformedColors,
  isHovering,
  mousePosition,
}: FloatingElementsProps) {
  // Estimate container size - we could make this more precise by getting actual measurements
  const containerSize = { width: 1200, height: 800 };
  return (
    <>
      {/* Interactive Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <InteractiveBlob
          transformedColors={transformedColors}
          isHovering={isHovering}
          mousePosition={mousePosition}
          className="left-[5%] top-[15%] h-80 w-80"
          colors={[0, 1]}
          magneticStrength={0.1}
        />
        
        <InteractiveBlob
          transformedColors={transformedColors}
          isHovering={isHovering}
          mousePosition={mousePosition}
          className="right-[0%] top-[40%] h-[26rem] w-[26rem]"
          colors={[1, 2]}
          translateMultiplier={{ x: -50, y: 80 }}
          scaleMultiplier={0.1}
          magneticStrength={0.06}
        />
        
        <InteractiveBlob
          transformedColors={transformedColors}
          isHovering={isHovering}
          mousePosition={mousePosition}
          className="bottom-[-5%] left-[25%] h-[22rem] w-[22rem]"
          colors={[2, 0]}
          translateMultiplier={{ x: 40, y: -50 }}
          scaleMultiplier={0.1}
          magneticStrength={0.08}
        />

      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden">
        <CodeSnippet
          code={`<div className="hero">`}
          className="absolute left-[60%] top-[10%]"
          position={{ x: 60, y: 10 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />
        
        <CodeSnippet
          code={`const gradient = () => {}`}
          className="absolute bottom-[15%] right-[8%] hidden md:block opacity-30"
          position={{ x: 92, y: 85 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />
        
        <CodeSnippet
          code={`.blur-xl { filter: blur(24px) }`}
          className="absolute left-[45%] top-[70%] md:top-[65%] md:left-[50%] opacity-35"
          position={{ x: 47.5, y: 67.5 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />

        {/* Floating symbols */}
        <FloatingSymbol
          symbol="{ }"
          className="absolute bottom-[5%] left-[15%] text-2xl"
          position={{ x: 15, y: 95 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />
        
        <FloatingSymbol
          symbol="</>"
          className="absolute left-[3%] top-[65%] hidden md:left-[65%] md:block text-xl text-white/15"
          position={{ x: 34, y: 65 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />
        
        <FloatingSymbol
          symbol="( )"
          className="absolute left-[85%] top-[45%] text-lg"
          position={{ x: 85, y: 45 }}
          mousePosition={mousePosition}
          isHovering={isHovering}
          containerSize={containerSize}
        />
      </div>

    </>
  );
}