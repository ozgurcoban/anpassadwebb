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

export function GradientContent({
  title,
  description,
  textAlign,
  secondaryCTA,
  isImageBackground = false,
  verticalCenter = false,
  showValueProposition = false,
}: Omit<GradientContentProps, 'transformedColors'> & { isImageBackground?: boolean }) {
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
                  <RainbowButton asChild>
                    <Link href={secondaryCTA.href}>
                      {secondaryCTA.text}
                    </Link>
                  </RainbowButton>
                )
              )}
              
              {secondaryCTA && isImageBackground && (
                <Button
                  asChild
                  variant={secondaryCTA.variant || "glass"}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={secondaryCTA.href} className="inline-flex items-center gap-2">
                    {secondaryCTA.text}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                </Button>
              )}
        </div>
      </div>
    </div>
  );
}