import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContactButton } from '@/components/ContactButton';
import { RainbowButton } from '@/components/ui/RainbowButton/RainbowButton';
import ValueProposition from '@/components/ValueProposition';
import { type GradientContentProps, ALIGNMENT_CLASSES, CONTENT_ALIGNMENT } from './types';
import { getTextShadow, TEXT_SHADOWS } from './constants';
import { getTextStyles, SPACING, LAYOUT } from './styles';
import { ChevronDown } from 'lucide-react';

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
          'w-full max-w-7xl mx-auto px-6 grid',
          SPACING.grid.gap,
          SPACING.grid.padding,
          textAlign === 'center' ? 'place-items-center text-center' : textAlign === 'left' ? 'place-items-start text-left' : 'place-items-end text-right',
          verticalCenter && "my-auto"
        )}
      >
        <div className="space-y-6 max-w-4xl">
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
                  textAlign === 'center' ? "max-w-2xl mx-auto" : "max-w-2xl"
                )}
              >
                {description}
              </p>
            )}

        </div>

        {showValueProposition && (
          <ValueProposition 
            variant="dark" 
            className={cn(
              "mt-8 mb-4 max-w-3xl",
              textAlign === 'center' && "mx-auto"
            )}
          />
        )}

        {children && (
          <div className={cn(
            "mt-6",
            textAlign === 'center' && "mx-auto"
          )}>
            {children}
          </div>
        )}

        <div className={cn(
              "flex flex-col gap-4",
              textAlign !== 'center' && "sm:flex-row",
              {
                'items-start': textAlign === 'left',
                'items-center justify-center': textAlign === 'center',
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
                    <Button
                      asChild
                      variant={secondaryCTA.variant}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Link href={secondaryCTA.href}>
                        {secondaryCTA.text}
                      </Link>
                    </Button>
                  )
                )
              )}
              
              {secondaryCTA && isImageBackground && (
                <Button
                  asChild
                  variant={secondaryCTA.variant || "glass"}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
        </div>
      </div>
      
      {showScrollIndicator && (
        <button
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-all duration-300 animate-fade-in-delayed"
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