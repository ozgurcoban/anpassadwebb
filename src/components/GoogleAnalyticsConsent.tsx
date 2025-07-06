'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { initializeGtag, disableGtag, GA_TRACKING_ID } from '@/lib/gtag';

export default function GoogleAnalyticsConsent() {
  const { isAllowed } = useCookieConsent();
  const analyticsAllowed = isAllowed('analytics');

  useEffect(() => {
    // Listen for consent changes
    const handleConsentUpdate = (event: CustomEvent) => {
      const consent = event.detail;
      if (consent?.preferences?.analytics) {
        initializeGtag();
      } else {
        disableGtag();
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

    // Initialize if already consented
    if (analyticsAllowed) {
      initializeGtag();
    }

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, [analyticsAllowed]);

  // Only load GA script if consent is given and we have a tracking ID
  if (!analyticsAllowed || !GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
}