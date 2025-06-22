'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import { type MousePosition } from '@/lib/color-utils';

export interface GradientHeroContextValue {
  // Visual state
  transformedColors: string[];
  mousePosition: MousePosition;
  isHovering: boolean;
  clickPosition: MousePosition | null;
  
  // Performance flags
  isLowPerformance: boolean;
  
  // Refs and handlers
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
}

const GradientHeroContext = createContext<GradientHeroContextValue | null>(null);

export interface GradientHeroProviderProps {
  children: ReactNode;
  value: GradientHeroContextValue;
}

export function GradientHeroProvider({ children, value }: GradientHeroProviderProps) {
  return (
    <GradientHeroContext.Provider value={value}>
      {children}
    </GradientHeroContext.Provider>
  );
}

export function useGradientHeroContext() {
  const context = useContext(GradientHeroContext);
  if (!context) {
    throw new Error('useGradientHeroContext must be used within a GradientHeroProvider');
  }
  return context;
}