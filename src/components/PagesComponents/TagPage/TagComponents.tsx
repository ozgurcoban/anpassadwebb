'use client';

import React from 'react';
import GradientHero from '@/components/GradientHero';

interface TagComponentsProps {
  title: string;
  description: string;
}

const TagComponents: React.FC<TagComponentsProps> = ({ 
  title, 
  description
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
      />
    </>
  );
};

export default TagComponents;