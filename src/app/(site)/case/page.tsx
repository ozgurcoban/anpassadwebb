import React from 'react';
import { cn } from '@/lib/utils';
import SubHero from '@/components/SubHero';
import img from '@/assets/services-hero.png';
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
import { Content } from 'next/font/google';
import ContentSection from '@/components/ui/ContentSection';
import { RainbowButton } from '@/components/ui/RainbowButton/RainbowButton';

const ServiceIcon = ({
  IconComponent,
  ariaLabel,
  className,
  color,
}: {
  IconComponent: React.ElementType;
  ariaLabel: string;
  className?: string;
  color?: string;
}) => {
  return (
    <IconComponent
      className={cn(
        `size-10 drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]`,
        className,
      )}
      stroke={1}
      aria-label={ariaLabel}
      style={{ color }}
    />
  );
};

const solutionServicesData = [
  {
    iconComponent: IconDeviceDesktopCode,
    ariaLabel: 'Ikon för skräddarsydda lösningar',
    subheader: 'Nya Skräddarsydda Webbsidor',
    description:
      'Vi skapar helt nya och snabba webbsidor som hjälper dig växa online.',
  },
  {
    iconComponent: IconMapSearch,
    ariaLabel: 'Ikon för SEO och lokal optimering',
    subheader: 'SEO & Lokal Optimering',
    description:
      'Våra sidor ökar din synlighet, så kunder hittar dig när de söker det du erbjuder.',
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
            className="font-medium text-[#3366cc] underline transition duration-200 ease-in-out hover:text-gray-200 hover:no-underline"
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

const cardColors = [
  '#FFEDE5', // Light pink for "Prestandaoptimering"
  '#FFF6E0', // Light pastel yellow for "Användarupplevelse"
  '#E5F4FF', // Light blue for "Säkerhet"
];

const iconColors = [
  '#B84F3C', // Light pink for "Prestandaoptimering"
  '#A98A3E', // Light pastel yellow for "Användarupplevelse"
  '#6A8BA2', // Light blue for "Säkerhet"
];

const ServicesPage = () => {
  return (
    <>
      <SubHero
        title="Våra case"
        description="Utforska våra projekt och se hur vi har hjälpt småföretag i Uppsala att skapa en stark digital närvaro. Varje case visar vår passion för design, teknik och resultat."
        textAlign="left"
        imageSrc={img}
        alt="xiri gir"
        minHeight="40vh"
      />

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
                className="border/opacity-40 sm:auto-rows-[auto_3rem_7rem]rounded-md mt-6 grid min-h-[12rem] auto-rows-[auto_3rem_5rem] border border-dashed border-secondary-foreground/20 p-4"
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
      <Section className="space-y-18 rounded bg-secondary p-4 pt-12">
        <div className="mb-32 space-y-10 text-balance md:px-20">
          <Text as="h3" className="text-center" size="xl">
            Oavsett din verksamhet skapar vi webbsidor som kombinerar design,
            prestanda och säkerhet.
          </Text>
          <Text as="p" className="text-center" size="lg">
            Våra webbsidor kombinerar modern design, hög prestanda och robust
            säkerhet – vilket säkerställer att din verksamhet inte bara syns
            online, utan också levererar en säker och smidig upplevelse för dina
            kunder.
          </Text>
        </div>
        <CardContent className="relative grid auto-rows-[auto_2rem_14rem] justify-items-center gap-6 px-4 md:auto-rows-[auto_2rem_16rem] lg:grid-cols-3">
          <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
            <div
              className="bg-gradient-180 lg:bg-gradient-90 mx-auto h-full w-full max-w-5xl rounded-3xl opacity-30 blur-lg filter"
              // style={{
              //   background:
              //     'linear-gradient(180deg, #F2B8B4 0%, #FC8A52 20%, #F3DE66 40%, #3DBB98 60%, #3DCFD1 80%, #7FC5DE 100%)',
              // }}
            />
          </div>
          {coreServicesData.map((service, index) => {
            const { title, description, iconComponent, ariaLabel } = service;
            return (
              <article
                key={index}
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                }}
                className={cn(
                  'relative row-span-3 grid max-w-72 grid-rows-subgrid justify-items-center rounded-md px-4 pt-10 text-card-foreground shadow-xl sm:max-w-xs',
                )}
              >
                <ServiceIcon
                  IconComponent={iconComponent}
                  ariaLabel={ariaLabel}
                  className="size-36"
                  color={iconColors[index % iconColors.length]}
                />

                <h4 className="text-center text-xl font-medium text-[#333333]">
                  {title}
                </h4>
                <p className="text-md flex flex-col gap-2 text-wrap break-words leading-relaxed text-[#555555]">
                  {description}
                </p>
              </article>
            );
          })}
        </CardContent>
        <div className="mx-auto mt-36 grid max-w-lg place-items-center gap-8 rounded-md bg-accent p-10 text-lg font-medium">
          <p className="mb-4 text-center">
            Vill du veta mer om hur du kan förbättra din webbnärvaro? Kontakta
            oss för rådgivning eller frågor.
          </p>
          <ContactButton className="w-full md:w-fit" />
        </div>
      </Section>
    </>
  );
};
export default ServicesPage;
