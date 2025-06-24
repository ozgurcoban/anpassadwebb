'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import { palermoProject } from '@/data/caseStudies';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const SingleProjectSection = () => {
  const { beforeImage, afterImage } = palermoProject;

  return (
    <div id="before-after-section">
      <Section className="py-16">
        {/* BeforeAfter Slider - Full width dramatic intro */}
        {beforeImage && afterImage && (
          <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                beforeLabel="Tidigare design"
                afterLabel="Nuvarande design"
                className="rounded-2xl shadow-2xl"
                aspectRatio="4/3"
                title="Från osynlig till fullbokad"
                description="Förr: En hemsida från 2011 som inte gick att hitta. Nu: Modern design som engagerar. Dra i reglaget för att se förändringen."
                initialPosition={30}
              />
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default SingleProjectSection;
