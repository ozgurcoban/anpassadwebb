'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import { palermoProject } from '@/data/caseStudies';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const SingleProjectSection = () => {
  const { beforeImage, afterImage } = palermoProject;

  return (
    <Section className="py-16" id="before-after-section">
      {/* BeforeAfter Slider - Full width dramatic intro */}
      {beforeImage && afterImage && (
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Tidigare"
              afterLabel="Nu"
              className="shadow-2xl rounded-2xl"
              aspectRatio="4/3"
              title="Se förändringen"
              description="Dra i reglaget för att jämföra före och efter"
              initialPosition={30}
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default SingleProjectSection;
