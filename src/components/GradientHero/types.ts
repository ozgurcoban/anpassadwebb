import { type MousePosition } from '@/lib/color-utils';

export type ColorScheme =
  | 'blue-purple'
  | 'purple-pink'
  | 'pink-orange'
  | 'blue-green'
  | 'custom';

export interface GradientHeroProps {
  title: string;
  description?: string;
  colorScheme?: ColorScheme;
  customColors?: string[];
  particleColors?: string[];
  textAlign?: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
  };
  className?: string;
  minHeight?: string;
}

export interface GradientBackgroundProps {
  transformedColors: string[];
  particleColors?: string[];
  isHovering: boolean;
  mousePosition: MousePosition;
  minHeight: string;
  children: React.ReactNode;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  containerRef: React.RefObject<HTMLDivElement | null>;
  isLowPerformance?: boolean;
}

export interface FloatingElementsProps {
  transformedColors: string[];
  isHovering: boolean;
  mousePosition: MousePosition;
  isLowPerformance?: boolean;
}

export interface GradientContentProps {
  title: string;
  description?: string;
  textAlign: 'left' | 'center' | 'right';
  secondaryCTA?: {
    text: string;
    href: string;
  };
  transformedColors: string[];
}

export const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  'blue-purple': ['#3b82f6', '#8b5cf6', '#6366f1'],
  'purple-pink': ['#8b5cf6', '#ec4899', '#a855f7'],
  'pink-orange': ['#ec4899', '#f97316', '#f472b6'],
  'blue-green': ['#3b82f6', '#10b981', '#06b6d4'],
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

// Animation delays and durations
export const ANIMATION_CONFIG = {
  BLOB_DELAYS: ['0s', '1.5s', '3.5s', '5s'],
  CODE_SNIPPET_DELAYS: ['0.5s', '1.8s', '3.3s'],
  STAR_DELAYS: ['0.3s', '1.4s', '2.7s', '4.1s'],
  SCATTERED_STAR_DELAYS: ['1.2s', '3.8s', '0.2s', '5.3s'],
};