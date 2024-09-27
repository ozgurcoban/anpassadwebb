'use client';

import { AnimatedButton } from './ui/Buttons';
import useDialog from '@/hooks/useDialog';
import ContactForm from './form/ContactForm';
import React from 'react';

export const ContactButton: React.FC = () => {
  const setDialog = useDialog((state) => state.setDialog);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDialog({
      isOpen: true,
      onClose: () => setDialog({ isOpen: false }),
      title: 'Kontakta oss',
      description: 'Fyll i formuläret nedan så återkommer vi inom kort.',
      children: <ContactForm />,
    });
  };

  return <AnimatedButton onClick={openModal}>Kontakta mig</AnimatedButton>;
};
