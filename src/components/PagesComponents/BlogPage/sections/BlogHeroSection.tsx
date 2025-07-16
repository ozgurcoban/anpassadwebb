'use client';

import GradientHero from '@/components/GradientHero';
import { DEFAULT_PARTICLE_COLORS } from '@/components/GradientHero/constants';
import { Sparkles, TrendingUp, Users, Target } from 'lucide-react';
import { FadeInView } from '@/components/ui/FadeInView';
import { cn } from '@/lib/utils';

const BlogHeroSection = () => {
  const features = [
    { icon: Sparkles, text: 'Enkla guider' },
    { icon: TrendingUp, text: 'Växttips' },
    { icon: Target, text: 'Strategier' }
  ];

  return (
    <div className="relative">
      <GradientHero
        title="Väx din närvaro online"
        description="Enkla guider och beprövade strategier för att lyckas digitalt - utan teknisk bakgrund"
        colorScheme="blue-purple"
        particleColors={DEFAULT_PARTICLE_COLORS}
        textAlign="center"
        verticalCenter={true}
        minHeight="clamp(45vh, 50vh, 55vh)"
        overlayOpacity={0.9}
      >
        {/* Feature Pills */}
        <FadeInView delay={0.6} duration={0.8} className="mt-8 flex flex-wrap justify-center gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeInView
                key={feature.text}
                delay={0.8 + index * 0.1}
                duration={0.6}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                  "bg-white/15 backdrop-blur-sm border border-white/25",
                  "text-white text-sm font-medium",
                  "transition-all duration-300 hover:bg-white/20 hover:scale-105"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{feature.text}</span>
              </FadeInView>
            );
          })}
        </FadeInView>
      </GradientHero>
    </div>
  );
};

export default BlogHeroSection;