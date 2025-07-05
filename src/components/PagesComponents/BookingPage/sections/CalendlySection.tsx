'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function CalendlySection() {
  useEffect(() => {
    // Om Calendly redan är laddat, initiera widgets
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/ozgur-c',
        parentElement: document.querySelector('.calendly-inline-widget'),
        resize: true
      });
    }
  }, []);

  const handleScriptLoad = () => {
    // När scriptet laddas, initiera widget
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/ozgur-c',
        parentElement: document.querySelector('.calendly-inline-widget'),
        resize: true
      });
    }
  };

  return (
    <section className="w-full py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/ozgur-c"
            data-resize="true"
            style={{
              minWidth: '320px',
              minHeight: '630px',
              overflow: 'hidden'
            }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
          />
        </div>
      </div>
    </section>
  );
}
