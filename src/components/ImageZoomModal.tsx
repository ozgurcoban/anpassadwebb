'use client';

import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ImageZoomModalProps } from './ImageZoomModal/types';
import { useImageZoomModal } from './ImageZoomModal/hooks/useImageZoomModal';
import { CloseButton, ZoomToolbar, ZoomInfo, HelpText } from './ImageZoomModal/components';
import { UI_TEXT } from './ImageZoomModal/constants';

export default function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
}: ImageZoomModalProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    scale,
    position,
    isDragging,
    isToolbarVisible,
    zoomIn,
    zoomOut,
    fitToScreen,
    showToolbar,
    handleWheel,
    handleMouseDown,
    handleMouseUp,
    handleMouseMoveOnContainer,
  } = useImageZoomModal({
    imageRef,
    containerRef,
    isOpen,
    onClose,
  });


  return (
    <TooltipProvider delayDuration={300}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-0 bg-black/95 backdrop-blur-sm"
          onInteractOutside={() => {
            // Don't close modal if user is currently dragging the image
            if (!isDragging) {
              onClose();
            }
          }}
        >
        <DialogTitle className={cn(
          "text-white font-semibold text-lg",
          title ? "absolute top-4 left-4 truncate max-w-md z-50" : "sr-only"
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
          style={{ 
            touchAction: scale > 1 ? 'none' : 'auto',
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
                !isDragging && "transition-transform duration-200",
                scale > 1 && "drop-shadow-lg"
              )}
              style={{
                transform: isDragging 
                  ? undefined // Let direct DOM manipulation handle transform during drag
                  : `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              }}
              draggable={false}
            />
          )}
        </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}