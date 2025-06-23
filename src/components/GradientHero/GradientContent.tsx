import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type GradientContentProps, ALIGNMENT_CLASSES, CONTENT_ALIGNMENT } from './types';

export function GradientContent({
  title,
  description,
  textAlign,
  secondaryCTA,
  transformedColors,
}: GradientContentProps) {
  return (
    <div className="relative z-10 px-4 lg:px-8">
      <div className="relative grid min-h-[inherit] overflow-hidden pb-16 pt-20 md:pb-20 md:pt-24">
        <div className={cn(
          "relative flex items-center px-6",
          {
            'justify-start': textAlign === 'left',
            'justify-center': textAlign === 'center', 
            'justify-end': textAlign === 'right',
          }
        )}>
          <div
            className={cn(
              'grid max-w-4xl gap-y-8 p-8 md:gap-y-10 md:p-12',
              textAlign === 'center' ? '' : CONTENT_ALIGNMENT[textAlign],
              ALIGNMENT_CLASSES[textAlign],
            )}
          >
            <div className="space-y-6">
            <h1 
              className="font-quicksand text-5xl font-medium text-gray-900 dark:text-white md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {title}
            </h1>

            {description && (
              <p 
                className="max-w-2xl text-xl font-light leading-relaxed text-gray-700 dark:text-gray-200 md:text-2xl lg:text-3xl"
              >
                {description}
              </p>
            )}

            </div>

            {secondaryCTA && (
              <div className={cn(
                "flex flex-col gap-4 sm:flex-row",
                {
                  'items-start': textAlign === 'left',
                  'items-center': textAlign === 'center',
                  'items-end': textAlign === 'right',
                }
              )}>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}