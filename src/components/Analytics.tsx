'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/gtag';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      // For now, we'll track just the pathname without query params
      // This avoids the Suspense boundary issue in Next.js 15
      pageview(pathname);
    }
  }, [pathname]);

  return null;
}