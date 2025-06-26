'use client';

import React, { useEffect, useState } from 'react';
import { lerp } from '@/lib/animation-utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}


interface InteractiveEffectsProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  transformedColors: string[];
  particleColors?: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onMouseClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hasBackgroundImage?: boolean;
}

export function InteractiveEffects({
  mousePosition,
  isHovering,
  transformedColors,
  particleColors,
  containerRef,
  onMouseClick,
  hasBackgroundImage = false,
}: InteractiveEffectsProps) {
  // Use particle colors if provided, otherwise fall back to transformed colors
  const effectColors = particleColors || transformedColors;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [orbPositions, setOrbPositions] = useState({
    orb1: { x: 0, y: 0, targetX: 0, targetY: 0 },
    orb2: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  const createParticle = (x: number, y: number): Particle => ({
    id: Math.random(),
    x: x + (Math.random() - 0.5) * 40,
    y: y + (Math.random() - 0.5) * 40,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: 3,
    opacity: 1,
    life: 0,
    maxLife: Math.random() * 120 + 60,
  });


  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 8; i++) {
      setParticles((prev) => [...prev, createParticle(x, y)]);
    }

    onMouseClick?.(e);
  };

  useEffect(() => {
    if (!isHovering) {
      setParticles([]);
      return;
    }

    let animationFrameId: number;

    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = mousePosition.x * rect.width;
      const y = mousePosition.y * rect.height;

      // Reduced particle spawn rate for better performance
      if (Math.random() < 0.15) {
        setParticles((prev) => [...prev, createParticle(x, y)]);
      }

      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            opacity: particle.opacity * (1 - particle.life / particle.maxLife),
            vx: particle.vx * 0.99,
            vy: particle.vy * 0.99,
          }))
          .filter(
            (particle) =>
              particle.life < particle.maxLife && particle.opacity > 0.01,
          ),
      );


      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovering, mousePosition, containerRef]);

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
  }, [mousePosition, containerRef]);

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
      <div
        className="pointer-events-auto absolute inset-0"
        onClick={handleClick}
        style={{
          contain: 'layout style paint',
        }}
      >
        {/* Dynamic Particles - only show when hovering */}
        {isHovering &&
          particles.map((particle) => (
            <div
              key={particle.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                transform: `translate3d(${particle.x - particle.size / 2}px, ${particle.y - particle.size / 2}px, 0)`,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)`,
                opacity: 0.38,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 3px rgba(255,255,255,0.3)',
                willChange: 'transform, opacity',
                contain: 'layout style paint',
              }}
            />
          ))}


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
    </div>
  );
}
