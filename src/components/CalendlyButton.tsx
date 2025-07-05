'use client';

import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';

interface CalendlyButtonProps {
  url: string;
  text?: string;
  className?: string;
  variant?: 'rainbow' | 'ghost-hero' | 'outline-hero' | 'glass-hero' | 'secondary-solid';
  prefill?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    customAnswers?: Record<string, string>;
  };
}

declare global {
  interface Window {
    Calendly: any;
  }
}

export const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  url,
  text = 'Boka möte',
  className,
  variant = 'rainbow',
  prefill = {}
}) => {
  useEffect(() => {
    // Load Calendly widget script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Cleanup is handled by Calendly widget
    };
  }, []);

  const openCalendly = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url,
        prefill: prefill,
        pageSettings: {
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '9333ea', // Purple color to match the theme
          textColor: '1f2937'
        }
      });
    }
  };

  return (
    <Button
      variant={variant}
      size="lg"
      className={className}
      onClick={openCalendly}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
};