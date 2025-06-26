// Opacity values
export const OPACITY = {
  GLASS_OVERLAY: 0.08,
  GRADIENT_BACKGROUND: 0.35,
  DOT_PATTERN: {
    IMAGE: 0.25,
    DEFAULT: 0.3,
  },
  GRADIENT_SHAPES: 0.2,
  NOISE_TEXTURE: 0.05,
} as const;

// Blur values
export const BLUR_VALUES = {
  SHAPE_BASE: 40,
  SHAPE_INCREMENT: 5,
  DOT_SOFT: 1,
  DOT_REGULAR: 0.5,
} as const;

// Animation timings
export const ANIMATION_TIMINGS = {
  DURATION: {
    DEFAULT: '300ms',
    SLOW: '500ms',
    GRADIENT: '20s',
  },
  EASING: {
    DEFAULT: 'ease-in-out',
    SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Gradient animation settings
export const GRADIENT_ANIMATION = {
  BACKGROUND_SIZE: '300% 300%',
  BACKGROUND_POSITION: '0% 50%',
} as const;

// Default colors for image backgrounds
export const IMAGE_BACKGROUND_COLORS = ['hsl(var(--background))', 'hsl(var(--accent))', 'hsl(var(--primary))'] as const;

// Text shadow configurations for better readability on images
export const TEXT_SHADOWS = {
  TITLE: {
    x: 2,
    y: 2,
    blur: 8,
    color: 'rgba(0,0,0,0.95)',
    spread: [
      { x: 0, y: 0, blur: 40, color: 'rgba(0,0,0,0.8)' },
      { x: 0, y: 0, blur: 80, color: 'rgba(0,0,0,0.4)' }
    ]
  },
  DESCRIPTION: {
    x: 0,
    y: 2,
    blur: 25,
    color: 'rgba(0,0,0,0.9)',
    spread: [
      { x: 0, y: 0, blur: 50, color: 'rgba(0,0,0,0.7)' },
      { x: 0, y: 4, blur: 6, color: 'rgba(0,0,0,0.95)' }
    ]
  }
} as const;

// Helper function to generate text shadow string
export const getTextShadow = (config: typeof TEXT_SHADOWS.TITLE | typeof TEXT_SHADOWS.DESCRIPTION): string => {
  const main = `${config.x}px ${config.y}px ${config.blur}px ${config.color}`;
  const spread = config.spread.map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.color}`).join(', ');
  return `${main}, ${spread}`;
};

// Default particle colors used across all hero sections
export const DEFAULT_PARTICLE_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))'];