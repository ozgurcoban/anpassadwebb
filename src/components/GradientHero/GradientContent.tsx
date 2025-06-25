import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContactButton } from '@/components/ContactButton';
import { type GradientContentProps, ALIGNMENT_CLASSES, CONTENT_ALIGNMENT } from './types';
import { TEXT_SHADOWS } from './constants';

export function GradientContent({
  title,
  description,
  textAlign,
  secondaryCTA,
  isImageBackground = false,
  verticalCenter = false,
}: Omit<GradientContentProps, 'transformedColors'> & { isImageBackground?: boolean }) {
  return (
    <div className={cn(
      "relative z-10 px-6 lg:px-8",
      verticalCenter && "flex flex-1 items-center"
    )}>
      <div className={verticalCenter ? "w-full" : "relative flex items-center justify-center py-16 md:py-20 lg:py-24"}>
        <div className={cn(
          "relative w-full max-w-7xl px-6",
          textAlign !== 'center' && "flex items-center",
          textAlign !== 'center' && {
            'justify-start': textAlign === 'left',
            'justify-end': textAlign === 'right',
          }
        )}>
          <div
            className={cn(
              'grid gap-y-8 p-8 md:gap-y-10 md:p-12',
              textAlign === 'center' ? 'mx-auto max-w-4xl' : `max-w-2xl ${CONTENT_ALIGNMENT[textAlign]}`,
              ALIGNMENT_CLASSES[textAlign],
            )}
          >
            <div className="space-y-6">
            <h1 
              className={cn(
                "text-5xl font-medium md:text-6xl lg:text-7xl xl:text-8xl",
                isImageBackground ? "text-white drop-shadow-2xl" : "text-foreground"
              )}
              style={isImageBackground ? {
                textShadow: TEXT_SHADOWS.TITLE,
              } : undefined}
            >
              {title}
            </h1>

            {description && (
              <p 
                className={cn(
                  "text-xl font-light leading-relaxed md:text-2xl lg:text-3xl",
                  textAlign === 'center' ? "max-w-2xl mx-auto" : "max-w-2xl",
                  isImageBackground ? "text-white/90 drop-shadow-lg" : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}

            </div>

            <div className={cn(
              "flex flex-col gap-4",
              textAlign !== 'center' && "sm:flex-row",
              {
                'items-start': textAlign === 'left',
                'items-center justify-center': textAlign === 'center',
                'items-end': textAlign === 'right',
              }
            )}>
              {isImageBackground && (
                <ContactButton className="w-full sm:w-auto" />
              )}
              
              {secondaryCTA && (
                <Button
                  asChild
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={secondaryCTA.href} className="inline-flex items-center gap-2">
                    {secondaryCTA.text}
                    {isImageBackground && (
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
                    )}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}