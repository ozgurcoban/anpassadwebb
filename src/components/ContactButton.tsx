'use client';

import useDialog from '@/hooks/useDialog';
import ContactForm from './ContactForm';
import React from 'react';
import Link from 'next/link';
import { RainbowModalButton } from './ui/RainbowButton/RainbowModalButton';
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
          Fyll i formuläret nedan så återkommer vi inom kort.{' '}
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
    <RainbowModalButton className={className} onClick={openModal}>
      {text}
    </RainbowModalButton>
  );
};
