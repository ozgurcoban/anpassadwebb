import { Position } from '../types';

export const updateImageTransform = (
  imageElement: HTMLImageElement | null,
  position: Position,
  scale: number
): void => {
  if (!imageElement) return;
  
  // Note: When using scale() translate(), the translate values are applied
  // in the already-scaled coordinate space. We divide by sqrt(scale) to get
  // a subtle acceleration effect - the image moves slightly faster than finger
  const scaleFactor = Math.sqrt(scale);
  imageElement.style.transform = `scale(${scale}) translate(${position.x / scaleFactor}px, ${position.y / scaleFactor}px)`;
};

export const calculateFitToScreenScale = (
  imageElement: HTMLImageElement | null,
  containerElement: HTMLDivElement | null,
  maxScale: number
): number => {
  if (!imageElement || !containerElement) return 1;
  
  const containerRect = containerElement.getBoundingClientRect();
  const naturalWidth = imageElement.naturalWidth;
  const naturalHeight = imageElement.naturalHeight;
  
  if (naturalWidth === 0 || naturalHeight === 0) return 1;
  
  const scaleX = containerRect.width / naturalWidth;
  const scaleY = containerRect.height / naturalHeight;
  
  return Math.min(Math.max(scaleX, scaleY, 1), maxScale);
};

export const getTouchDistance = (touches: React.TouchList): number => {
  if (touches.length < 2) return 0;
  
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  
  return Math.sqrt(dx * dx + dy * dy);
};

export const calculateDistance = (point1: Position, point2: Position): number => {
  const deltaX = point2.x - point1.x;
  const deltaY = point2.y - point1.y;
  
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

export const clampScale = (scale: number, minScale: number, maxScale: number): number => {
  return Math.min(Math.max(scale, minScale), maxScale);
};