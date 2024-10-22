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
  CardFooter,
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
      'Webblösningar som speglar ditt varumärke och hjälper dig växa online.',
  },
  {
    iconComponent: IconMapSearch,
    ariaLabel: 'Ikon för SEO och lokal optimering',
    subheader: 'SEO & Lokal Optimering',
    description:
      'Förbättra din synlighet i Uppsala och nå lokala kunder när de söker vad du erbjuder.',
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
      'Se till att din webbplats är uppdaterad och fungerande med vår support och underhåll.',
  },
];

const coreServicesData = [
  {
    title: 'Prestandaoptimering',
    iconComponent: IconBoltFilled,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description:
      'Vi optimerar din webbplats för snabba laddningstider och smidig prestanda. En snabb webbplats förbättrar inte bara användarupplevelsen utan också din SEO, vilket hjälper dig att synas bättre på Google.',
  },
  {
    title: 'Användarupplevelse & Interaktionsdesign',
    iconComponent: IconHandClick,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description:
      'Genomtänkt design gör din webbplats enkel att använda och engagerande för dina besökare. Med fokus på intuitiv användarupplevelse hjälper vi dina kunder att snabbt hitta det de söker.',
  },
  {
    title: 'Säkerhet och Dataskydd',
    iconComponent: IconShieldCheckFilled,
    ariaLabel: 'Ikon för kontinuerlig drift och support',
    description:
      'Med moderna säkerhetslösningar och efterlevnad av GDPR skyddar vi din webbplats och kunddata, vilket gör den säker och trygg för alla användare.',
  },
];

const ServicesPage = () => {
  return (
    <section className="space-y-20">
      <SubHero
        title="Våra tjänster"
        description="På NextWebb skapar vi anpassade webbplatser för småföretag i Uppsala och omnejd. Med kreativitet och teknisk precision hjälper vi ditt företag att synas online och växa."
        textAlign="left"
        imageSrc={img}
        alt="xiri gir"
      />
      <div className="grid gap-6 md:grid-cols-[2.5fr_3fr]">
        <header className="self-end">
          <h3 className="text-[2.6rem] font-medium leading-snug">
            Varje företag är <strong className="font-extrabold">unikt.</strong>
          </h3>
        </header>
        <div className="row-start-3 flex flex-col justify-start gap-8 md:col-span-1 md:col-start-1 md:row-start-2">
          <p className="text-balance">
            Därför erbjuder vi personliga och anpassade webbsidor som hjälper
            ditt företag att sticka ut online.
          </p>
          <ContactButton className="md:w-fit" />
        </div>
        <Image
          className="rounded md:col-start-2 md:row-span-2 md:row-start-1"
          src={uniqueImg}
          alt="unique services"
          placeholder="blur"
        />
      </div>

      {/* Service Offerings */}
      <section className="space-y-8 rounded-md bg-secondary p-6 md:py-8">
        <h3 className="text-3xl font-medium leading-snug md:text-center">
          Helhetslösningar för din digitala närvaro
        </h3>
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
                  />
                  <h4 className="text-lg font-medium">{subheader}</h4>
                  <p className="">{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Fissi section */}
      <Card>
        <CardHeader>
          <CardTitle className="mx-auto max-w-3xl p-6 text-3xl font-medium leading-snug">
            Oavsett vilken verksamhet du driver...
          </CardTitle>
          <CardDescription className="mx-auto max-w-3xl p-6 text-lg">
            Så skapar vi webbplatser som kombinerar estetisk design med hög
            prestanda och optimal funktionalitet – så att din verksamhet inte
            bara syns online, utan också levererar en sömlös användarupplevelse.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid auto-rows-[auto_4rem_14rem] justify-items-center gap-6 px-6 lg:grid-cols-3">
          {coreServicesData.map((service, index) => {
            const { title, description, iconComponent, ariaLabel } = service;
            return (
              <article
                key={index}
                className="row-span-3 grid min-h-[15rem] max-w-xs grid-rows-subgrid justify-items-center rounded-md bg-primary px-4 pt-8 text-primary-foreground sm:max-w-72"
              >
                <ServiceIcon
                  IconComponent={iconComponent}
                  ariaLabel={ariaLabel}
                  className="size-24 text-accent"
                />

                <h4 className="text-sm font-medium md:text-lg lg:text-center">
                  {title}
                </h4>
                <p className="text-md text-wrap break-words">{description}</p>
              </article>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};
export default ServicesPage;

// bg-gradient-to-t from-black via-black/60 to-transparent opacity-75 dark:via-black/85 dark:to-black/20 dark:opacity-85 md:bg-gradient-to-tr
