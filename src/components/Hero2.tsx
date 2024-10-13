import Image from 'next/image';
import heroImage from '@/assets/hero-background.png';
import { ContactButton } from './ContactButton';
import { CheckCheckIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative px-6 py-10">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="Datorskärm med datorkod i rörelse, som symboliserar modern webbutveckling och teknik."
        fill
        objectFit="cover"
        placeholder="blur"
        className="-scale-x-100 transform rounded-md"
      />
      {/* Overlay */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-black via-black/70 to-transparent opacity-90" />

      {/* Content */}
      <div className="z-1 relative grid md:grid-cols-2">
        <div className="grid grid-rows-[auto_auto_auto_auto] gap-y-10 text-white">
          <h1 className="text-6xl font-semibold leading-snug md:leading-relaxed">
            Skapad för småföretag, anpassad för tillväxt.
          </h1>
          <p className="mt-6 max-w-md text-balance text-base font-normal uppercase tracking-wide md:text-lg">
            Vi skapar skräddarsydda och SEO-vänliga hemsidor för småföretag, med
            fokus på att stärka din online-närvaro och nå fler kunder.
          </p>
          <div className="mt-10">
            <ContactButton className="w-full md:w-auto" />
          </div>
          <ul className="mt-20 flex max-w-md cursor-default justify-around gap-x-4 text-sm md:justify-between">
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
