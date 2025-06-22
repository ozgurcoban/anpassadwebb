'use client';

import React from 'react';
import CaseHeroSection from './sections/CaseHeroSection';
import QuickWinsSection from './sections/QuickWinsSection';
import SingleProjectSection from './sections/SingleProjectSection';
import ChallengeSection from './sections/ChallengeSection';
import SolutionSection from './sections/SolutionSection';
import MenuRevolutionSection from './sections/MenuRevolutionSection';
import CMSBonusSection from './sections/CMSBonusSection';
import AnimatedResultsSection from './sections/AnimatedResultsSection';
import { palermoProject } from '@/data/caseStudies';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import CTASection from './sections/CTASection';

const CaseComponents: React.FC = () => {
  return (
    <>
      <CaseHeroSection />
      <QuickWinsSection />
      <SingleProjectSection />
      <ChallengeSection />
      <SolutionSection />
      <MenuRevolutionSection />
      <CMSBonusSection />
      <AnimatedResultsSection />
      
      {/* Testimonial Section */}
      {palermoProject.testimonial && (
        <Section className="py-16">
          <SectionContainer>
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-secondary/50 rounded-2xl p-12">
                <blockquote className="space-y-6">
                  <p className="text-2xl font-light italic leading-relaxed">
                    &ldquo;{palermoProject.testimonial.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-medium">{palermoProject.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {palermoProject.testimonial.position}
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </SectionContainer>
        </Section>
      )}
      
      {/* About Section */}
      {palermoProject.aboutSection && (
        <Section className="py-16 bg-muted/30">
          <SectionContainer>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-medium">{palermoProject.aboutSection.title}</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {palermoProject.aboutSection.content}
              </p>
            </div>
          </SectionContainer>
        </Section>
      )}
      
      {/* Process Section */}
      {palermoProject.processSection && (
        <Section className="py-16">
          <SectionContainer>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-medium">{palermoProject.processSection.subtitle}</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {palermoProject.processSection.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground pt-2">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </Section>
      )}
      
      <CTASection />
    </>
  );
};

export default CaseComponents;