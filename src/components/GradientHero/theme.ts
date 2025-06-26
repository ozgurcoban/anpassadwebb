// Theme variables and CSS custom properties
export const THEME_VARS = {
  // Color tokens
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    border: 'hsl(var(--border))',
    destructive: 'hsl(var(--destructive))',
  },
  
  // Opacity levels
  opacity: {
    subtle: '0.05',
    light: '0.1',
    medium: '0.2',
    strong: '0.3',
    visible: '0.5',
    solid: '0.8',
    full: '1',
  },
  
  // Blur effects
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
  
  // Shadow presets
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // Breakpoints
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// CSS variable generator
export const getCSSVariables = () => {
  const variables: Record<string, string> = {};
  
  // Generate color variables
  Object.entries(THEME_VARS.colors).forEach(([key, value]) => {
    variables[`--gradient-${key}`] = value;
  });
  
  // Generate opacity variables
  Object.entries(THEME_VARS.opacity).forEach(([key, value]) => {
    variables[`--opacity-${key}`] = value;
  });
  
  // Generate blur variables
  Object.entries(THEME_VARS.blur).forEach(([key, value]) => {
    variables[`--blur-${key}`] = value;
  });
  
  return variables;
};

// Theme-aware style generators
export const getThemedGradient = (colors: string[], isDark: boolean = false) => {
  const opacity = isDark ? '0.95' : '0.1';
  return `linear-gradient(-45deg, ${colors.map(c => `${c}${opacity}`).join(', ')})`;
};

export const getThemedShadow = (level: keyof typeof THEME_VARS.shadows, color?: string) => {
  const baseShadow = THEME_VARS.shadows[level];
  if (!color) return baseShadow;
  
  // Replace the color in the shadow
  return baseShadow.replace(/rgb\(0 0 0 \/ [\d.]+\)/g, color);
};

export const getThemedBlur = (level: keyof typeof THEME_VARS.blur) => {
  return `blur(${THEME_VARS.blur[level]})`;
};

// Responsive style helpers
export const getResponsiveValue = <T extends Record<string, any>>(
  values: T,
  screen: keyof typeof THEME_VARS.screens
): T[keyof T] | undefined => {
  return values[screen];
};

// Export theme configuration for use in Tailwind
export const gradientHeroTheme = {
  extend: {
    colors: {
      'gradient-primary': 'var(--gradient-primary)',
      'gradient-secondary': 'var(--gradient-secondary)',
      'gradient-accent': 'var(--gradient-accent)',
    },
    opacity: THEME_VARS.opacity,
    blur: THEME_VARS.blur,
    boxShadow: THEME_VARS.shadows,
  },
};