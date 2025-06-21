'use client';

import React from 'react';
import CaseHeroSection from './sections/CaseHeroSection';
import StatsSection from './sections/StatsSection';
import SingleProjectSection from './sections/SingleProjectSection';
import CTASection from './sections/CTASection';

const CaseComponents: React.FC = () => {
  return (
    <>
      <CaseHeroSection />
      <StatsSection />
      <SingleProjectSection />
      <CTASection />
    </>
  );
};

export default CaseComponents;