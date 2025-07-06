import React from 'react';
import Image from 'next/image';

interface ImageBackgroundProps {
  src: any;
  alt: string;
  priority?: boolean;
  overlayOpacity?: number;
}

export function ImageBackground({ 
  src, 
  alt, 
  priority = false,
  overlayOpacity = 0.85 
}: ImageBackgroundProps) {
  return (
    <>
      {/* Background image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        placeholder="blur"
        className="object-cover"
      />
      
      {/* Purple/Pink Overlay - matching the original Hero */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Bottom gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </>
  );
}