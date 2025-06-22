import { useMemo } from 'react';

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

export function usePerformanceDetection() {
  // Detect performance capabilities once on mount
  const isLowPerformance = useMemo(() => isLowPerformanceDevice(), []);
  
  return { isLowPerformance };
}