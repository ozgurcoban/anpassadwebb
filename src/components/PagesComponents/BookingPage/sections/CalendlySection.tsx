'use client';

import Script from 'next/script';

export default function CalendlySection() {
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
          />
        </div>
      </div>
    </section>
  );
}
