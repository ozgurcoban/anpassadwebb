'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  sliderLineWidth?: number;
  sliderLineColor?: string;
  sliderHandleColor?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
  aspectRatio = '16/9',
  sliderLineWidth = 2,
  sliderLineColor = 'white',
  sliderHandleColor = 'white',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove as any);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove as any);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden rounded-lg select-none cursor-ew-resize',
        className
      )}
      style={{ aspectRatio }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {afterLabel && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-md text-base font-semibold backdrop-blur-md shadow-lg">
            {afterLabel}
          </div>
        )}
      </div>

      {/* Before Image (Foreground with clip) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {beforeLabel && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-md text-base font-semibold backdrop-blur-md shadow-lg">
            {beforeLabel}
          </div>
        )}
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
        }}
      >
        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            width: `${sliderLineWidth}px`,
            backgroundColor: sliderLineColor,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-ew-resize"
          style={{
            width: '48px',
            height: '48px',
          }}
        >
          <div
            className="relative w-full h-full rounded-full shadow-2xl border-3 ring-2 ring-black/20"
            style={{
              backgroundColor: sliderHandleColor,
              borderColor: sliderHandleColor,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Arrow Icons */}
            <svg
              className="absolute inset-0 w-full h-full p-2"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 15L19 22L26 29"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              />
              <path
                d="M18 15L25 22L18 29"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}