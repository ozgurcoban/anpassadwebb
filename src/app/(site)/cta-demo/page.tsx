'use client';

import { useState } from 'react';
import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';

const variants = [
  { name: 'Rainbow (Nuvarande)', value: 'rainbow' as const },
  { name: 'Ghost', value: 'ghost-hero' as const },
  { name: 'Outline', value: 'outline-hero' as const },
  { name: 'Glass', value: 'glass-hero' as const },
  { name: 'Solid Secondary', value: 'secondary-solid' as const },
];

export default function CTADemoPage() {
  const [selectedVariant, setSelectedVariant] = useState<typeof variants[0]['value']>('rainbow');

  return (
    <div className="min-h-screen">
      {/* Kontrollpanel */}
      <div className="fixed top-20 right-6 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-xs">
        <h3 className="text-lg font-semibold mb-4">Välj CTA-variant</h3>
        <div className="space-y-2">
          {variants.map((variant) => (
            <button
              key={variant.value}
              onClick={() => setSelectedVariant(variant.value)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                selectedVariant === variant.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero med vald variant */}
      <GradientHero
        title={
          <>
            Test av{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text !text-transparent [text-shadow:none]">
              CTA-varianter
            </span>
          </>
        }
        description="Jämför olika stilar för sekundära CTA-knappar i hero-sektionen"
        colorScheme="blue-purple"
        particleColors={DEFAULT_PARTICLE_COLORS}
        textAlign="left"
        minHeight="100vh"
        secondaryCTA={{
          text: 'Se vårt arbete',
          href: '#arbete',
          variant: selectedVariant,
        }}
        verticalCenter={true}
      />

      {/* Förhandsvisning av alla varianter */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Alla CTA-varianter</h2>
          
          {/* På ljus bakgrund */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6">På ljus bakgrund</h3>
            <div className="bg-gray-100 p-8 rounded-lg flex flex-wrap gap-4 items-center justify-center">
              {variants.map((variant) => (
                <button
                  key={variant.value}
                  className={`px-8 py-3 rounded-md font-medium transition-all ${getButtonClasses(variant.value)}`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* På mörk/gradient bakgrund */}
          <div>
            <h3 className="text-xl font-semibold mb-6">På gradient bakgrund</h3>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-lg flex flex-wrap gap-4 items-center justify-center">
              {variants.map((variant) => (
                <button
                  key={variant.value}
                  className={`px-8 py-3 rounded-md font-medium transition-all ${getButtonClasses(variant.value)}`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hjälpfunktion för att få rätt klasser baserat på variant
function getButtonClasses(variant: typeof variants[0]['value']) {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium';
  
  switch (variant) {
    case 'rainbow':
      return `${baseClasses} relative z-10 overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white before:absolute before:inset-0 before:-z-20 before:animate-rainbow before:rounded-md before:bg-[linear-gradient(90deg,theme('colors.blue.500'),theme('colors.purple.500'),theme('colors.pink.500'),theme('colors.purple.500'),theme('colors.blue.500'),theme('colors.cyan.500'),theme('colors.blue.500'))] before:bg-[length:200%] before:p-[2px] after:absolute after:inset-[2px] after:-z-10 after:rounded-[calc(theme(borderRadius.md)-2px)] after:bg-white dark:after:bg-gray-900 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:before:blur-[2px]`;
    
    case 'ghost-hero':
      return `${baseClasses} border-2 border-white/80 bg-transparent text-white hover:bg-white/10 hover:border-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]`;
    
    case 'outline-hero':
      return `${baseClasses} border-2 border-primary bg-white text-primary hover:bg-primary/5 hover:border-primary/80 dark:border-primary dark:bg-transparent dark:text-white dark:hover:bg-primary/10`;
    
    case 'glass-hero':
      return `${baseClasses} relative bg-white/10 text-white backdrop-blur-md border border-white/20 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-r before:from-primary/20 before:via-secondary/20 before:to-accent/20 hover:bg-white/20 hover:border-white/30 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]`;
    
    case 'secondary-solid':
      return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/25 active:scale-95`;
    
    default:
      return baseClasses;
  }
}