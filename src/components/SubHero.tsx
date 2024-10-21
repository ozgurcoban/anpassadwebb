import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SubHeroProps = {
  title: string;
  description: string;
  imageSrc?: StaticImageData;
  textAlign: 'left' | 'center' | 'right';
  showCTA?: boolean;
  ctaText?: string;
  alt: string;
};

const SubHero = (props: SubHeroProps) => {
  const { imageSrc, title, description, textAlign, alt } = props;

  return (
    <Card
      className={clsx(
        `relative grid min-h-[40vh] grid-rows-[1fr_auto_1fr] rounded-md border-none py-10 md:justify-items-end`,
        {
          'md:justify-items-start': textAlign === 'left',
          'md:justify-items-center': textAlign === 'center',
          'md:justify-items-end': textAlign === 'right',
        },
      )}
    >
      {/* Optional Background Image */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          placeholder="blur"
          className="rounded-md object-cover"
          priority
        />
      )}

      <div
        className={cn(`absolute inset-0`, {
          'bg-gradient-to-r from-black/60 to-transparent': textAlign === 'left',
          'bg-gradient-to-l from-black/60 to-transparent':
            textAlign === 'right',
          'bg-gradient-to-t from-black/60 to-black/30': textAlign === 'center',
        })}
      />
      <CardHeader
        className={cn(`z-2 relative row-start-2 md:max-w-2xl`, {
          'md:text-left': textAlign === 'left',
          'items-center text-center': textAlign === 'center',
          'items-end text-right': textAlign === 'right',
        })}
      >
        <CardTitle className="hyphens-manual text-balance text-5xl font-bold leading-tight text-white md:text-6xl md:leading-relaxed">
          {title}
        </CardTitle>
        <CardDescription className="mt-4 max-w-xl text-lg font-medium text-white">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default SubHero;
