import { useState, useCallback, useRef, useEffect } from 'react';
import { Position, DragState, UseImageDragResult } from '../types';
import { INTERACTION_THRESHOLDS } from '../constants';
import { useImageZoomContext } from '../context/ImageZoomContext';
import { useInteractionContext } from '../context/InteractionContext';
import { updateImageTransform } from '../utils/transformUtils';
import { useToolbarVisibility } from './useToolbarVisibility';
import { isTouchDevice, isTouchEvent } from '../utils/deviceUtils';

interface UseImageDragProps {
  zoomIn: () => void;
}

export function useImageDrag({ zoomIn }: UseImageDragProps): UseImageDragResult {
  const {
    imageRef,
    scale,
    isDragging,
    setIsDragging,
    setPosition,
    currentPositionRef,
    isOpen,
  } = useImageZoomContext();
  
  const { showToolbar } = useToolbarVisibility();
  const { isWithinCooldown, recordZoomAction, setLastInteractionType, isRecentTouchInteraction } = useInteractionContext();
  
  const [dragStart, setDragStart] = useState<DragState>({ x: 0, y: 0, startX: 0, startY: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [clickStartPosition, setClickStartPosition] = useState<Position>({ x: 0, y: 0 });
  
  const animationFrameRef = useRef<number | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Record mouse interaction
    setLastInteractionType('mouse');
    
    setClickStartPosition({ x: e.clientX, y: e.clientY });
    setHasDragged(false);
    
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        startX: currentPositionRef.current.x,
        startY: currentPositionRef.current.y,
      });
    }
  }, [scale, isOpen, currentPositionRef, setIsDragging, setLastInteractionType]);

  const handleMouseMoveOnContainer = useCallback(() => {
    if (!isOpen || isDragging) return;
    showToolbar();
  }, [showToolbar, isDragging, isOpen]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (isDragging) {
      setPosition(currentPositionRef.current);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      setIsDragging(false);
      setHasDragged(false);
      return;
    }
    
    const deltaX = Math.abs(e.clientX - clickStartPosition.x);
    const deltaY = Math.abs(e.clientY - clickStartPosition.y);
    const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Only trigger zoom on click if:
    // 1. Not dragged
    // 2. Within click threshold
    // 3. At 1x zoom
    // 4. Not within cooldown period
    // 5. Not a touch event
    // 6. Not on a touch device
    // 7. No recent touch interaction
    if (!hasDragged && 
        totalDistance < INTERACTION_THRESHOLDS.clickDetectionThreshold && 
        scale === 1 && 
        !isWithinCooldown() &&
        !isTouchEvent(e) &&
        !isTouchDevice() &&
        !isRecentTouchInteraction()) {
      zoomIn();
      recordZoomAction();
    }
    
    setIsDragging(false);
    setHasDragged(false);
  }, [isDragging, clickStartPosition, hasDragged, scale, zoomIn, isOpen, setPosition, setIsDragging, currentPositionRef, isWithinCooldown, recordZoomAction, isRecentTouchInteraction]);

  // Global mouse events for smooth dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
          const deltaX = e.clientX - dragStart.x;
          const deltaY = e.clientY - dragStart.y;
          
          if (!hasDragged && (Math.abs(deltaX) > INTERACTION_THRESHOLDS.dragDetectionThreshold || Math.abs(deltaY) > INTERACTION_THRESHOLDS.dragDetectionThreshold)) {
            setHasDragged(true);
          }
          
          const newX = dragStart.startX + deltaX;
          const newY = dragStart.startY + deltaY;
          
          currentPositionRef.current = { x: newX, y: newY };
          updateImageTransform(imageRef.current, { x: newX, y: newY }, scale);
        });
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }
  }, [isDragging, dragStart, scale, hasDragged, imageRef, currentPositionRef]);

  return {
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMoveOnContainer,
  };
}