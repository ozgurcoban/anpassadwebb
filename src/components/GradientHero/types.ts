import { type MousePosition } from '@/lib/color-utils';

export type ColorScheme =
  | 'blue-purple'
  | 'purple-pink'
  | 'pink-orange'
  | 'blue-green'
  | 'primary-gradient'
  | 'custom';

export interface GradientHeroProps {
  title: React.ReactNode;
  description?: string;
  colorScheme?: ColorScheme;
  customColors?: string[];
  particleColors?: string[];
  textAlign?: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
    variant?: 'glass' | 'glass-light' | 'rainbow' | 'ghost-hero' | 'outline-hero' | 'glass-hero' | 'secondary-solid';
  };
  className?: string;
  minHeight?: string;
  backgroundImage?: {
    src: any; // StaticImageData from next/image
    alt: string;
    priority?: boolean;
  };
  overlayOpacity?: number; // Control overlay opacity for image variants
  verticalCenter?: boolean; // Control vertical centering
  darkMode?: boolean; // Force dark background without image
  showValueProposition?: boolean; // Show value proposition below description
  children?: React.ReactNode; // Allow children to be passed
}

export interface GradientBackgroundProps {
  transformedColors: string[];
  particleColors?: string[];
  isHovering: boolean;
  mousePosition: MousePosition;
  minHeight?: string;
  children: React.ReactNode;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  containerRef: React.RefObject<HTMLDivElement | null>;
  isLowPerformance?: boolean;
  backgroundImage?: {
    src: any; // StaticImageData from next/image
    alt: string;
    priority?: boolean;
  };
  overlayOpacity?: number;
  darkMode?: boolean;
}

export interface FloatingElementsProps {
  transformedColors: string[];
  isHovering: boolean;
  mousePosition: MousePosition;
  isLowPerformance?: boolean;
}

export interface GradientContentProps {
  title: React.ReactNode;
  description?: string;
  textAlign: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
    variant?: 'glass' | 'glass-light' | 'rainbow' | 'ghost-hero' | 'outline-hero' | 'glass-hero' | 'secondary-solid';
  };
  transformedColors: string[];
  verticalCenter?: boolean;
  showValueProposition?: boolean;
  children?: React.ReactNode;
}

export const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  'blue-purple': ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--secondary))'],
  'purple-pink': ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'],
  'pink-orange': ['hsl(var(--secondary))', 'hsl(var(--destructive))', 'hsl(var(--accent))'],
  'blue-green': ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--secondary))'],
  'primary-gradient': ['#60a5fa', '#a78bfa', '#f472b6'], // blue-400, purple-400, pink-400
  custom: [],
};

export const ALIGNMENT_CLASSES = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export const CONTENT_ALIGNMENT = {
  left: 'md:col-start-1 md:col-end-7',
  center: 'md:col-start-3 md:col-end-11',
  right: 'md:col-start-7 md:col-end-13',
};

