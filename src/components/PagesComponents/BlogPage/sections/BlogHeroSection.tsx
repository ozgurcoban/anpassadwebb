import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientBackground } from '@/components/GradientHero/GradientBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BlogHeroSection = () => {
  // Unik färgkombination för bloggen: Teal-Cyan-Blue
  const blogColors = ['#14b8a6', '#06b6d4', '#3b82f6'];
  // Kontrastfärger för partiklar: Rosa-Orange-Gul för att sticka ut
  const particleColors = ['#f472b6', '#fb7185', '#fbbf24'];
  
  const {
    containerRef,
    mousePosition,
    isHovering,
    clickPosition,
    transformedColors,
    isLowPerformance,
    handlers,
  } = useInteractiveGradient({ colors: blogColors });

  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
      <GradientBackground
        transformedColors={transformedColors}
        particleColors={particleColors}
        isHovering={isHovering}
        mousePosition={mousePosition}
        minHeight="50vh"
        handlers={handlers}
        containerRef={containerRef}
        isLowPerformance={isLowPerformance}
      >
        {/* Centrerat content */}
        <div className="relative z-10 flex items-center justify-center min-h-[inherit] px-6">
          <div className="text-center max-w-4xl space-y-8">
            <div className="space-y-6">
              <h1
                className="font-quicksand text-5xl font-medium text-white md:text-6xl lg:text-7xl xl:text-8xl"
                style={{
                  filter:
                    'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(147,51,234,0.3))',
                }}
              >
                Insikter &{' '}
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  inspiration
                </span>
              </h1>

              <p
                className="max-w-2xl mx-auto text-xl font-light leading-relaxed text-white/90 md:text-2xl lg:text-3xl"
                style={{
                  textShadow:
                    '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)',
                }}
              >
                Här delar vi med oss av nyheter, insikter och tips om webbdesign, SEO och digital marknadsföring
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="relative bg-black/30 text-white backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-teal-500 before:via-cyan-500 before:to-blue-500 before:p-[1px] before:opacity-70 hover:bg-black/40 hover:before:opacity-100"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
              >
                <Link href="/tag">Utforska kategorier</Link>
              </Button>
            </div>
          </div>
        </div>
      </GradientBackground>
    </section>
  );
};

export default BlogHeroSection;