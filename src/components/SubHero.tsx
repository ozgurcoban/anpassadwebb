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
import { Button } from './ui/button';
import Link from 'next/link';

type SubHeroProps = {
  title: string | null | undefined;
  description: string;
  imageSrc?: StaticImageData;
  textAlign: 'left' | 'center' | 'right';
  showCTA?: boolean;
  ctaText?: string;
  alt: string;
  secondaryCTA?: {
    text: string;
    href: string;
  };
  minHeight?: string;
};

const SubHero = (props: SubHeroProps) => {
  const {
    imageSrc,
    title,
    description,
    textAlign,
    alt,
    secondaryCTA,
    minHeight,
  } = props;

  return (
    <Card
      style={{ minHeight }}
      className={cn(
        `relative grid grid-rows-[1fr_auto_1fr] border-none py-10 sm:rounded-md md:justify-items-end`,
        {
          'md:justify-items-start': textAlign === 'left',
          'md:justify-items-center': textAlign === 'center',
          'md:justify-items-end': textAlign === 'right',
          'subhero-background': !imageSrc,
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
          className="object-cover sm:rounded-md"
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
      {secondaryCTA && (
        <Button size="sm" variant="secondary" className="z-10 mt-10" asChild>
          <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
        </Button>
      )}
      <CardHeader
        className={cn(`z-2 relative row-start-2 md:max-w-2xl`, {
          'md:text-left': textAlign === 'left',
          'items-center text-center': textAlign === 'center',
          'items-end text-right': textAlign === 'right',
        })}
      >
        <CardTitle className="hyphens-manual text-balance text-5xl font-bold leading-tight text-white md:text-6xl md:leading-relaxed">
          {title ?? 'Standardtitel'}
        </CardTitle>
        <CardDescription className="mt-4 max-w-xl text-lg font-medium text-white">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default SubHero;
