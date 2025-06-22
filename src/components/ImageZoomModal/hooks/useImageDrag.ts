import { useState, useCallback, useRef, useEffect } from 'react';
import { Position, DragState, UseImageDragResult } from '../types';
import { INTERACTION_THRESHOLDS } from '../constants';

interface UseImageDragProps {
  scale: number;
  isOpen: boolean;
  showToolbar: () => void;
  updateImageTransform: (x: number, y: number, currentScale: number) => void;
  zoomIn: () => void;
}

export function useImageDrag({
  scale,
  isOpen,
  showToolbar,
  updateImageTransform,
  zoomIn,
}: UseImageDragProps): UseImageDragResult & { setPosition: (position: Position) => void } {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<DragState>({ x: 0, y: 0, startX: 0, startY: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [clickStartPosition, setClickStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
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
  }, [scale, isOpen]);

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
    
    if (!hasDragged && totalDistance < INTERACTION_THRESHOLDS.clickDetectionThreshold && scale === 1) {
      zoomIn();
    }
    
    setIsDragging(false);
    setHasDragged(false);
  }, [isDragging, clickStartPosition, hasDragged, scale, zoomIn, isOpen, setPosition]);

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
          updateImageTransform(newX, newY, scale);
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
  }, [isDragging, dragStart, scale, updateImageTransform, hasDragged]);

  return {
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMoveOnContainer,
    setPosition,
  };
}