import Image, { StaticImageData } from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TextAlignOptions = 'left' | 'center' | 'right';

type SubHeroProps = {
  title: string;
  description: string;
  imageSrc?: StaticImageData;
  textAlign: TextAlignOptions;
  showCTA?: boolean;
  ctaText?: string;
};

const SubHero = (props: SubHeroProps) => {
  const { imageSrc, title, description, textAlign } = props;

  return (
    <Card className="relative mb-8 grid h-[60vh] rounded-md border-none px-6 py-10 md:h-[40vh] md:items-center md:justify-end">
      {/* Optional Background Image */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
          fill
          placeholder="blur"
          className="rounded-md"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-75 dark:via-black/85 dark:to-black/20 dark:opacity-85 md:bg-gradient-to-tr" />
      <CardHeader
        className={`relative z-10 text-balance p-0 text-center md:text-${textAlign}`}
      >
        <CardTitle className="text-5xl font-bold leading-tight text-white md:text-6xl md:leading-relaxed">
          {title}
        </CardTitle>
        <CardDescription className="mt-4 max-w-xl text-lg text-white">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default SubHero;
