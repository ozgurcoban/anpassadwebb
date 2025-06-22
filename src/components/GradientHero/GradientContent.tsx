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
              className="font-quicksand text-6xl font-semibold text-white md:text-7xl lg:text-8xl xl:text-9xl"
              style={{
                filter:
                  'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(147,51,234,0.3))',
              }}
            >
              {title}
            </h1>

            {description && (
              <p 
                className="max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl lg:text-3xl"
                style={{
                  textShadow:
                    '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)',
                }}
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
                  className="relative bg-black/30 text-white backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:p-[1px] before:opacity-70 hover:bg-black/40 hover:before:opacity-100"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
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