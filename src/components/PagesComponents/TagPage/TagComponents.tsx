'use client';

import React from 'react';
import GradientHero from '@/components/GradientHero';

interface TagComponentsProps {
  title: string;
  description: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const TagComponents: React.FC<TagComponentsProps> = ({ 
  title, 
  description, 
  showCTA, 
  ctaText, 
  ctaHref 
}) => {
  return (
    <>
      <GradientHero
        title={title}
        description={description}
        colorScheme="blue-green"
        textAlign="center"
        minHeight="40vh"
        verticalCenter={true}
        secondaryCTA={showCTA && ctaText && ctaHref ? {
          text: ctaText,
          href: ctaHref
        } : undefined}
      />
    </>
  );
};

export default TagComponents;