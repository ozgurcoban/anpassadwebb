// Opacity values
export const OPACITY = {
  GLASS_OVERLAY: 0.05,
  GRADIENT_BACKGROUND: 0.1,
  DOT_PATTERN: {
    IMAGE: 0.25,
    DEFAULT: 0.2,
  },
  GRADIENT_SHAPES: 0.05,
  NOISE_TEXTURE: 0.05,
} as const;

// Blur values
export const BLUR_VALUES = {
  SHAPE_BASE: 40,
  SHAPE_INCREMENT: 5,
  DOT_SOFT: 1,
  DOT_REGULAR: 0.5,
} as const;

// Animation configurations
export const GRADIENT_ANIMATION = {
  BACKGROUND_SIZE: '300% 300%',
  BACKGROUND_POSITION: '0% 50%',
} as const;

// Default colors for image backgrounds
export const IMAGE_BACKGROUND_COLORS = {
  WHITE: '#ffffff',
  YELLOW: '#fbbf24',
  BLUE: '#60a5fa',
} as const;

// Text shadow values for image backgrounds
export const TEXT_SHADOWS = {
  TITLE: '2px 2px 8px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(147,51,234,0.4)',
  DESCRIPTION: '0 2px 25px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7), 0 4px 6px rgba(0,0,0,0.95)',
} as const;