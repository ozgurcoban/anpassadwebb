import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContactButton } from '@/components/ContactButton';
import { RainbowButton } from '@/components/ui/RainbowButton/RainbowButton';
import ValueProposition from '@/components/ValueProposition';
import { TrackedButton } from '@/components/TrackedLink';
import { type GradientContentProps, ALIGNMENT_CLASSES, CONTENT_ALIGNMENT } from './types';
import { getTextShadow, TEXT_SHADOWS } from './constants';
import { getTextStyles, SPACING, LAYOUT } from './styles';
import { ChevronDown } from 'lucide-react';
import { trackCTAClick } from '@/lib/gtag';

interface ExtendedGradientContentProps extends Omit<GradientContentProps, 'transformedColors'> {
  isImageBackground?: boolean;
  children?: React.ReactNode;
  showScrollIndicator?: boolean;
}

export function GradientContent({
  title,
  description,
  textAlign,
  secondaryCTA,
  isImageBackground = false,
  verticalCenter = false,
  showValueProposition = false,
  showScrollIndicator = false,
  children,
}: ExtendedGradientContentProps) {
  const handleScrollDown = () => {
    trackCTAClick('Scroll Down', 'hero_scroll_indicator');
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return (
    <div className={cn(
      LAYOUT.content.wrapper,
      SPACING.content.mobile,
      SPACING.content.desktop,
      verticalCenter ? "flex flex-1 items-center" : cn(SPACING.contentInner.mobile, SPACING.contentInner.tablet, SPACING.contentInner.desktop)
    )}>
      <div
        className={cn(
          'w-full max-w-7xl mx-auto px-6',
          'pt-12 md:pt-8',
          'pb-24 md:pb-0',
          verticalCenter && "my-auto"
        )}
      >
        <div className={cn(
          "space-y-8 lg:space-y-12"
        )}>
          {/* Main content */}
          <div className={cn(
            "grid",
            "lg:grid-cols-[1.618fr,1fr] lg:gap-12 lg:items-center",
            textAlign === 'center' ? 'place-items-center text-center lg:text-left lg:place-items-start' : textAlign === 'left' ? 'place-items-start text-left' : 'place-items-end text-right'
          )}>
            {/* Left Column - Title, Description, Buttons */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6 max-w-4xl">
                <h1 
                    className={getTextStyles('title', true)} // Always use white text
                    style={{
                      textShadow: getTextShadow(TEXT_SHADOWS.TITLE),
                    }}
                  >
                    {title}
                  </h1>

                  {description && (
                    <p 
                      className={cn(
                        getTextStyles('description', true), // Always use white text
                        textAlign === 'center' ? "max-w-full md:max-w-lg lg:max-w-xl mx-auto lg:mx-0" : "max-w-full md:max-w-lg lg:max-w-xl"
                      )}
                    >
                      {description}
                    </p>
                  )}
              </div>


              {children && (
                <div className={cn(
                  "mt-4 md:mt-6",
                  textAlign === 'center' && "mx-auto lg:mx-0"
                )}>
                  {children}
                </div>
              )}

              <div className={cn(
                    "flex flex-col gap-4 mt-8 md:mt-0",
                    textAlign !== 'center' && "sm:flex-row",
                    {
                      'items-start': textAlign === 'left',
                      'items-center justify-center lg:justify-start': textAlign === 'center',
                      'items-end': textAlign === 'right',
                    }
                  )}>
                    {isImageBackground ? (
                      <ContactButton className="w-full sm:w-auto" />
                    ) : (
                      secondaryCTA && (
                        secondaryCTA.variant === 'rainbow' || !secondaryCTA.variant ? (
                          <RainbowButton asChild>
                            <Link href={secondaryCTA.href}>
                              {secondaryCTA.text}
                            </Link>
                          </RainbowButton>
                        ) : (
                          <TrackedButton
                            href={secondaryCTA.href}
                            variant={secondaryCTA.variant}
                            size="lg"
                            className="w-full sm:w-auto"
                            trackingLabel={secondaryCTA.text}
                            trackingLocation="hero_secondary_cta"
                          >
                            {secondaryCTA.text}
                          </TrackedButton>
                        )
                      )
                    )}
                    
                    {secondaryCTA && isImageBackground && (
                      <TrackedButton
                        href={secondaryCTA.href}
                        variant={secondaryCTA.variant || "glass"}
                        size="lg"
                        className="w-full sm:w-auto"
                        trackingLabel={secondaryCTA.text}
                        trackingLocation="hero_image_secondary_cta"
                      >
                        {secondaryCTA.text}
                      </TrackedButton>
                    )}
              </div>
            </div>
          </div>

          {/* ValueProposition - Below main content on tablet and desktop */}
          {showValueProposition && (
            <div className="hidden md:block">
              <ValueProposition 
                variant="dark" 
                className="w-full max-w-4xl"
              />
            </div>
          )}
        </div>
      </div>
      
      {showScrollIndicator && (
        <button
          onClick={handleScrollDown}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-all duration-300 animate-fade-in-delayed"
          aria-label="Scrolla ner till innehåll"
        >
          <ChevronDown 
            className="h-8 w-8 md:h-10 md:w-10 animate-bounce" 
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          />
        </button>
      )}
    </div>
  );
}