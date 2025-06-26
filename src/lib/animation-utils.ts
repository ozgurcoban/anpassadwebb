import { MAGNETIC_CONFIG } from '@/components/GradientHero/animations';

/**
 * Calculates magnetic transform effect for floating elements
 * @param elementPos - Element position as percentage of container
 * @param mousePos - Mouse position as normalized coordinates (0-1)
 * @param isHovering - Whether mouse is hovering over container
 * @param containerSize - Container dimensions in pixels
 * @param magneticRadius - Radius of magnetic effect in pixels
 * @param strength - Strength of magnetic pull (0-1)
 * @returns CSS transform string
 */
export const calculateMagneticTransform = (
  elementPos: { x: number; y: number },
  mousePos: { x: number; y: number },
  isHovering: boolean,
  containerSize: { width: number; height: number },
  magneticRadius: number = MAGNETIC_CONFIG.DEFAULT_RADIUS,
  strength: number = MAGNETIC_CONFIG.DEFAULT_STRENGTH
): string => {
  if (!isHovering) return 'translate3d(0px, 0px, 0) scale(1)';
  
  const mouseX = mousePos.x * containerSize.width;
  const mouseY = mousePos.y * containerSize.height;
  
  const elementX = (elementPos.x / 100) * containerSize.width;
  const elementY = (elementPos.y / 100) * containerSize.height;
  
  const deltaX = mouseX - elementX;
  const deltaY = mouseY - elementY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance > magneticRadius) {
    return 'translate3d(0px, 0px, 0) scale(1)';
  }
  
  const factor = (magneticRadius - distance) / magneticRadius;
  const translateX = deltaX * factor * strength;
  const translateY = deltaY * factor * strength;
  const scale = 1 + (factor * MAGNETIC_CONFIG.SCALE_FACTOR);
  
  return `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
};

/**
 * Linear interpolation between two values
 * @param start - Starting value
 * @param end - Ending value
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};