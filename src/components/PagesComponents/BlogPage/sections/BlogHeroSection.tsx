import React from 'react';
import { cn } from '@/lib/utils';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { GradientBackground } from '@/components/GradientHero/GradientBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BlogHeroSection = () => {
  // Använd samma färger som logo för konsistens
  const blogColors = ['#3b82f6', '#8b5cf6', '#ec4899'];
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
                className="font-quicksand text-5xl font-medium text-gray-900 dark:text-white md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Insikter &{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  inspiration
                </span>
              </h1>

              <p
                className="max-w-2xl mx-auto text-xl font-light leading-relaxed text-gray-700 dark:text-gray-200 md:text-2xl lg:text-3xl"
              >
                Här delar vi med oss av nyheter, insikter och tips om webbdesign, SEO och digital marknadsföring
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
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