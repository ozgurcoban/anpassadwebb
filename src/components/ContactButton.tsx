'use client';

import useDialog from '@/hooks/useDialog';
import ContactForm from './ContactForm';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { trackPackageSelection, trackCTAClick } from '@/lib/gtag';

type ContactButtonProps = {
  className?: string;
  text?: string;
  variant?: 'rainbow' | 'ghost-hero' | 'outline-hero' | 'glass-hero' | 'secondary-solid';
  packageName?: string;
};

export const ContactButton: React.FC<ContactButtonProps> = ({ className, text = 'Kontakta oss', variant = 'rainbow', packageName }) => {
  const setDialog = useDialog((state) => state.setDialog);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    // Track CTA click
    trackCTAClick(text, 'contact_button');
    
    // Track package selection if a package is selected
    if (packageName) {
      trackPackageSelection(packageName);
    }
    
    setDialog({
      isOpen: true,
      onClose: () => setDialog({ isOpen: false }),
      title: 'Kontakta oss',
      description: (
        <>
          Fyll i formuläret nedan så återkommer vi inom 24 timmar.{' '}
          <Link
            onClick={(e) => {
              setDialog({ isOpen: false });
            }}
            href="/villkor"
            className="underline"
          >
            Vi sparar inga uppgifter i marknadsföringssyfte och vi delar ej dem
            heller.
          </Link>
        </>
      ),
      children: <ContactForm selectedPackage={packageName} />,
    });
  };

  return (
    <Button 
      variant={variant} 
      size="lg" 
      className={className} 
      onClick={openModal}
    >
      {text}
    </Button>
  );
};
