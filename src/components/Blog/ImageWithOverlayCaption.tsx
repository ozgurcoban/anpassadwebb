import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithOverlayCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  width: number;
  height: number;
}

export function ImageWithOverlayCaption({
  src,
  alt,
  caption,
  className,
  priority = false,
  width,
  height,
}: ImageWithOverlayCaptionProps) {
  return (
    <figure
      className={cn(
        'relative mt-2 mb-8 w-full md:-mx-4 md:w-[calc(100%+2rem)] lg:-mx-8 lg:w-[calc(100%+4rem)] xl:-mx-16 xl:w-[calc(100%+8rem)]',
        className,
      )}
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          priority={priority}
        />
        {caption && (
          <>
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0" />

            {/* Caption overlay */}
            <figcaption className="absolute bottom-0 left-0 right-0 p-6">
              <p className="mx-auto max-w-3xl text-center text-sm text-white">
                {caption}
              </p>
            </figcaption>
          </>
        )}
      </div>
    </figure>
  );
}
