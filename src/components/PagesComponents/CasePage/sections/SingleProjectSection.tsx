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
    <Section className="py-16 space-y-12">
      {/* BeforeAfter Slider - Full width on mobile */}
      {beforeImage && afterImage && (
        <div className="w-full md:px-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Tidigare design"
              afterLabel="Nuvarande design"
              className="shadow-xl"
              aspectRatio="4/3"
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