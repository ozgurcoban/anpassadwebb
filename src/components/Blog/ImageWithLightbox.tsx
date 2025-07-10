'use client';

import React, { useState, useEffect } from 'react';
import { ImageWithOverlayCaption } from './ImageWithOverlayCaption';
import ImageZoomModal from '@/components/ImageZoomModal';
import { cn } from '@/lib/utils';
import { Expand } from 'lucide-react';

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  width: number;
  height: number;
}

export function ImageWithLightbox({
  src,
  alt,
  caption,
  className,
  priority = false,
  width,
  height,
}: ImageWithLightboxProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div 
        className={cn("relative", isMobile && "cursor-pointer")} 
        onClick={isMobile ? () => setIsLightboxOpen(true) : undefined}
      >
        <ImageWithOverlayCaption
          src={src}
          alt={alt}
          caption={caption}
          className={className}
          priority={priority}
          width={width}
          height={height}
        />
        
        {/* Mobile-only zoom indicator */}
        {isMobile && (
          <>
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2 pointer-events-none">
              <Expand className="w-5 h-5 text-white" />
            </div>
            
            {/* Mobile hint text */}
            <div className={cn(
              "absolute bottom-16 left-1/2 -translate-x-1/2",
              "bg-black/70 backdrop-blur-sm rounded-full px-3 py-1",
              "text-xs text-white/90",
              caption && "bottom-20"
            )}>
              Tryck för att förstora
            </div>
          </>
        )}
      </div>

      {isMobile && (
        <ImageZoomModal
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageSrc={src}
          imageAlt={alt}
          title={caption || alt}
        />
      )}
    </>
  );
}