import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { blogStyles } from '@/lib/styles/blog';

interface MediaDisplayProps {
  src?: string;
  alt: string;
  type?: 'image' | 'video' | 'auto';
  className?: string;
  containerClassName?: string;
  showOverlay?: boolean;
  overlayVariant?: 'dark' | 'light' | 'card';
  fallback?: React.ReactNode;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loop?: boolean;
}

export function MediaDisplay({
  src,
  alt,
  type = 'auto',
  className,
  containerClassName,
  showOverlay = false,
  overlayVariant = 'dark',
  fallback,
  priority = false,
  fill = true,
  width,
  height,
  sizes,
  objectFit = 'cover',
  loop = false
}: MediaDisplayProps) {
  const determineType = (): 'image' | 'video' | 'none' => {
    if (!src) return 'none';
    if (type !== 'auto') return type;
    
    const extension = src.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(extension || '')) {
      return 'video';
    }
    return 'image';
  };
  
  const mediaType = determineType();
  
  if (mediaType === 'none') {
    return (
      <div className={cn(
        'relative w-full h-full bg-gradient-to-br',
        blogStyles.gradients.placeholder,
        containerClassName
      )}>
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback || <BookOpen className="w-16 h-16 text-white/40" />}
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn('relative w-full h-full', containerClassName)}>
      {mediaType === 'video' ? (
        <video
          className={cn('w-full h-full', className)}
          style={{ objectFit }}
          autoPlay
          loop={loop}
          muted
          playsInline
        >
          <source src={src} type={`video/${src!.split('.').pop()}`} />
          <p>Din webbläsare stödjer inte video.</p>
        </video>
      ) : (
        <>
          {fill ? (
            <Image
              src={src!}
              alt={alt}
              fill
              className={cn(className)}
              style={{ objectFit }}
              priority={priority}
              sizes={sizes}
            />
          ) : (
            <Image
              src={src!}
              alt={alt}
              width={width!}
              height={height!}
              className={cn(className)}
              style={{ objectFit }}
              priority={priority}
            />
          )}
        </>
      )}
      
      {showOverlay && (
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-b',
            blogStyles.gradients.overlay[overlayVariant]
          )}
        />
      )}
    </div>
  );
}