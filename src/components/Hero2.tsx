import Image from 'next/image';
import heroImage from '@/assets/hero-background.png';
import { ContactButton } from './ContactButton';
import { CheckCheckIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative grid min-h-[50vh] px-6 py-10 md:py-14">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
        fill
        priority
        placeholder="blur"
        className="-scale-x-100 transform rounded-md"
      />
      {/* Overlay */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-black via-black/70 to-transparent opacity-80 dark:via-black/85 dark:to-black/30 dark:opacity-95" />

      {/* Content */}
      <div className="z-1 relative grid justify-items-center md:grid-cols-2">
        <div className="grid grid-rows-[auto_auto_auto_auto] gap-y-5 text-white">
          <h1 className="text-5xl font-bold leading-tight md:text-6xl md:leading-relaxed lg:text-7xl lg:leading-loose">
            Skapad för småföretag. Anpassad för tillväxt.
          </h1>
          <p className="max-w-md text-balance text-base font-normal tracking-wide md:mt-6 md:text-lg">
            Vi skapar skräddarsydda och SEO-vänliga hemsidor för småföretag, med
            fokus på att stärka din online-närvaro och nå fler kunder.
          </p>
          <div className="mt-5 md:mt-10">
            <ContactButton className="w-full md:w-auto" />
          </div>
          <ul className="mt-4 flex max-w-md cursor-default justify-around gap-x-4 text-sm md:mt-20 md:justify-between">
            <li className="flex items-center gap-2">
              <CheckCheckIcon className="size-6" aria-hidden="true" />
              Benefit 1
            </li>
            <li className="flex items-center gap-2">
              <CheckCheckIcon className="size-6" aria-hidden="true" />
              Baserad i Uppsala
            </li>
            <li className="flex items-center gap-2">
              <CheckCheckIcon className="size-6" aria-hidden="true" />
              Benefit 3
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
