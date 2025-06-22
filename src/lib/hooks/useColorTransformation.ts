import { useMemo } from 'react';
import { transformColorsWithMouse, type MousePosition } from '@/lib/color-utils';

export interface UseColorTransformationProps {
  colors: string[];
  mousePosition: MousePosition;
  isHovering: boolean;
}

export function useColorTransformation({ 
  colors, 
  mousePosition, 
  isHovering 
}: UseColorTransformationProps) {
  // Memoized transformed colors to prevent unnecessary recalculations
  const transformedColors = useMemo(() => 
    transformColorsWithMouse(colors, mousePosition, isHovering),
    [colors, mousePosition, isHovering]
  );

  return { transformedColors };
}