'use client';

import { useState, useEffect, useMemo } from 'react';

interface DeviceCapabilities {
  isTouchDevice: boolean;
  isHighDensityScreen: boolean;
  supportsPassive: boolean;
  prefersReducedMotion: boolean;
  viewportSize: {
    width: number;
    height: number;
  };
}

// Cache device capabilities at module level to avoid recalculation
let cachedCapabilities: DeviceCapabilities | null = null;

export function useDeviceCapabilities(): DeviceCapabilities {
  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));
  
  // Calculate static capabilities once
  const staticCapabilities = useMemo(() => {
    if (cachedCapabilities) {
      return cachedCapabilities;
    }
    
    if (typeof window === 'undefined') {
      return {
        isTouchDevice: false,
        isHighDensityScreen: false,
        supportsPassive: false,
        prefersReducedMotion: false,
      };
    }
    
    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // High density screen detection
    const isHighDensityScreen = window.devicePixelRatio > 1;
    
    // Passive event listener support
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
          return true;
        }
      });
      window.addEventListener('testPassive', null as any, opts);
      window.removeEventListener('testPassive', null as any, opts);
    } catch (e) {
      supportsPassive = false;
    }
    
    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    cachedCapabilities = {
      isTouchDevice,
      isHighDensityScreen,
      supportsPassive,
      prefersReducedMotion,
      viewportSize: { width: 0, height: 0 }, // Will be updated separately
    };
    
    return cachedCapabilities;
  }, []);
  
  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    ...staticCapabilities,
    viewportSize,
  };
}