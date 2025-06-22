import { useState, useRef, useCallback } from 'react';
import { type MousePosition } from '@/lib/color-utils';

export interface UseMouseTrackingProps {
  isLowPerformance: boolean;
}

export function useMouseTracking({ isLowPerformance }: UseMouseTrackingProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickPosition, setClickPosition] = useState<MousePosition | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized mouse move handler with better throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
      
      // Threshold to reduce micro-movements
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
    if (!isLowPerformance) {
      setIsHovering(true);
    }
  }, [isLowPerformance]);

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
    
    setClickPosition({ 
      x: Math.max(0, Math.min(1, x)), 
      y: Math.max(0, Math.min(1, y)) 
    });
    
    setTimeout(() => {
      setClickPosition(null);
    }, 1000);
  }, []);

  return {
    containerRef,
    mousePosition,
    isHovering: isLowPerformance ? false : isHovering,
    clickPosition,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
  };
}