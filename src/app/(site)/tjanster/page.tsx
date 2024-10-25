import React from 'react';
import { cn } from '@/lib/utils';
import SubHero from '@/components/SubHero';
import img from '@/assets/services-hero.png';
import uniqueImg from '@/assets/unique-services.png';
import Image from 'next/image';
import { ContactButton } from '@/components/ContactButton';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  IconDeviceDesktopCode,
  IconMapSearch,
  IconShoppingCartCog,
  IconLifebuoy,
  IconLayoutGridAdd,
  IconWorld,
  IconBoltFilled,
  IconShieldCheckFilled,
  IconHandClick,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';
import H3 from '@/components/ui/H3';
import P from '@/components/ui/P';
import H4 from '@/components/ui/H4';
import Text from '@/components/ui/Text';

const ServiceIcon = ({
  IconComponent,
  ariaLabel,
  className,
}: {
  IconComponent: React.ElementType;
  ariaLabel: string;
  className?: string;
}) => {
  return (
    <IconComponent
      className={cn(
        `size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]`,
        className,
      )}
      stroke={1}
      aria-label={ariaLabel}
    />
  );
};

const solutionServicesData = [
  {
    iconComponent: IconDeviceDesktopCode,
    ariaLabel: 'Ikon för skräddarsydda lösningar',
    subheader: 'Skräddarsydda lösningar',
    description:
      'Webblösningar efter dina behov, som speglar ditt varumärke och hjälper dig växa online.',
  },
  {
    iconComponent: IconMapSearch,
    ariaLabel: 'Ikon för SEO och lokal optimering',
    subheader: 'SEO & Lokal Optimering',
    description:
      'Förbättra din synlighet och nå lokala kunder när de söker vad du erbjuder.',
  },
  {
    iconComponent: IconLayoutGridAdd,
    ariaLabel: 'Ikon för CMS-integration',
    subheader: 'CMS Integration',
    description:
      'Flexibla lösningar med WordPress och andra CMS ger enkel hantering och uppdatering.',
  },
  {
    iconComponent: IconWorld,
    ariaLabel: 'Ikon för flerspråkiga webbsidor',
    subheader: 'Flerspråkiga Webbsidor',
    description:
      'Nå en bredare publik med en flerspråkig webbplats anpassad för internationella kunder.',
  },
  {
    iconComponent: IconShoppingCartCog,
    ariaLabel: 'Ikon för e-handel',
    subheader: 'E-Commerce',
    description:
      'Bygg din drömshop och sälj med enkelhet genom Shopify eller WooCommerce.',
  },
  {
    iconComponent: IconLifebuoy,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    subheader: 'Kontinuerlig Drift & Support',
    description:
      'Håll din nya fräsha webbplats uppdaterad och fungerande med vår support och underhåll.',
  },
];

const coreServicesData = [
  {
    title: 'Prestandaoptimering',
    iconComponent: IconBoltFilled,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description: (
      <>
        <span>
          Vi bygger snabba och effektiva webbplatser från grunden med modern
          teknik som{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white underline transition duration-200 ease-in-out hover:text-gray-200 hover:no-underline"
          >
            Next.js.
          </a>
        </span>
        <span>
          En optimerad webbplats förbättrar både användarupplevelsen och din
          synlighet på Google.
        </span>
      </>
    ),
  },
  {
    title: 'Användarupplevelse',
    iconComponent: IconHandClick,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description: (
      <>
        <span>
          Genomtänkt design gör din webbplats enkel att använda och engagerande
          för dina besökare.{' '}
        </span>
        <span>
          Med fokus på intuitiv användarupplevelse hjälper vi dina kunder att
          snabbt hitta det de söker.
        </span>
      </>
    ),
  },
  {
    title: 'Säkerhet',
    iconComponent: IconShieldCheckFilled,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description: (
      <>
        <span>
          Med moderna säkerhetslösningar och GDPR-efterlevnad skyddar vi din
          webbplats och kunddata.
        </span>
        <span>
          Robust säkerhet säkerställer trygghet för användarna och minimerar
          hot.
        </span>
      </>
    ),
  },
];

const ServicesPage = () => {
  return (
    <>
      <SubHero
        title="Våra tjänster"
        description="På NextWebb skapar vi anpassade webbplatser för småföretag i Uppsala och omnejd. Med kreativitet och teknisk precision hjälper vi ditt företag att synas online och växa."
        textAlign="left"
        imageSrc={img}
        alt="xiri gir"
      />
      <Section className="grid gap-6 md:grid-cols-[2.5fr_3fr]">
        <header className="self-end">
          <H3 className="text-[2.6rem]">
            Varje företag är{' '}
            <strong className="inline-block bg-gradient-to-r from-pink-400 via-yellow-400 via-50% to-teal-400 bg-clip-text font-extrabold text-transparent">
              unikt.
            </strong>
          </H3>
        </header>
        <div className="row-start-3 flex flex-col justify-start gap-8 md:col-span-1 md:col-start-1 md:row-start-2">
          <P>
            Därför erbjuder vi personliga och anpassade webbsidor som hjälper
            ditt företag att sticka ut online.
          </P>
          <ContactButton className="md:w-fit" />
        </div>
        <div className="-mx-2 rounded md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0">
          <Image
            className="h-full w-full md:rounded-md"
            src={uniqueImg}
            alt="unique services"
            placeholder="blur"
          />
        </div>
      </Section>

      {/* Service Offerings */}
      <Section
        variant="narrow"
        className="space-y-8 bg-secondary sm:rounded-md"
      >
        <H3>Helhetslösningar för din digitala närvaro</H3>
        <div className="grid gap-8 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
          {solutionServicesData.map((service, index) => {
            const { subheader, description, iconComponent, ariaLabel } =
              service;
            return (
              <article
                key={index}
                className="border/opacity-40 grid min-h-[12rem] auto-rows-[auto_3rem_5rem] rounded-md border border-dashed border-secondary-foreground/20 p-4 pt-6"
              >
                <div className="row-span-3 grid max-w-sm grid-rows-subgrid space-y-2">
                  <ServiceIcon
                    IconComponent={iconComponent}
                    ariaLabel={ariaLabel}
                    className="size-14"
                  />
                  <H4>{subheader}</H4>
                  <p className="text-md leading-relaxed">{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Fissi section */}
      <Section className="space-y-6">
        <div className="space-y-10 text-balance md:px-20">
          <Text as="h3" className="text-center">
            Oavsett din verksamhet skapar vi webbsidor som kombinerar design,
            prestanda och säkerhet.
          </Text>
          <P>
            Våra webbsidor kombinerar modern design, hög prestanda och robust
            säkerhet – vilket säkerställer att din verksamhet inte bara syns
            online, utan också levererar en säker och smidig upplevelse för dina
            kunder.
          </P>
        </div>
        <CardContent className="grid auto-rows-[auto_2rem_14rem] justify-items-center gap-6 px-4 md:auto-rows-[auto_2rem_16rem] lg:grid-cols-3">
          {coreServicesData.map((service, index) => {
            const { title, description, iconComponent, ariaLabel } = service;
            return (
              <article
                key={index}
                className="row-span-3 grid max-w-72 grid-rows-subgrid justify-items-center rounded-md bg-primary px-4 pt-10 text-primary-foreground sm:max-w-64"
              >
                <ServiceIcon
                  IconComponent={iconComponent}
                  ariaLabel={ariaLabel}
                  className="size-36 text-accent"
                />

                <h4 className="text-center text-xl font-medium">{title}</h4>
                <p className="text-md flex flex-col gap-2 text-wrap break-words leading-relaxed">
                  {description}
                </p>
              </article>
            );
          })}
        </CardContent>
        <div className="mx-auto max-w-lg rounded-md bg-secondary p-10 text-center text-lg font-medium">
          <p className="mb-4">
            Vill du veta mer om hur du kan förbättra din webbnärvaro? Kontakta
            oss för rådgivning eller frågor.
          </p>
          <ContactButton />
        </div>
      </Section>
    </>
  );
};
export default ServicesPage;

// bg-gradient-to-t from-black via-black/60 to-transparent opacity-75 dark:via-black/85 dark:to-black/20 dark:opacity-85 md:bg-gradient-to-tr
