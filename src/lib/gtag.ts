export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for common actions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: location ? `${buttonName} - ${location}` : buttonName,
  });
};

export const trackDownload = (fileName: string) => {
  event({
    action: 'download',
    category: 'File',
    label: fileName,
  });
};

export const trackPackageSelection = (packageName: string) => {
  event({
    action: 'select',
    category: 'Package',
    label: packageName,
  });
};

export const trackPageScroll = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'User Engagement',
    label: `${percentage}%`,
    value: percentage,
  });
};

// Add gtag to Window interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}