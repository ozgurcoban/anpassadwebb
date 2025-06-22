import { useState, useCallback, useRef, useEffect } from 'react';
import { Position, DragState } from '../types';
import { ZOOM_SETTINGS, INTERACTION_THRESHOLDS, ANIMATION_DURATIONS } from '../constants';

interface UseImageZoomModalProps {
  imageRef: React.RefObject<HTMLImageElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

export function useImageZoomModal({
  imageRef,
  containerRef,
  isOpen,
  onClose,
}: UseImageZoomModalProps) {
  // State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<DragState>({ x: 0, y: 0, startX: 0, startY: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [clickStartPosition, setClickStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Refs
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const toolbarTimeoutRef = useRef<number | null>(null);

  // Toolbar visibility
  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
    
    if (toolbarTimeoutRef.current) {
      clearTimeout(toolbarTimeoutRef.current);
    }
    
    toolbarTimeoutRef.current = window.setTimeout(() => {
      setIsToolbarVisible(false);
    }, ANIMATION_DURATIONS.toolbarHideDelay);
  }, []);

  // Image transform
  const updateImageTransform = useCallback((x: number, y: number, currentScale: number) => {
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${currentScale}) translate(${x / currentScale}px, ${y / currentScale}px)`;
    }
  }, [imageRef]);

  // Fit to screen
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
    
    updateImageTransform(0, 0, newScale);
    showToolbar();
  }, [imageRef, containerRef, updateImageTransform, showToolbar]);

  // Zoom functions
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

  // Wheel handler
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

  // Mouse handlers
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
  }, [isDragging, clickStartPosition, hasDragged, scale, zoomIn, isOpen]);

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
      case 'r':
      case 'R':
      case 'f':
      case 'F':
        e.preventDefault();
        fitToScreen();
        break;
      case 'Escape':
        onClose();
        break;
    }
  }, [isOpen, zoomIn, zoomOut, fitToScreen, onClose]);

  // Effects - Initialize only once when modal opens
  useEffect(() => {
    if (isOpen && !isInitialized) {
      showToolbar();
      
      const timer = setTimeout(() => {
        fitToScreen();
        setIsInitialized(true);
      }, ANIMATION_DURATIONS.imageLoadDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isInitialized, showToolbar, fitToScreen]);

  // Reset initialization when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      currentPositionRef.current = { x: 0, y: 0 };
      setIsDragging(false);
    }
  }, [isOpen]);

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

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return {
    // State
    scale,
    position,
    isDragging,
    isToolbarVisible,
    
    // Functions
    zoomIn,
    zoomOut,
    fitToScreen,
    showToolbar,
    
    // Event handlers
    handleWheel,
    handleMouseDown,
    handleMouseUp,
    handleMouseMoveOnContainer,
  };
}