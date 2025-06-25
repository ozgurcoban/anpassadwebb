import React from 'react';

interface GradientShapesProps {
  transformedColors: string[];
}

const SHAPE_POSITIONS = [
  { left: '10%', top: '20%', size: 'h-32 w-32' },
  { right: '15%', bottom: '25%', size: 'h-40 w-40' },
  { left: '50%', top: '60%', size: 'h-36 w-36' },
] as const;

export const GradientShapes = React.memo(function GradientShapes({ transformedColors }: GradientShapesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {SHAPE_POSITIONS.map((position, index) => {
        const colorIndex = index % transformedColors.length;
        const nextColorIndex = (index + 1) % transformedColors.length;
        const lastColorIndex = (index + 2) % transformedColors.length;
        
        return (
          <div
            key={index}
            className={`absolute rounded-lg opacity-5 backdrop-blur-sm ${position.size}`}
            style={{
              ...position,
              background: `linear-gradient(135deg, ${transformedColors[colorIndex]}33, ${transformedColors[nextColorIndex]}33, ${transformedColors[lastColorIndex]}33)`,
              filter: `blur(${40 + index * 5}px)`,
            }}
          />
        );
      })}
    </div>
  );
});