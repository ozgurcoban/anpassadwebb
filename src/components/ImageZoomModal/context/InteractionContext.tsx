import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { INTERACTION_THRESHOLDS } from '../constants';

interface InteractionContextType {
  lastZoomActionTime: number;
  setLastZoomActionTime: (time: number) => void;
  isWithinCooldown: (cooldownMs?: number) => boolean;
  recordZoomAction: () => void;
  lastInteractionType: 'touch' | 'mouse' | null;
  setLastInteractionType: (type: 'touch' | 'mouse' | null) => void;
  isRecentTouchInteraction: (thresholdMs?: number) => boolean;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [lastZoomActionTime, setLastZoomActionTime] = useState(0);
  const [lastInteractionType, setLastInteractionType] = useState<'touch' | 'mouse' | null>(null);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  
  const isWithinCooldown = useCallback((cooldownMs: number = INTERACTION_THRESHOLDS.zoomActionCooldown) => {
    return Date.now() - lastZoomActionTime < cooldownMs;
  }, [lastZoomActionTime]);
  
  const recordZoomAction = useCallback(() => {
    setLastZoomActionTime(Date.now());
  }, []);
  
  const isRecentTouchInteraction = useCallback((thresholdMs: number = INTERACTION_THRESHOLDS.touchInteractionCooldown) => {
    return lastInteractionType === 'touch' && (Date.now() - lastInteractionTime < thresholdMs);
  }, [lastInteractionType, lastInteractionTime]);
  
  // Update interaction type and time
  const updateLastInteractionType = useCallback((type: 'touch' | 'mouse' | null) => {
    setLastInteractionType(type);
    if (type) {
      setLastInteractionTime(Date.now());
    }
  }, []);
  
  return (
    <InteractionContext.Provider
      value={{
        lastZoomActionTime,
        setLastZoomActionTime,
        isWithinCooldown,
        recordZoomAction,
        lastInteractionType,
        setLastInteractionType: updateLastInteractionType,
        isRecentTouchInteraction,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteractionContext() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteractionContext must be used within InteractionProvider');
  }
  return context;
}