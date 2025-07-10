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
        'relative -mx-4 mb-12 mt-2 w-[calc(100%+2rem)] sm:mx-0 sm:w-full md:-mx-4 md:mb-8 md:w-[calc(100%+2rem)] lg:-mx-8 lg:w-[calc(100%+4rem)] xl:-mx-16 xl:w-[calc(100%+8rem)]',
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
      </div>
      {caption && (
        <figcaption className="mt-3 px-4">
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 dark:text-gray-400">
            {caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
}
