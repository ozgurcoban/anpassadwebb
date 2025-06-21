'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { cn } from '@/lib/utils';

type LabelPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'bottom-center' | 'top-center';
type HandleSize = 'sm' | 'md' | 'lg';
type HeaderPosition = 'top' | 'bottom';

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
  // New props
  initialPosition?: number;
  labelPosition?: LabelPosition;
  beforeLabelPosition?: LabelPosition;
  afterLabelPosition?: LabelPosition;
  labelClassName?: string;
  beforeLabelClassName?: string;
  afterLabelClassName?: string;
  sliderHandleSize?: HandleSize;
  animateOnHover?: boolean;
  transitionDuration?: number;
  ariaLabelBefore?: string;
  ariaLabelAfter?: string;
  overlayOpacity?: number;
  borderRadius?: string;
  disabled?: boolean;
  onPositionChange?: (position: number) => void;
  // Title and description props
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  headerPosition?: HeaderPosition;
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
  // New props with defaults
  initialPosition = 35,
  labelPosition = 'bottom-left',
  beforeLabelPosition,
  afterLabelPosition,
  labelClassName,
  beforeLabelClassName,
  afterLabelClassName,
  sliderHandleSize = 'md',
  animateOnHover = false,
  transitionDuration = 0,
  ariaLabelBefore,
  ariaLabelAfter,
  overlayOpacity = 0,
  borderRadius,
  disabled = false,
  onPositionChange,
  // Title and description with defaults
  title,
  description,
  titleClassName,
  descriptionClassName,
  headerPosition = 'top',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine actual label positions
  const actualBeforeLabelPosition = beforeLabelPosition || labelPosition;
  const actualAfterLabelPosition = afterLabelPosition || labelPosition;

  // Get label position classes
  const getLabelPositionClasses = (position: LabelPosition): string => {
    const positions: Record<LabelPosition, string> = {
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
    };
    return positions[position];
  };

  // Get handle size
  const getHandleSize = (): number => {
    const sizes = { sm: 32, md: 48, lg: 64 };
    return sizes[sliderHandleSize];
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current || disabled) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newPosition = Math.min(Math.max(percentage, 0), 100);
    
    setSliderPosition(newPosition);
    onPositionChange?.(newPosition);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (disabled) return;
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
    if (disabled) return;
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

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    const step = 5; // 5% per key press
    let newPosition = sliderPosition;
    
    switch (e.key) {
      case 'ArrowLeft':
        newPosition = Math.max(0, sliderPosition - step);
        break;
      case 'ArrowRight':
        newPosition = Math.min(100, sliderPosition + step);
        break;
      case 'Home':
        newPosition = 0;
        break;
      case 'End':
        newPosition = 100;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setSliderPosition(newPosition);
    onPositionChange?.(newPosition);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  // Header component
  const Header = () => {
    if (!title && !description) return null;
    
    return (
      <div className="mb-4">
        {title && (
          <h3 className={cn(
            'text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
            titleClassName
          )}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn(
            'mt-2 text-base text-gray-600 dark:text-gray-400',
            descriptionClassName
          )}>
            {description}
          </p>
        )}
      </div>
    );
  };

  // Slider component
  const Slider = () => (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden select-none',
        !disabled && 'cursor-ew-resize',
        disabled && 'cursor-not-allowed opacity-75',
        animateOnHover && isHovered && 'transition-all duration-300',
        className
      )}
      style={{ 
        aspectRatio,
        borderRadius: borderRadius || undefined,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-disabled={disabled}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={ariaLabelAfter || afterLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Optional overlay */}
        {overlayOpacity > 0 && (
          <div 
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        )}
        {afterLabel && (
          <div 
            className={cn(
              'absolute bg-black/70 text-white px-4 py-2 rounded-md text-base font-semibold backdrop-blur-md shadow-lg',
              getLabelPositionClasses(actualAfterLabelPosition === 'bottom-left' ? 'bottom-right' : actualAfterLabelPosition),
              afterLabelClassName || labelClassName
            )}
          >
            {afterLabel}
          </div>
        )}
      </div>

      {/* Before Image (Foreground with clip) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: transitionDuration > 0 ? `clip-path ${transitionDuration}ms ease-out` : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt={ariaLabelBefore || beforeLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Optional overlay */}
        {overlayOpacity > 0 && (
          <div 
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        )}
        {beforeLabel && (
          <div 
            className={cn(
              'absolute bg-black/70 text-white px-4 py-2 rounded-md text-base font-semibold backdrop-blur-md shadow-lg',
              getLabelPositionClasses(actualBeforeLabelPosition),
              beforeLabelClassName || labelClassName
            )}
          >
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
          transition: transitionDuration > 0 ? `left ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out` : undefined,
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
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto',
            !disabled && 'cursor-ew-resize',
            animateOnHover && isHovered && 'scale-110',
            'transition-transform duration-200'
          )}
          style={{
            width: `${getHandleSize()}px`,
            height: `${getHandleSize()}px`,
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
              className={cn(
                'absolute inset-0 w-full h-full',
                sliderHandleSize === 'sm' ? 'p-1.5' : sliderHandleSize === 'lg' ? 'p-3' : 'p-2'
              )}
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 15L19 22L26 29"
                stroke="currentColor"
                strokeWidth={sliderHandleSize === 'sm' ? '2' : '3'}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              />
              <path
                d="M18 15L25 22L18 29"
                stroke="currentColor"
                strokeWidth={sliderHandleSize === 'sm' ? '2' : '3'}
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

  // Main return with header positioning
  return (
    <div className="w-full">
      {headerPosition === 'top' && <Header />}
      <Slider />
      {headerPosition === 'bottom' && <Header />}
    </div>
  );
}