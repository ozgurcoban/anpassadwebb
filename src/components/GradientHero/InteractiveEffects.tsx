'use client';

import React, { useEffect, useState } from 'react';
import { lerp } from '@/lib/animation-utils';

interface InteractiveEffectsProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  transformedColors: string[];
  particleColors?: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  hasBackgroundImage?: boolean;
}

export function InteractiveEffects({
  mousePosition,
  isHovering,
  transformedColors,
  particleColors,
  containerRef,
  hasBackgroundImage = false,
}: InteractiveEffectsProps) {
  // Use particle colors if provided, otherwise fall back to transformed colors
  const effectColors = particleColors || transformedColors;
  const [orbPositions, setOrbPositions] = useState({
    orb1: { x: 0, y: 0, targetX: 0, targetY: 0 },
    orb2: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });
  const [orbsInitialized, setOrbsInitialized] = useState(false);

  // Separate animation loop for floating orbs with smooth following
  useEffect(() => {
    let orbAnimationId: number;
    const startTime = Date.now();

    const animateOrbs = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (!containerRef.current) {
        orbAnimationId = requestAnimationFrame(animateOrbs);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const targetCursorX = mousePosition.x * rect.width;
      const targetCursorY = mousePosition.y * rect.height;

      // Initialize orb positions on first run
      if (!orbsInitialized) {
        const orb1InitX = targetCursorX + Math.sin(elapsed * 2) * 60;
        const orb1InitY = targetCursorY + Math.cos(elapsed * 2) * 60;
        const orb2InitX = targetCursorX + Math.sin(elapsed * 3 + Math.PI) * 80;
        const orb2InitY = targetCursorY + Math.cos(elapsed * 3 + Math.PI) * 80;
        
        setOrbPositions({
          orb1: { x: orb1InitX, y: orb1InitY, targetX: orb1InitX, targetY: orb1InitY },
          orb2: { x: orb2InitX, y: orb2InitY, targetX: orb2InitX, targetY: orb2InitY },
        });
        setOrbsInitialized(true);
      }

      setOrbPositions((prev) => {
        // Calculate target positions (cursor + circular motion)
        const orb1TargetX = targetCursorX + Math.sin(elapsed * 2) * 60;
        const orb1TargetY = targetCursorY + Math.cos(elapsed * 2) * 60;

        const orb2TargetX =
          targetCursorX + Math.sin(elapsed * 3 + Math.PI) * 80;
        const orb2TargetY =
          targetCursorY + Math.cos(elapsed * 3 + Math.PI) * 80;

        // Smooth interpolation towards targets
        return {
          orb1: {
            x: lerp(prev.orb1.x, orb1TargetX, 0.08), // Fast response
            y: lerp(prev.orb1.y, orb1TargetY, 0.08),
            targetX: orb1TargetX,
            targetY: orb1TargetY,
          },
          orb2: {
            x: lerp(prev.orb2.x, orb2TargetX, 0.05), // Slower response
            y: lerp(prev.orb2.y, orb2TargetY, 0.05),
            targetX: orb2TargetX,
            targetY: orb2TargetY,
          },
        };
      });

      orbAnimationId = requestAnimationFrame(animateOrbs);
    };

    orbAnimationId = requestAnimationFrame(animateOrbs);

    return () => {
      if (orbAnimationId) {
        cancelAnimationFrame(orbAnimationId);
      }
    };
  }, [mousePosition, containerRef, orbsInitialized]);

  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 10,
        contain: 'layout style paint',
        willChange: 'contents',
      }}
    >
      {/* Floating Orbs that Follow Cursor - only show when hovering */}
      {isHovering && (
        <>
          <div
            className="pointer-events-none absolute h-8 w-8 rounded-full"
            style={{
              transform: `translate3d(${orbPositions.orb1.x - 16}px, ${orbPositions.orb1.y - 16}px, 0)`,
              background: `radial-gradient(circle, ${effectColors[0]} 0%, transparent 70%)`,
              opacity: hasBackgroundImage ? 0.7 : 0.9,
              filter: 'blur(2px)',
              boxShadow: 'none',
              willChange: 'transform',
              contain: 'layout style paint',
            }}
          />

          <div
            className="pointer-events-none absolute h-6 w-6 rounded-full"
            style={{
              transform: `translate3d(${orbPositions.orb2.x - 12}px, ${orbPositions.orb2.y - 12}px, 0)`,
              background: `radial-gradient(circle, ${effectColors[2]} 0%, transparent 70%)`,
              opacity: hasBackgroundImage ? 0.6 : 0.8,
              filter: 'blur(3px)',
              boxShadow: 'none',
              willChange: 'transform',
              contain: 'layout style paint',
            }}
          />
        </>
      )}
    </div>
  );
}
