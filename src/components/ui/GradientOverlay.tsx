import { cn } from '@/lib/utils';
import { blogStyles } from '@/lib/styles/blog';

interface GradientOverlayProps {
  variant?: 'dark' | 'light' | 'card' | 'bottom' | 'custom';
  className?: string;
  opacity?: number;
  groupHover?: boolean;
}

export function GradientOverlay({
  variant = 'dark',
  className,
  opacity,
  groupHover = false
}: GradientOverlayProps) {
  const baseClasses = 'absolute inset-0 bg-gradient-to-b';
  
  const variantClasses = {
    dark: blogStyles.gradients.overlay.dark,
    light: blogStyles.gradients.overlay.light,
    card: cn('bg-gradient-to-br', blogStyles.gradients.overlay.card),
    bottom: 'from-transparent to-black/60',
    custom: ''
  };
  
  const hoverClasses = groupHover 
    ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300' 
    : '';
  
  const opacityStyle = opacity !== undefined ? { opacity } : {};
  
  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      style={opacityStyle}
    />
  );
}