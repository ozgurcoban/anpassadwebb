'use client';

import React, { useEffect, useRef } from 'react';
import { Dialog, DialogTitle } from '@/components/ui/dialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ImageZoomModalProps } from './ImageZoomModal/types';
import { ImageZoomProvider, useImageZoomContext } from './ImageZoomModal/context/ImageZoomContext';
import { useImageZoom, useImageDrag, useImageTouch, useKeyboardControls, useToolbarVisibility } from './ImageZoomModal/hooks';
import { CloseButton, ZoomToolbar, ZoomInfo, HelpText } from './ImageZoomModal/components';
import { CustomDialogContent } from './ImageZoomModal/components/CustomDialogContent';
import { UI_TEXT, ANIMATION_DURATIONS } from './ImageZoomModal/constants';

function ImageZoomModalContent({
  imageSrc,
  imageAlt,
  title,
}: Omit<ImageZoomModalProps, 'isOpen' | 'onClose'>) {
  const {
    imageRef,
    containerRef,
    scale,
    position,
    isDragging,
    isOpen,
    onClose,
  } = useImageZoomContext();
  
  const { zoomIn, zoomOut, fitToScreen, handleWheel } = useImageZoom();
  const { handleMouseDown, handleMouseUp, handleMouseMoveOnContainer } = useImageDrag({ zoomIn });
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useImageTouch();
  const { isToolbarVisible, showToolbar } = useToolbarVisibility();
  
  // Track if modal was previously open to prevent resetting zoom
  const wasOpenRef = useRef(false);
  
  // Set up keyboard controls
  useKeyboardControls();
  
  // Initialize zoom on open
  useEffect(() => {
    if (isOpen) {
      showToolbar();
      
      // Only fit to screen on initial open, not on re-open
      if (!wasOpenRef.current) {
        const timer = setTimeout(() => {
          fitToScreen();
        }, ANIMATION_DURATIONS.imageLoadDelay);
        
        wasOpenRef.current = true;
        return () => clearTimeout(timer);
      }
    } else {
      // Reset the flag when modal is truly closed
      wasOpenRef.current = false;
    }
  }, [isOpen, showToolbar, fitToScreen]);


  return (
    <TooltipProvider delayDuration={300}>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          // On touch devices: only close if not zoomed
          const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouchDevice || scale === 1) {
            onClose();
          }
        }
      }}>
        <CustomDialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-0 bg-black/95 backdrop-blur-sm"
          onPointerDownOutside={(e) => {
            // On touch devices, prevent closing when zoomed
            if (scale > 1 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            // Check if it's a touch device (mobile/tablet)
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            // On touch devices: only close if not dragging AND not zoomed
            // On desktop: only check if not dragging
            if (!isDragging && (!isTouchDevice || scale === 1)) {
              onClose();
            }
          }}
          onEscapeKeyDown={(e) => {
            // On touch devices, prevent ESC from closing when zoomed
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (scale > 1 && isTouchDevice) {
              e.preventDefault();
            }
          }}
        >
        <DialogTitle className={cn(
          "text-white font-semibold text-sm md:text-lg",
          title ? "absolute top-2 left-2 md:top-4 md:left-4 truncate max-w-[200px] md:max-w-md z-50" : "sr-only"
        )}>
          {title || UI_TEXT.defaultTitle}
        </DialogTitle>

        <CloseButton onClose={onClose} showToolbar={showToolbar} />
        
        <ZoomToolbar
          scale={scale}
          isToolbarVisible={isToolbarVisible}
          showToolbar={showToolbar}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          fitToScreen={fitToScreen}
        />

        <ZoomInfo scale={scale} />
        
        <HelpText />

        {/* Image container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveOnContainer}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerDown={(e) => {
            // Prevent pointer events from bubbling to dialog
            e.stopPropagation();
          }}
          style={{ 
            touchAction: 'none',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            overflow: 'hidden'
          }}
        >
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              className={cn(
                "max-w-full max-h-full object-contain select-none",
                // Only add transition on desktop (not touch devices)
                !isDragging && !('ontouchstart' in window || navigator.maxTouchPoints > 0) && "transition-transform duration-200",
                scale > 1 && "drop-shadow-lg"
              )}
              style={{
                transform: isDragging 
                  ? undefined // Let direct DOM manipulation handle transform during drag
                  : `scale(${scale}) translate(${position.x / Math.sqrt(scale)}px, ${position.y / Math.sqrt(scale)}px)`,
              }}
              draggable={false}
            />
          )}
        </div>
        </CustomDialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
}: ImageZoomModalProps) {
  return (
    <ImageZoomProvider isOpen={isOpen} onClose={onClose}>
      <ImageZoomModalContent
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={title}
      />
    </ImageZoomProvider>
  );
}