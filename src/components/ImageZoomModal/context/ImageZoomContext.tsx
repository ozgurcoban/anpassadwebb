'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Position } from '../types';
import { InteractionProvider } from './InteractionContext';

interface ImageZoomContextValue {
  // Refs
  imageRef: React.RefObject<HTMLImageElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  
  // Core state
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  currentPositionRef: React.MutableRefObject<Position>;
  
  // Drag state
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Zoom animation state
  isZooming: boolean;
  setIsZooming: React.Dispatch<React.SetStateAction<boolean>>;
  
  // UI state
  isToolbarVisible: boolean;
  setIsToolbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Modal state
  isOpen: boolean;
  onClose: () => void;
}

const ImageZoomContext = createContext<ImageZoomContextValue | undefined>(undefined);

export const useImageZoomContext = () => {
  const context = useContext(ImageZoomContext);
  if (!context) {
    throw new Error('useImageZoomContext must be used within ImageZoomProvider');
  }
  return context;
};

interface ImageZoomProviderProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageZoomProvider: React.FC<ImageZoomProviderProps> = ({ 
  children, 
  isOpen, 
  onClose 
}) => {
  // Refs
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });
  
  // State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  
  const value: ImageZoomContextValue = {
    imageRef,
    containerRef,
    scale,
    setScale,
    position,
    setPosition,
    currentPositionRef,
    isDragging,
    setIsDragging,
    isZooming,
    setIsZooming,
    isToolbarVisible,
    setIsToolbarVisible,
    isOpen,
    onClose,
  };
  
  return (
    <InteractionProvider>
      <ImageZoomContext.Provider value={value}>
        {children}
      </ImageZoomContext.Provider>
    </InteractionProvider>
  );
};