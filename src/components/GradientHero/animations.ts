// Animation keyframes
export const KEYFRAMES = {
  gradient: `
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-20px) translateX(10px); }
      66% { transform: translateY(10px) translateX(-10px); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  ripple: `
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
  `,
} as const;

// Animation classes for Tailwind
export const ANIMATION_CLASSES = {
  gradient: 'animate-[gradientShift_20s_ease-in-out_infinite]',
  float: 'animate-[float_6s_ease-in-out_infinite]',
  pulse: 'animate-[pulse_4s_ease-in-out_infinite]',
  fadeIn: 'animate-[fadeIn_0.6s_ease-out_forwards]',
  ripple: 'animate-[ripple_1s_ease-out_forwards]',
} as const;

// Animation configurations for interactive elements
export const INTERACTIVE_ANIMATIONS = {
  cursor: {
    scale: {
      default: 1,
      hover: 1.2,
      click: 0.8,
    },
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  particle: {
    duration: '20s',
    delay: (index: number) => `${index * 0.5}s`,
    path: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  magnetic: {
    strength: 0.3,
    radius: 150,
    transition: 'transform 0.2s ease-out',
  },
} as const;

// Helper function to generate animation style
export const getAnimationStyle = (
  type: keyof typeof ANIMATION_CLASSES,
  delay?: string,
  duration?: string
) => {
  const baseAnimation = ANIMATION_CLASSES[type];
  const styles: Record<string, string> = {};
  
  if (delay) styles.animationDelay = delay;
  if (duration) styles.animationDuration = duration;
  
  return {
    className: baseAnimation,
    style: styles,
  };
};

// CSS-in-JS animation styles
export const ANIMATION_STYLES = {
  gradientBackground: {
    background: 'linear-gradient(-45deg, var(--color-1), var(--color-2), var(--color-3), var(--color-2), var(--color-1))',
    backgroundSize: '300% 300%',
    animation: 'gradientShift 20s ease-in-out infinite',
  },
  floatingElement: (delay: string = '0s') => ({
    animation: `float 6s ease-in-out ${delay} infinite`,
  }),
  magneticElement: (x: number, y: number) => ({
    transform: `translate(${x}px, ${y}px)`,
    transition: INTERACTIVE_ANIMATIONS.magnetic.transition,
  }),
} as const;

// Animation delays and durations
export const ANIMATION_CONFIG = {
  BLOB_DELAYS: ['0s', '1.5s', '3.5s', '5s'],
  CODE_SNIPPET_DELAYS: ['0.5s', '1.8s', '3.3s'],
  STAR_DELAYS: ['0.3s', '1.4s', '2.7s', '4.1s'],
  SCATTERED_STAR_DELAYS: ['1.2s', '3.8s', '0.2s', '5.3s'],
};

// Magnetic effect configuration
export const MAGNETIC_CONFIG = {
  DEFAULT_RADIUS: 150,
  CODE_SNIPPET_RADIUS: 120,
  SYMBOL_RADIUS: 100,
  DEFAULT_STRENGTH: 0.3,
  CODE_SNIPPET_STRENGTH: 0.2,
  SYMBOL_STRENGTH: 0.25,
  SCALE_FACTOR: 0.1,
};

// Floating elements configuration
export const FLOATING_CONFIG = {
  CONTAINER_SIZE: { width: 1200, height: 800 }, // Estimated container size
  BLOB_TRANSLATE_MULTIPLIERS: [
    { x: 60, y: 60 },
    { x: -50, y: 80 },
    { x: 40, y: -50 },
  ],
  BLOB_SCALE_MULTIPLIERS: [0.15, 0.1, 0.1],
  BLOB_MAGNETIC_STRENGTHS: [0.1, 0.06, 0.08],
};