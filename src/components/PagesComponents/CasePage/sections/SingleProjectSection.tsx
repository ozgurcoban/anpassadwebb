'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import { ProjectDetails } from '@/components/Case/ProjectDetails';
import { palermoProject } from '@/data/caseStudies';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const SingleProjectSection = () => {
  const { beforeImage, afterImage } = palermoProject;

  return (
    <Section className="space-y-16 py-16">
      {/* BeforeAfter Slider - Full width dramatic intro */}
      {beforeImage && afterImage && (
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Tidigare"
              afterLabel="Nu"
              className="shadow-2xl"
              aspectRatio="16/10"
              title="Se förändringen"
              description="Dra i reglaget för att jämföra före och efter"
              borderRadius="1rem"
              sliderHandleSize="lg"
              initialPosition={30}
            />
          </div>
        </div>
      )}

      {/* Rest of project details */}
      <SectionContainer>
        <ProjectDetails caseStudy={palermoProject} showHeroImage={false} />
      </SectionContainer>
    </Section>
  );
};

export default SingleProjectSection;