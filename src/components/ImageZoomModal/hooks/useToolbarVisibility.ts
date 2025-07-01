import { useCallback, useRef } from 'react';
import { UseToolbarVisibilityResult } from '../types';
import { ANIMATION_DURATIONS } from '../constants';
import { useImageZoomContext } from '../context/ImageZoomContext';

export function useToolbarVisibility(): UseToolbarVisibilityResult {
  const { isToolbarVisible, setIsToolbarVisible } = useImageZoomContext();
  const toolbarTimeoutRef = useRef<number | null>(null);

  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
    
    if (toolbarTimeoutRef.current) {
      clearTimeout(toolbarTimeoutRef.current);
    }
    
    toolbarTimeoutRef.current = window.setTimeout(() => {
      setIsToolbarVisible(false);
    }, ANIMATION_DURATIONS.toolbarHideDelay);
  }, [setIsToolbarVisible]);

  return { isToolbarVisible, showToolbar };
}