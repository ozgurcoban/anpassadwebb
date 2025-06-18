'use client';

import React from 'react';
import ContactHeroSection from './sections/ContactHeroSection';
import ContactFormSection from './sections/ContactFormSection';
import MeetingSection from './sections/MeetingSection';

const ContactComponents: React.FC = () => {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <MeetingSection />
    </>
  );
};

export default ContactComponents;