import { useState, useCallback, useRef } from 'react';
import { UseToolbarVisibilityResult } from '../types';
import { ANIMATION_DURATIONS } from '../constants';

export function useToolbarVisibility(): UseToolbarVisibilityResult {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const toolbarTimeoutRef = useRef<number | null>(null);

  const showToolbar = useCallback(() => {
    setIsToolbarVisible(true);
    
    if (toolbarTimeoutRef.current) {
      clearTimeout(toolbarTimeoutRef.current);
    }
    
    toolbarTimeoutRef.current = window.setTimeout(() => {
      setIsToolbarVisible(false);
    }, ANIMATION_DURATIONS.toolbarHideDelay);
  }, []);

  return { isToolbarVisible, showToolbar };
}