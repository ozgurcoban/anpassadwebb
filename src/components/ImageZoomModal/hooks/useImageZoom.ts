import { useState, useCallback, useRef } from 'react';
import { Position, UseImageZoomResult } from '../types';
import { ZOOM_SETTINGS, INTERACTION_THRESHOLDS } from '../constants';

interface UseImageZoomProps {
  imageRef: React.RefObject<HTMLImageElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  showToolbar: () => void;
  isDragging: boolean;
}

export function useImageZoom({
  imageRef,
  containerRef,
  showToolbar,
  isDragging,
}: UseImageZoomProps): UseImageZoomResult {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });

  const updateImageTransform = useCallback((x: number, y: number, currentScale: number) => {
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${currentScale}) translate(${x / currentScale}px, ${y / currentScale}px)`;
    }
  }, [imageRef]);

  const fitToScreen = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const img = imageRef.current;
    
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    
    if (naturalWidth === 0 || naturalHeight === 0) return;
    
    const scaleX = containerRect.width / naturalWidth;
    const scaleY = containerRect.height / naturalHeight;
    const newScale = Math.min(scaleX, scaleY, ZOOM_SETTINGS.maxScale);
    
    setScale(newScale);
    setPosition({ x: 0, y: 0 });
    currentPositionRef.current = { x: 0, y: 0 };
    
    if (!isDragging) {
      updateImageTransform(0, 0, newScale);
    }
    showToolbar();
  }, [imageRef, containerRef, isDragging, updateImageTransform, showToolbar]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < INTERACTION_THRESHOLDS.minWheelDelta) {
      return;
    }
    
    const delta = e.deltaY > 0 ? -ZOOM_SETTINGS.scaleStep : ZOOM_SETTINGS.scaleStep;
    const newScale = Math.min(Math.max(scale + delta, ZOOM_SETTINGS.minScale), ZOOM_SETTINGS.maxScale);
    setScale(newScale);
    
    if (!isDragging) {
      updateImageTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
    }
    showToolbar();
  }, [scale, isDragging, updateImageTransform, showToolbar]);

  const zoomIn = useCallback(() => {
    setScale(prev => {
      const newScale = Math.min(prev + ZOOM_SETTINGS.scaleStep, ZOOM_SETTINGS.maxScale);
      if (!isDragging) {
        updateImageTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
      }
      return newScale;
    });
    showToolbar();
  }, [isDragging, updateImageTransform, showToolbar]);

  const zoomOut = useCallback(() => {
    setScale(prev => {
      const newScale = Math.max(prev - ZOOM_SETTINGS.scaleStep, ZOOM_SETTINGS.minScale);
      if (!isDragging) {
        updateImageTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
      }
      return newScale;
    });
    showToolbar();
  }, [isDragging, updateImageTransform, showToolbar]);

  return {
    scale,
    position,
    zoomIn,
    zoomOut,
    fitToScreen,
    handleWheel,
    updateImageTransform,
  };
}