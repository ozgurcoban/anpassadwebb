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
      <div className="grid min-h-[inherit] grid-cols-12 items-center py-20">
        <div
          className={cn(
            'col-span-12 space-y-6',
            CONTENT_ALIGNMENT[textAlign],
            ALIGNMENT_CLASSES[textAlign],
          )}
        >
          {/* Enhanced Glassmorphism Card with glow */}
          <div className="group relative">
            {/* Glow effect */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-75 blur-xl transition-all duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${transformedColors[0]}40, ${transformedColors[1]}40, ${transformedColors[2]}40)`,
              }}
            />

            {/* Card */}
            <div
              className={cn(
                'relative rounded-2xl bg-white/10 p-8 backdrop-blur-md md:p-10',
                'border border-white/20 shadow-2xl',
                'transform transition-all duration-300 hover:bg-white/15',
              )}
            >
              <h1 className="mb-4 text-balance font-quicksand text-4xl font-light text-white md:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>

              {description && (
                <p className="mb-8 max-w-2xl text-balance text-lg text-white/90">
                  {description}
                </p>
              )}

              {secondaryCTA && (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}