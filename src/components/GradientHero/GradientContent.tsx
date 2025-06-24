import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ContactButton } from '@/components/ContactButton';
import { type GradientContentProps, ALIGNMENT_CLASSES, CONTENT_ALIGNMENT } from './types';

export function GradientContent({
  title,
  description,
  textAlign,
  secondaryCTA,
  transformedColors,
  isImageBackground = false,
  verticalCenter = false,
}: GradientContentProps & { isImageBackground?: boolean }) {
  return (
    <div className={cn(
      "relative z-10 px-4 lg:px-8",
      verticalCenter && "flex flex-1 items-center"
    )}>
      <div className={verticalCenter ? "w-full" : "relative flex min-h-[inherit] items-center justify-center overflow-hidden py-16 md:py-20"}>
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
                "font-quicksand text-5xl font-medium md:text-6xl lg:text-7xl xl:text-8xl",
                isImageBackground ? "text-white" : "text-gray-900 dark:text-white"
              )}
              style={isImageBackground ? {
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(0,0,0,0.8)) drop-shadow(0 0 80px rgba(147,51,234,0.4))',
              } : undefined}
            >
              {title}
            </h1>

            {description && (
              <p 
                className={cn(
                  "text-xl font-light leading-relaxed md:text-2xl lg:text-3xl",
                  textAlign === 'center' ? "max-w-2xl mx-auto" : "max-w-2xl",
                  isImageBackground ? "text-white/90" : "text-gray-700 dark:text-gray-200"
                )}
                style={isImageBackground ? {
                  textShadow: '0 2px 25px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7), 0 4px 6px rgba(0,0,0,0.95)',
                } : undefined}
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
                  variant={isImageBackground ? "glass" : "secondary"}
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto",
                    !isImageBackground && "bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  )}
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