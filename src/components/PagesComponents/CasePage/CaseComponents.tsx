'use client';

import React from 'react';
import CaseHeroSection from './sections/CaseHeroSection';
import StatsSection from './sections/StatsSection';
import PortfolioSection from './sections/PortfolioSection';
import CTASection from './sections/CTASection';

const CaseComponents: React.FC = () => {
  return (
    <>
      <CaseHeroSection />
      <StatsSection />
      <PortfolioSection />
      <CTASection />
    </>
  );
};

export default CaseComponents;