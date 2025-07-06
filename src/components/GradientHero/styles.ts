import { cn } from '@/lib/utils';

// Typography scales - Mobile First
export const TYPOGRAPHY = {
  title: {
    base: 'font-medium text-4xl md:text-6xl lg:text-7xl xl:text-8xl',
    withImage: 'text-white drop-shadow-2xl',
    default: 'text-foreground'
  },
  description: {
    base: 'font-light leading-relaxed text-base md:text-xl lg:text-2xl xl:text-3xl',
    withImage: 'text-white/90 drop-shadow-lg',
    default: 'text-muted-foreground'
  }
} as const;

// Spacing tokens
export const SPACING = {
  section: {
    mobile: 'px-4',
    desktop: 'lg:px-8'
  },
  content: {
    mobile: 'px-6',
    desktop: 'lg:px-8'
  },
  contentInner: {
    mobile: 'py-16',
    tablet: 'md:py-20',
    desktop: 'lg:py-24'
  },
  grid: {
    gap: 'gap-y-8 md:gap-y-10',
    padding: 'p-8 md:p-12'
  }
} as const;

// Layout configurations
export const LAYOUT = {
  container: 'relative mx-auto max-w-screen-2xl',
  background: {
    base: 'relative flex overflow-hidden rounded-lg',
    darkMode: 'bg-slate-950',
    default: 'bg-background/50 backdrop-blur-sm',
    border: 'border border-border/50'
  },
  content: {
    wrapper: 'relative z-10',
    container: 'relative flex items-center justify-center',
    inner: 'relative w-full max-w-7xl px-6'
  }
} as const;

// Animation classes
export const ANIMATIONS = {
  hover: {
    willChange: 'will-change-contents',
    default: 'will-change-auto'
  },
  transition: {
    transform: 'transition-transform',
    all: 'transition-all duration-300'
  }
} as const;

// Gradient styles
export const GRADIENTS = {
  overlay: {
    glass: 'bg-background/10 dark:bg-background/20',
    radial: (colors: string[]) => ({
      backgroundImage: `radial-gradient(circle at 30% 50%, ${colors[2]}40 0%, transparent 50%), 
                       radial-gradient(circle at 70% 80%, ${colors[1]}30 0%, transparent 50%)`
    }),
    linear: (colors: string[]) => ({
      backgroundImage: `linear-gradient(-45deg, 
        ${colors[0]}, 
        ${colors[1]}, 
        ${colors[2]}, 
        ${colors[1]}, 
        ${colors[0]})`
    })
  }
} as const;

// Utility functions for complex styles
export const getContainerStyles = (minHeight?: string, isHovering?: boolean) => ({
  ...(minHeight && { minHeight }),
  willChange: isHovering ? 'contents' : 'auto'
});

export const getTextStyles = (
  type: 'title' | 'description',
  isImageBackground: boolean,
  className?: string
) => {
  const baseStyles = TYPOGRAPHY[type];
  const colorClass = isImageBackground ? baseStyles.withImage : baseStyles.default;
  
  return cn(baseStyles.base, colorClass, className);
};

// Noise texture as data URI
export const NOISE_TEXTURE = {
  dataUri: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  className: 'absolute inset-0 opacity-5 mix-blend-overlay'
} as const;