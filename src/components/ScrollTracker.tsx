'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/gtag';

export function ScrollTracker() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    let ticking = false;
    const depths = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.pageYOffset;
          const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);

          // Track each depth milestone only once
          depths.forEach(depth => {
            if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
              trackedDepths.current.add(depth);
              trackScrollDepth(depth);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounced scroll handler
    let scrollTimer: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return null;
}