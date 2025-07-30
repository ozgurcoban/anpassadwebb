'use client';

import React from 'react';
import CaseHeroSection from './sections/CaseHeroSection';
import QuickWinsSection from './sections/QuickWinsSection';
import SingleProjectSection from './sections/SingleProjectSection';
import ChallengeSection from './sections/ChallengeSection';
import SolutionSection from './sections/SolutionSection';
import MenuRevolutionSection from './sections/MenuRevolutionSection';
import CMSBonusSection from './sections/CMSBonusSection';
import { palermoProject } from '@/data/caseStudies';
import Section from '@/components/ui/Section';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeading from '@/components/ui/SectionHeading';
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
              {palermoProject.link && (
                <div className="mt-8">
                  <a
                    href={palermoProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Besök Palermos hemsida
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </SectionContainer>
        </Section>
      )}
      
      {/* About Section */}
      {palermoProject.aboutSection && (
        <Section className="py-16 bg-muted/30">
          <SectionContainer>
            <div className="max-w-3xl mx-auto">
              <SectionHeading 
                title={palermoProject.aboutSection.title}
                subtitle={palermoProject.aboutSection.content}
                as="h3"
              />
            </div>
          </SectionContainer>
        </Section>
      )}
      
      {/* Process Section */}
      {palermoProject.processSection && (
        <Section className="py-16">
          <SectionContainer>
            <div className="max-w-4xl mx-auto">
              <SectionHeading 
                title={palermoProject.processSection.subtitle}
                as="h3"
                className="mb-12"
              />
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