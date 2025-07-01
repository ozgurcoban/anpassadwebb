import { useCallback } from 'react';
import { UseImageZoomResult } from '../types';
import { ZOOM_SETTINGS, INTERACTION_THRESHOLDS } from '../constants';
import { useImageZoomContext } from '../context/ImageZoomContext';
import { useInteractionContext } from '../context/InteractionContext';
import { updateImageTransform, calculateFitToScreenScale, clampScale } from '../utils/transformUtils';
import { useToolbarVisibility } from './useToolbarVisibility';

export function useImageZoom(): UseImageZoomResult {
  const {
    imageRef,
    containerRef,
    scale,
    setScale,
    position,
    setPosition,
    currentPositionRef,
    isDragging,
  } = useImageZoomContext();
  
  const { showToolbar } = useToolbarVisibility();
  const { recordZoomAction } = useInteractionContext();

  const updateTransform = useCallback((x: number, y: number, currentScale: number) => {
    updateImageTransform(imageRef.current, { x, y }, currentScale);
  }, [imageRef]);

  const fitToScreen = useCallback(() => {
    const newScale = calculateFitToScreenScale(
      imageRef.current,
      containerRef.current,
      ZOOM_SETTINGS.maxScale
    );
    
    setScale(newScale);
    setPosition({ x: 0, y: 0 });
    currentPositionRef.current = { x: 0, y: 0 };
    
    if (!isDragging) {
      updateTransform(0, 0, newScale);
    }
    showToolbar();
  }, [imageRef, containerRef, isDragging, updateTransform, showToolbar, setScale, setPosition, currentPositionRef]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < INTERACTION_THRESHOLDS.minWheelDelta) {
      return;
    }
    
    const delta = e.deltaY > 0 ? -ZOOM_SETTINGS.scaleStep : ZOOM_SETTINGS.scaleStep;
    const newScale = clampScale(scale + delta, ZOOM_SETTINGS.minScale, ZOOM_SETTINGS.maxScale);
    setScale(newScale);
    recordZoomAction();
    
    if (!isDragging) {
      updateTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
    }
    showToolbar();
  }, [scale, isDragging, updateTransform, showToolbar, setScale, currentPositionRef, recordZoomAction]);

  const zoomIn = useCallback(() => {
    setScale(prev => {
      const newScale = clampScale(prev + ZOOM_SETTINGS.scaleStep, ZOOM_SETTINGS.minScale, ZOOM_SETTINGS.maxScale);
      if (!isDragging) {
        updateTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
      }
      return newScale;
    });
    showToolbar();
  }, [isDragging, updateTransform, showToolbar, setScale, currentPositionRef]);

  const zoomOut = useCallback(() => {
    setScale(prev => {
      const newScale = clampScale(prev - ZOOM_SETTINGS.scaleStep, ZOOM_SETTINGS.minScale, ZOOM_SETTINGS.maxScale);
      if (!isDragging) {
        updateTransform(currentPositionRef.current.x, currentPositionRef.current.y, newScale);
      }
      return newScale;
    });
    showToolbar();
  }, [isDragging, updateTransform, showToolbar, setScale, currentPositionRef]);

  return {
    scale,
    position,
    zoomIn,
    zoomOut,
    fitToScreen,
    handleWheel,
    updateImageTransform: updateTransform,
  };
}