import { useEffect, useState, useRef, useCallback } from 'react';

interface UseAutoHideHeaderReturn {
  isVisible: boolean;
  transform: string;
}

export function useAutoHideHeader(threshold = 50): UseAutoHideHeaderReturn {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;
    const lastScrollY = lastScrollYRef.current;
    
    // Clear existing pause timer on any scroll
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    
    // Always show at top
    if (scrollY < threshold) {
      setIsVisible(true);
      lastScrollYRef.current = scrollY;
      return;
    }
    
    // Determine scroll direction
    const isScrollingDown = scrollY > lastScrollY;
    const scrollDifference = Math.abs(scrollY - lastScrollY);
    
    // Only update if scroll difference is significant
    if (scrollDifference > 5) {
      setIsVisible(!isScrollingDown);
    }
    
    lastScrollYRef.current = scrollY;
    
    // Set new pause timer (show navbar after 2 seconds of no scrolling)
    pauseTimerRef.current = setTimeout(() => {
      console.log('Pause timer triggered - showing navbar');
      setIsVisible(true);
    }, 2000);
  }, [threshold]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        updateScrollDirection();
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [updateScrollDirection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isVisible,
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
  };
}