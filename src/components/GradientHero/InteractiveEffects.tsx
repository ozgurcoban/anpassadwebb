'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

interface InteractiveEffectsProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  transformedColors: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onMouseClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function InteractiveEffects({
  mousePosition,
  isHovering,
  transformedColors,
  containerRef,
  onMouseClick
}: InteractiveEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createParticle = (x: number, y: number): Particle => ({
    id: Math.random(),
    x: x + (Math.random() - 0.5) * 40,
    y: y + (Math.random() - 0.5) * 40,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.6 + 0.4,
    life: 0,
    maxLife: Math.random() * 120 + 60
  });

  const createRipple = (x: number, y: number): Ripple => ({
    id: Math.random(),
    x,
    y,
    radius: 0,
    opacity: 0.8,
    maxRadius: Math.random() * 150 + 100
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, createRipple(x, y)]);
    
    for (let i = 0; i < 8; i++) {
      setParticles(prev => [...prev, createParticle(x, y)]);
    }
    
    onMouseClick?.(e);
  };

  useEffect(() => {
    if (!isHovering) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = mousePosition.x * rect.width;
      const y = mousePosition.y * rect.height;


      if (Math.random() < 0.3) {
        setParticles(prev => [...prev, createParticle(x, y)]);
      }

      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
          opacity: particle.opacity * (1 - particle.life / particle.maxLife),
          vx: particle.vx * 0.99,
          vy: particle.vy * 0.99
        })).filter(particle => particle.life < particle.maxLife && particle.opacity > 0.01)
      );

      setRipples(prev =>
        prev.map(ripple => ({
          ...ripple,
          radius: ripple.radius + 3,
          opacity: ripple.opacity * 0.95
        })).filter(ripple => ripple.radius < ripple.maxRadius && ripple.opacity > 0.05)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [isHovering, mousePosition, containerRef]);

  if (!isHovering) return null;

  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const cursorX = mousePosition.x * rect.width;
  const cursorY = mousePosition.y * rect.height;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={handleClick}
      >



        {/* Dynamic Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${transformedColors[Math.floor(Math.random() * transformedColors.length)]} 0%, transparent 70%)`,
              opacity: particle.opacity,
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Click Ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full border pointer-events-none"
            style={{
              left: ripple.x - ripple.radius,
              top: ripple.y - ripple.radius,
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              borderColor: `${transformedColors[1]}${Math.floor(ripple.opacity * 255).toString(16).padStart(2, '0')}`,
              borderWidth: '2px',
              opacity: ripple.opacity,
            }}
          />
        ))}

        {/* Floating Orbs that Follow Cursor */}
        <div
          className="absolute w-8 h-8 rounded-full pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: cursorX + Math.sin(Date.now() * 0.002) * 60 - 16,
            top: cursorY + Math.cos(Date.now() * 0.002) * 60 - 16,
            background: `radial-gradient(circle, ${transformedColors[0]} 0%, transparent 70%)`,
            opacity: 0.7,
            filter: 'blur(2px)',
          }}
        />

        <div
          className="absolute w-6 h-6 rounded-full pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: cursorX + Math.sin(Date.now() * 0.003 + Math.PI) * 80 - 12,
            top: cursorY + Math.cos(Date.now() * 0.003 + Math.PI) * 80 - 12,
            background: `radial-gradient(circle, ${transformedColors[2]} 0%, transparent 70%)`,
            opacity: 0.6,
            filter: 'blur(3px)',
          }}
        />

      </div>
    </div>
  );
}