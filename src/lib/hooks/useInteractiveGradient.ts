import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { transformColorsWithMouse, type MousePosition } from '@/lib/color-utils';

// Helper to detect if device has limited performance capabilities
const isLowPerformanceDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for touch devices (usually mobile)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Simple performance heuristic
  const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
  
  return isTouchDevice || prefersReducedMotion || isLowMemory;
};

export interface UseInteractiveGradientProps {
  colors: string[];
}

export function useInteractiveGradient({ colors }: UseInteractiveGradientProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickPosition, setClickPosition] = useState<MousePosition | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detect performance capabilities once on mount
  const isLowPerformance = useMemo(() => isLowPerformanceDevice(), []);

  // Optimized mouse move handler with better throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Disable mouse tracking on low-performance devices
    if (!containerRef.current || isLowPerformance) return;
    
    // Cancel previous frame if it exists
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const newX = Math.max(0, Math.min(1, x));
      const newY = Math.max(0, Math.min(1, y));
      
      // Increased threshold to reduce micro-movements (better performance)
      const threshold = isLowPerformance ? 0.05 : 0.02;
      setMousePosition((prev: MousePosition) => {
        const deltaX = Math.abs(prev.x - newX);
        const deltaY = Math.abs(prev.y - newY);
        if (deltaX > threshold || deltaY > threshold) {
          return { x: newX, y: newY };
        }
        return prev;
      });
    });
  }, [isLowPerformance]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setIsHovering(false);
    setMousePosition({ x: 0.5, y: 0.5 });
    setClickPosition(null);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setClickPosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    
    setTimeout(() => {
      setClickPosition(null);
    }, 1000);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Memoized transformed colors to prevent unnecessary recalculations
  const transformedColors = useMemo(() => 
    transformColorsWithMouse(colors, mousePosition, isHovering),
    [colors, mousePosition, isHovering]
  );

  return {
    containerRef,
    mousePosition,
    isHovering: isLowPerformance ? false : isHovering, // Disable hover effects on low-performance devices
    clickPosition,
    transformedColors,
    isLowPerformance,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: isLowPerformance ? () => {} : handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
  };
}