'use client';

import Image from 'next/image';
import heroImage from '../../public/images/hero.webp';
import { ContactButton } from './ContactButton';
import Text from './ui/Text';
import { useInteractiveGradient } from '@/lib/hooks/useInteractiveGradient';
import { InteractiveEffects } from './GradientHero/InteractiveEffects';

const Hero = () => {
  // Configure colors to match hero theme (purple/pink/blue)
  const heroColors = ['#8B5CF6', '#EC4899', '#3B82F6']; // purple, pink, blue
  
  const {
    containerRef,
    mousePosition,
    isHovering,
    transformedColors,
    handlers,
  } = useInteractiveGradient({ colors: heroColors });

  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 lg:px-8">
      <div 
        ref={containerRef}
        className="relative grid min-h-[80vh] overflow-hidden pb-16 pt-20 md:pb-20 md:pt-24 lg:rounded-2xl"
        {...handlers}
      >
        {/* Background image */}
        <Image
          src={heroImage}
          alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
          fill
          priority
          placeholder="blur"
          className="object-cover object-center"
        />
        
        {/* Modern Dot Pattern */}
        <div className="absolute inset-0 opacity-40">
          <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Gradient definitions using light colors for dark background */}
              <radialGradient id="hero-dot-gradient-1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hero-dot-gradient-2">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hero-dot-gradient-3">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </radialGradient>
              
              {/* Blur filters */}
              <filter id="hero-dot-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
              </filter>
              <filter id="hero-dot-blur-soft">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              
              <pattern
                id="hero-modern-dots"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                {/* Large focal dots with blur */}
                <circle cx="20" cy="20" r="3" fill="url(#hero-dot-gradient-1)" filter="url(#hero-dot-blur-soft)" opacity="0.9" />
                <circle cx="80" cy="50" r="3.5" fill="url(#hero-dot-gradient-2)" filter="url(#hero-dot-blur-soft)" opacity="0.8" />
                <circle cx="50" cy="85" r="3" fill="url(#hero-dot-gradient-3)" filter="url(#hero-dot-blur-soft)" opacity="0.9" />
                
                {/* Medium accent dots */}
                <circle cx="35" cy="10" r="2" fill="url(#hero-dot-gradient-2)" filter="url(#hero-dot-blur)" opacity="0.7" />
                <circle cx="65" cy="25" r="2" fill="url(#hero-dot-gradient-3)" filter="url(#hero-dot-blur)" opacity="0.6" />
                <circle cx="10" cy="45" r="2" fill="url(#hero-dot-gradient-1)" filter="url(#hero-dot-blur)" opacity="0.7" />
                <circle cx="90" cy="70" r="2" fill="url(#hero-dot-gradient-2)" filter="url(#hero-dot-blur)" opacity="0.6" />
                <circle cx="25" cy="75" r="2" fill="url(#hero-dot-gradient-3)" filter="url(#hero-dot-blur)" opacity="0.7" />
                
                {/* Small atmospheric dots */}
                <circle cx="5" cy="30" r="1.2" fill="url(#hero-dot-gradient-3)" opacity="0.5" />
                <circle cx="45" cy="5" r="1.2" fill="url(#hero-dot-gradient-1)" opacity="0.5" />
                <circle cx="70" cy="45" r="1.2" fill="url(#hero-dot-gradient-2)" opacity="0.4" />
                <circle cx="15" cy="65" r="1.2" fill="url(#hero-dot-gradient-1)" opacity="0.5" />
                <circle cx="95" cy="15" r="1.2" fill="url(#hero-dot-gradient-3)" opacity="0.4" />
                <circle cx="55" cy="60" r="1.2" fill="url(#hero-dot-gradient-2)" opacity="0.5" />
                <circle cx="85" cy="90" r="1.2" fill="url(#hero-dot-gradient-1)" opacity="0.4" />
                
                {/* Tiny detail dots */}
                <circle cx="30" cy="50" r="0.8" fill="url(#hero-dot-gradient-2)" opacity="0.4" />
                <circle cx="60" cy="40" r="0.8" fill="url(#hero-dot-gradient-3)" opacity="0.4" />
                <circle cx="75" cy="75" r="0.8" fill="url(#hero-dot-gradient-1)" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-modern-dots)" />
          </svg>
        </div>

        {/* Purple/Pink Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Interactive Effects */}
        <InteractiveEffects
          mousePosition={mousePosition}
          isHovering={isHovering}
          transformedColors={transformedColors}
          containerRef={containerRef}
        />

        {/* Content */}
        <div className="relative z-20 flex items-center px-6">
          <div className="grid max-w-4xl gap-y-8 p-8 text-white md:gap-y-10 md:p-12">
            <div className="space-y-6">
              <h1
                className="font-quicksand text-5xl font-medium text-white md:text-6xl lg:text-7xl xl:text-8xl"
                style={{
                  filter:
                    'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(147,51,234,0.3))',
                }}
              >
                Hemsidor som{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  funkar
                </span>{' '}
                på riktigt
              </h1>

              <Text
                as="p"
                className="max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl lg:text-3xl"
                style={{
                  textShadow:
                    '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 4px rgba(0,0,0,0.9)',
                }}
              >
                Vi skapar skräddarsydda hemsidor som laddar snabbt, rankar på
                Google och hjälper småföretag att växa online
              </Text>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <ContactButton className="w-full text-primary md:w-fit" />
              <button
                className="relative flex items-center gap-2 rounded-md bg-black/30 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:p-[1px] before:opacity-70 hover:bg-black/40 hover:text-white hover:before:opacity-100"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
              >
                Se vårt arbete
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
