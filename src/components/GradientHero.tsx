'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type ColorScheme =
  | 'blue-purple'
  | 'purple-pink'
  | 'pink-orange'
  | 'blue-green'
  | 'custom';

interface GradientHeroProps {
  title: string;
  description?: string;
  colorScheme?: ColorScheme;
  customColors?: string[];
  textAlign?: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
  };
  className?: string;
  minHeight?: string;
}

const colorSchemes: Record<ColorScheme, string[]> = {
  'blue-purple': ['#3b82f6', '#8b5cf6', '#6366f1'],
  'purple-pink': ['#8b5cf6', '#ec4899', '#a855f7'],
  'pink-orange': ['#ec4899', '#f97316', '#f472b6'],
  'blue-green': ['#3b82f6', '#10b981', '#06b6d4'],
  custom: [],
};

export default function GradientHero({
  title,
  description,
  colorScheme = 'blue-purple',
  customColors,
  textAlign = 'left',
  secondaryCTA,
  className,
  minHeight = '50vh',
}: GradientHeroProps) {
  const colors = customColors || colorSchemes[colorScheme];

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const contentAlignment = {
    left: 'md:col-start-1 md:col-end-7',
    center: 'md:col-start-3 md:col-end-11',
    right: 'md:col-start-7 md:col-end-13',
  };

  return (
    <section
      className={cn(
        'relative mx-auto max-w-screen-2xl px-4 lg:px-8',
        className,
      )}
    >
      <div
        className="relative overflow-hidden lg:rounded-2xl"
        style={{ minHeight }}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          {/* Main gradient with more visible animation */}
          <div className="absolute inset-0">
            <div
              className="animate-gradient absolute inset-0"
              style={{
                background: `linear-gradient(-45deg, 
                ${colors[0]}, 
                ${colors[1]}, 
                ${colors[2]}, 
                ${colors[1]}, 
                ${colors[0]})`,
                backgroundSize: '300% 300%',
              }}
            />
          </div>

          {/* Radial gradient overlay for depth */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${colors[2]}40 0%, transparent 50%), 
                         radial-gradient(circle at 70% 80%, ${colors[1]}30 0%, transparent 50%)`,
            }}
          />

          {/* Enhanced Mesh Overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <pattern
                  id="mesh-pattern"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  {/* Dots - bigger and more visible */}
                  <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="30" cy="0" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="60" cy="0" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="0" cy="30" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="30" cy="30" r="2" fill="white" opacity="0.7" />
                  <circle cx="60" cy="30" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="0" cy="60" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="30" cy="60" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="60" cy="60" r="1.5" fill="white" opacity="0.5" />

                  {/* Connecting lines - updated for new pattern size */}
                  <line
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="30"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="60"
                    y1="0"
                    x2="30"
                    y2="30"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="0"
                    y1="60"
                    x2="30"
                    y2="30"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <line
                    x1="60"
                    y1="60"
                    x2="30"
                    y2="30"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
            </svg>
          </div>

          {/* Animated Blobs - More vibrant and visible */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="animate-blob absolute left-[5%] top-[15%] h-96 w-96 rounded-full mix-blend-screen blur-[80px]"
              style={{
                background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]}80 50%, transparent 70%)`,
                opacity: 0.7,
                animationDelay: '0s',
              }}
            />
            <div
              className="animate-blob absolute right-[0%] top-[40%] h-[32rem] w-[32rem] rounded-full mix-blend-screen blur-[100px]"
              style={{
                background: `radial-gradient(circle, ${colors[1]} 0%, ${colors[2]}80 50%, transparent 70%)`,
                opacity: 0.6,
                animationDelay: '1.5s',
              }}
            />
            <div
              className="animate-blob absolute bottom-[-5%] left-[25%] h-[28rem] w-[28rem] rounded-full mix-blend-screen blur-[90px]"
              style={{
                background: `radial-gradient(circle, ${colors[2]} 0%, ${colors[0]}80 50%, transparent 70%)`,
                opacity: 0.7,
                animationDelay: '3.5s',
              }}
            />
            {/* Extra glow blob for visual interest */}
            <div
              className="animate-blob absolute left-[50%] top-[30%] h-64 w-64 rounded-full blur-[60px]"
              style={{
                background: `radial-gradient(circle, white 0%, ${colors[1]}60 40%, transparent 70%)`,
                opacity: 0.3,
                animationDelay: '5s',
              }}
            />
          </div>

          {/* Floating code snippets */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Code snippet 1 - <div> */}
            <div
              className="absolute left-[60%] top-[10%] animate-pulse opacity-40"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="font-mono rounded bg-white/5 px-3 py-1 text-xs text-white/60 shadow-lg backdrop-blur-sm">
                {`<div className="hero">`}
              </div>
            </div>

            {/* Code snippet 2 - function */}
            <div
              className="absolute bottom-[15%] right-[8%] hidden animate-pulse opacity-30 md:block"
              style={{ animationDelay: '1.8s' }}
            >
              <div className="font-mono rounded bg-white/5 px-3 py-1 text-xs text-white/50 shadow-lg backdrop-blur-sm">
                {`const gradient = () => {}`}
              </div>
            </div>

            {/* Code snippet 3 - CSS */}
            <div
              className="md-[25%] md-top-[65%] absolute left-[50%] top-[70%] animate-pulse opacity-35"
              style={{ animationDelay: '3.3s' }}
            >
              <div className="font-mono rounded bg-white/5 px-3 py-1 text-xs text-white/55 shadow-lg backdrop-blur-sm">
                {`.blur-xl { filter: blur(24px) }`}
              </div>
            </div>

            {/* Code snippet 4 - import */}
            <div
              className="absolute right-[5%] top-[25%] animate-pulse opacity-25"
              style={{ animationDelay: '4.7s' }}
            >
              <div className="font-mono rounded bg-white/5 px-2 py-1 text-xs text-white/45 shadow-lg backdrop-blur-sm">
                import React
              </div>
            </div>

            {/* Code snippet 5 - useState */}
            <div
              className="absolute left-[90%] top-[50%] animate-pulse opacity-30"
              style={{ animationDelay: '6.2s' }}
            >
              <div className="font-mono rounded bg-white/5 px-2 py-1 text-xs text-white/40 shadow-lg backdrop-blur-sm">
                <span className="text-blue-400/60">useState</span>(
                <span className="text-purple-400/60">false</span>)
              </div>
            </div>

            {/* Code snippet 6 - className */}
            <div
              className="absolute bottom-[16%] left-[35%] hidden animate-pulse opacity-35 md:block"
              style={{ animationDelay: '7.5s' }}
            >
              <div className="font-mono rounded bg-white/5 px-2 py-1 text-xs text-white/50 shadow-lg backdrop-blur-sm">
                className=
                <span className="text-green-400/60">"animate-gradient"</span>
              </div>
            </div>

            {/* Floating symbols */}
            <div
              className="font-mono absolute bottom-[5%] left-[15%] animate-pulse text-2xl text-white/20"
              style={{ animationDelay: '2.3s' }}
            >
              {`{ }`}
            </div>
            <div
              className="font-mono absolute left-[3%] top-[65%] hidden animate-pulse text-xl text-white/15 md:left-[65%] md:block"
              style={{ animationDelay: '5.5s' }}
            >
              &lt;/&gt;
            </div>
            <div
              className="font-mono absolute left-[85%] top-[45%] animate-pulse text-lg text-white/20"
              style={{ animationDelay: '0.8s' }}
            >
              {`( )`}
            </div>
          </div>

          {/* Stars with light rays */}
          <div className="absolute inset-0">
            {/* Star 1 */}
            <div className="absolute left-[80%] top-[20%]">
              <div className="relative">
                {/* Vertical rays */}
                <div className="absolute -top-2 left-1/2 h-4 w-[1px] -translate-x-1/2 bg-gradient-to-t from-transparent via-white/60 to-transparent" />
                <div className="absolute -bottom-2 left-1/2 h-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
                {/* Horizontal rays */}
                <div className="absolute -left-2 top-1/2 h-[1px] w-4 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="absolute -right-2 top-1/2 h-[1px] w-4 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/60 to-transparent" />
                <div
                  className="h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.6)]"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>

            {/* Star 2 */}
            <div className="absolute left-[20%] top-[80%]">
              <div className="relative">
                {/* Vertical rays */}
                <div className="absolute -top-3 left-1/2 h-6 w-[1px] -translate-x-1/2 bg-gradient-to-t from-transparent via-white/70 to-transparent" />
                <div className="absolute -bottom-3 left-1/2 h-6 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
                {/* Horizontal rays */}
                <div className="absolute -left-3 top-1/2 h-[1px] w-6 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <div className="absolute -right-3 top-1/2 h-[1px] w-6 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/70 to-transparent" />
                <div
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_15px_6px_rgba(255,255,255,0.5)]"
                  style={{ animationDelay: '1.4s' }}
                />
              </div>
            </div>

            {/* Star 3 */}
            <div className="absolute left-[70%] top-[87%]">
              <div className="relative">
                {/* Vertical rays */}
                <div className="absolute -top-1.5 left-1/2 h-3 w-[0.5px] -translate-x-1/2 bg-gradient-to-t from-transparent via-white/50 to-transparent" />
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-[0.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                {/* Horizontal rays */}
                <div className="absolute -left-1.5 top-1/2 h-[0.5px] w-3 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                <div className="absolute -right-1.5 top-1/2 h-[0.5px] w-3 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/50 to-transparent" />
                <div
                  className="h-0.5 w-0.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.7)]"
                  style={{ animationDelay: '2.7s' }}
                />
              </div>
            </div>

            {/* Star 4 */}
            <div className="absolute left-[60%] top-[40%]">
              <div className="relative">
                {/* Vertical rays */}
                <div className="absolute -top-2.5 left-1/2 h-5 w-[1px] -translate-x-1/2 bg-gradient-to-t from-transparent via-white/60 to-transparent" />
                <div className="absolute -bottom-2.5 left-1/2 h-5 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
                {/* Horizontal rays */}
                <div className="absolute -left-2.5 top-1/2 h-[1px] w-5 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="absolute -right-2.5 top-1/2 h-[1px] w-5 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/60 to-transparent" />
                <div
                  className="h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_12px_5px_rgba(255,255,255,0.5)]"
                  style={{ animationDelay: '4.1s' }}
                />
              </div>
            </div>

            {/* Smaller scattered stars */}
            <div
              className="absolute left-[90%] top-[30%] h-0.5 w-0.5 animate-pulse rounded-full bg-white/80"
              style={{ animationDelay: '1.2s' }}
            />
            <div
              className="absolute left-[85%] top-[70%] h-0.5 w-0.5 animate-pulse rounded-full bg-white/70"
              style={{ animationDelay: '3.8s' }}
            />
            <div
              className="absolute left-[10%] top-[50%] h-0.5 w-0.5 animate-pulse rounded-full bg-white/60"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="absolute left-[40%] top-[15%] h-0.5 w-0.5 animate-pulse rounded-full bg-white/70"
              style={{ animationDelay: '5.3s' }}
            />
          </div>

          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 lg:px-8">
          <div className="grid min-h-[inherit] grid-cols-12 items-center py-20">
            <div
              className={cn(
                'col-span-12 space-y-6',
                contentAlignment[textAlign],
                alignmentClasses[textAlign],
              )}
            >
              {/* Enhanced Glassmorphism Card with glow */}
              <div className="group relative">
                {/* Glow effect */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-75 blur-xl transition-all duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${colors[0]}40, ${colors[1]}40, ${colors[2]}40)`,
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
                  <h1 className="mb-4 text-balance text-5xl font-bold text-white md:text-6xl">
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
      </div>
    </section>
  );
}
