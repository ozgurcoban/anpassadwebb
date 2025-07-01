import { useState, useCallback, useEffect, useRef } from 'react';
import { Position } from '../types';
import { INTERACTION_THRESHOLDS, ZOOM_SETTINGS } from '../constants';
import { useImageZoomContext } from '../context/ImageZoomContext';
import { useInteractionContext } from '../context/InteractionContext';
import { updateImageTransform, getTouchDistance, calculateDistance, clampScale } from '../utils/transformUtils';

interface UseImageTouchResult {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
}

export function useImageTouch(): UseImageTouchResult {
  const {
    imageRef,
    scale,
    setScale,
    isDragging,
    setIsDragging,
    currentPositionRef,
    setPosition,
    isOpen,
    isZooming,
    setIsZooming,
  } = useImageZoomContext();
  
  const { isWithinCooldown, recordZoomAction, setLastInteractionType } = useInteractionContext();
  
  // Touch-specific state
  const [lastTapTime, setLastTapTime] = useState(0);
  const [initialPinchDistance, setInitialPinchDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const [touchStartPosition, setTouchStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, startX: 0, startY: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  
  // Tap delay timer to prevent single tap reactions during double-tap
  const tapDelayTimerRef = useRef<number | null>(null);
  
  // Reset lastTapTime after timeout to allow new double taps
  // This clears the "first tap" state if a second tap doesn't arrive in time for a double-tap
  useEffect(() => {
    if (lastTapTime > 0) {
      const timer = setTimeout(() => {
        setLastTapTime(0);
      }, INTERACTION_THRESHOLDS.doubleTapDelay + 100); // Add buffer
      return () => clearTimeout(timer);
    }
  }, [lastTapTime]);
  
  // Cleanup tap delay timer on unmount
  useEffect(() => {
    return () => {
      if (tapDelayTimerRef.current) {
        clearTimeout(tapDelayTimerRef.current);
      }
    };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isOpen || isZooming) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Record touch interaction
    setLastInteractionType('touch');
    
    // Reset drag state on every new touch
    setHasDragged(false);
    setIsDragging(false);
    
    if (e.touches.length === 2) {
      // Pinch gesture start
      const distance = getTouchDistance(e.touches);
      setInitialPinchDistance(distance);
      setInitialScale(scale);
    } else if (e.touches.length === 1) {
      // Single touch - prepare for pan or tap
      const touch = e.touches[0];
      setTouchStartPosition({ x: touch.clientX, y: touch.clientY });
      
      if (scale > 1) {
        // Don't set isDragging here - wait for actual movement
        // This prevents the transform from being removed prematurely
        setDragStart({
          x: touch.clientX,
          y: touch.clientY,
          startX: currentPositionRef.current.x,
          startY: currentPositionRef.current.y,
        });
      }
    }
  }, [scale, isOpen, isZooming, setIsDragging, currentPositionRef, setLastInteractionType]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.touches.length === 2 && initialPinchDistance > 0) {
      // Pinch zoom
      const distance = getTouchDistance(e.touches);
      const scaleFactor = distance / initialPinchDistance;
      const newScale = clampScale(
        initialScale * scaleFactor,
        ZOOM_SETTINGS.minScale,
        ZOOM_SETTINGS.maxScale
      );
      setScale(newScale);
      recordZoomAction();
      updateImageTransform(imageRef.current, currentPositionRef.current, newScale);
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan when zoomed
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;
      
      if (!hasDragged && (Math.abs(deltaX) > INTERACTION_THRESHOLDS.dragDetectionThreshold || 
          Math.abs(deltaY) > INTERACTION_THRESHOLDS.dragDetectionThreshold)) {
        setHasDragged(true);
        // Only set isDragging when actual movement is detected
        setIsDragging(true);
      }
      
      // Update position if we're dragging
      if (isDragging) {
        const newX = dragStart.startX + deltaX;
        const newY = dragStart.startY + deltaY;
        
        currentPositionRef.current = { x: newX, y: newY };
        updateImageTransform(imageRef.current, { x: newX, y: newY }, scale);
      }
    }
  }, [isOpen, initialPinchDistance, initialScale, isDragging, scale, dragStart, hasDragged, setScale, setIsDragging, imageRef, currentPositionRef, recordZoomAction]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // BLOCK ALL INTERACTIONS DURING ZOOM ANIMATION
    if (isZooming) {
      return;
    }
    
    const now = Date.now();
    
    // Early exit if within cooldown period
    if (isWithinCooldown()) {
      // Reset states but don't process any tap
      setInitialPinchDistance(0);
      setIsDragging(false);
      setHasDragged(false);
      return;
    }
    
    // Check for tap (not drag)
    if (e.changedTouches.length === 1 && !hasDragged) {
      const touch = e.changedTouches[0];
      const endPosition = { x: touch.clientX, y: touch.clientY };
      const totalDistance = calculateDistance(touchStartPosition, endPosition);
      
      if (totalDistance < INTERACTION_THRESHOLDS.clickDetectionThreshold) {
        // Check if this is a double tap
        if (now - lastTapTime < INTERACTION_THRESHOLDS.doubleTapDelay && lastTapTime > 0) {
          // Cancel any pending single tap timer
          if (tapDelayTimerRef.current) {
            clearTimeout(tapDelayTimerRef.current);
            tapDelayTimerRef.current = null;
          }
          
          // Double tap detected - implement progressive zoom with cycling
          // SET ZOOMING FLAG TO BLOCK ALL INTERACTIONS
          setIsZooming(true);
          
          // Progressive zoom levels: 1x → 2x → 3x → 4x → 1x (cycles back)
          let newScale = scale;
          
          if (scale < 2) {
            newScale = 2;
          } else if (scale < 3) {
            newScale = 3;
          } else if (scale < ZOOM_SETTINGS.maxScale) {
            newScale = ZOOM_SETTINGS.maxScale;
          } else {
            // At max zoom, cycle back to 1x
            newScale = 1;
          }
          
          // Reset position BEFORE setting scale
          setPosition({ x: 0, y: 0 });
          currentPositionRef.current = { x: 0, y: 0 };
          
          // Then set the new scale
          setScale(newScale);
          
          // Reset lastTapTime immediately after executing double-tap
          setLastTapTime(0);
          recordZoomAction();
          
          // Clear zooming flag after a short delay
          setTimeout(() => {
            setIsZooming(false);
          }, INTERACTION_THRESHOLDS.zoomAnimationDuration);
        } else {
          // First tap - set up delay timer to wait for potential double-tap
          setLastTapTime(now);
          
          // Start timer to process single tap if no second tap arrives
          tapDelayTimerRef.current = window.setTimeout(() => {
            // Timer expired - this was a single tap
            setLastTapTime(0); // Reset for next interaction
            // Currently no single tap actions when zoomed
            // Future: Could add single tap actions here if needed
          }, INTERACTION_THRESHOLDS.doubleTapDelay);
        }
      }
    }
    
    // Reset states
    setInitialPinchDistance(0);
    setIsDragging(false);
    setHasDragged(false);
    
    if (isDragging) {
      setPosition(currentPositionRef.current);
    }
  }, [isOpen, isZooming, hasDragged, touchStartPosition, lastTapTime, isWithinCooldown, scale, isDragging, setScale, setIsDragging, setPosition, currentPositionRef, recordZoomAction, setIsZooming]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}