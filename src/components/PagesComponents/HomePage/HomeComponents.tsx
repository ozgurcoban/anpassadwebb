'use client';

import React from 'react';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';

const HomeComponents: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* Server components like FeaturedPosts should be rendered in the page component */}
    </>
  );
};

export default HomeComponents;