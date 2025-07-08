'use client';

import { useEffect, useRef } from 'react';

export function useTrackPostView(slug: string) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Skip tracking in development
    if (process.env.NODE_ENV === 'development') {
      console.log('View tracking disabled in development');
      return;
    }

    // Only track once per page load
    if (hasTracked.current) return;
    
    const trackView = async () => {
      try {
        await fetch(`/api/blogg/${slug}/views`, {
          method: 'POST',
        });
        hasTracked.current = true;
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    // Track view after a short delay to ensure genuine visit
    const timer = setTimeout(trackView, 1000);

    return () => clearTimeout(timer);
  }, [slug]);
}