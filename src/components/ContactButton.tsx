'use client';

import useDialog from '@/hooks/useDialog';
import ContactForm from './ContactForm';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

type ContactButtonProps = {
  className?: string;
  text?: string;
};

export const ContactButton: React.FC<ContactButtonProps> = ({ className, text = 'Kontakta oss' }) => {
  const setDialog = useDialog((state) => state.setDialog);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
      children: <ContactForm />,
    });
  };

  return (
    <Button 
      variant="rainbow" 
      size="lg" 
      className={className} 
      onClick={openModal}
    >
      {text}
    </Button>
  );
};
