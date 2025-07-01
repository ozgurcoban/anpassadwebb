import { useEffect, useCallback } from 'react';
import { useImageZoomContext } from '../context/ImageZoomContext';
import { useImageZoom } from './useImageZoom';

export function useKeyboardControls(): void {
  const { isOpen, onClose } = useImageZoomContext();
  const { zoomIn, zoomOut, fitToScreen } = useImageZoom();
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

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);
}