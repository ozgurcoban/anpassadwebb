'use client';

import React from 'react';
import TagHeroSection from './sections/TagHeroSection';

interface TagComponentsProps {
  title: string;
  description: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const TagComponents: React.FC<TagComponentsProps> = (props) => {
  return (
    <>
      <TagHeroSection {...props} />
    </>
  );
};

export default TagComponents;