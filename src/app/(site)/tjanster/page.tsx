import SubHero from '@/components/SubHero';
import img from '@/assets/services-hero.png';
import uniqueImg from '@/assets/unique-services.png';
import Image from 'next/image';
import { ContactButton } from '@/components/ContactButton';
import {
  IconDeviceDesktopCode,
  IconMapSearch,
  IconShoppingCartCog,
  IconLifebuoy,
  IconLayoutGridAdd,
  IconWorld,
} from '@tabler/icons-react';

const ServiceOfferings = [
  {
    icon: (
      <IconDeviceDesktopCode
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'Skräddarsydda lösningar',
    description:
      'Webblösningar som speglar ditt varumärke och hjälper dig växa online.',
  },
  {
    icon: (
      <IconMapSearch
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'SEO & Lokal Optimering',
    description:
      'Förbättra din synlighet i Uppsala och nå lokala kunder när de söker vad du erbjuder.',
  },
  {
    icon: (
      <IconLayoutGridAdd
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'CMS Integration',
    description:
      'Flexibla lösningar med WordPress och andra CMS ger enkel hantering och uppdatering.',
  },
  {
    icon: (
      <IconWorld
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'Flerspråkiga Webbsidor',
    description:
      'Nå en bredare publik med en flerspråkig webbplats anpassad för internationella kunder.',
  },
  {
    icon: (
      <IconShoppingCartCog
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'E-Commerce',
    description:
      'Bygg din drömshop och sälj med enkelhet genom Shopify eller WooCommerce.',
  },
  {
    icon: (
      <IconLifebuoy
        className="size-10 text-primary drop-shadow-[1px_-1px_0.6px_rgba(3,0,0,0.6)]"
        stroke={1}
      />
    ),
    subheader: 'Kontinuerlig Drift & Support',
    description:
      'Se till att din webbplats är uppdaterad och fungerande med vår support och underhåll.',
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
        <h3 className="self-end text-[2.6rem] font-medium leading-snug">
          Varje företag är <span className="font-extrabold">unikt</span>
        </h3>
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
        />
      </div>

      {/* Service Offerings */}
      <div className="space-y-8 rounded-md bg-secondary p-6 md:py-8">
        <h3 className="text-3xl font-medium leading-snug md:text-center">
          Helhetslösningar för din digitala närvaro
        </h3>
        <div className="grid gap-8 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
          {ServiceOfferings.map((service, index) => (
            <div
              key={index}
              className="border/opacity-40 grid min-h-[12rem] auto-rows-[auto_3rem_5rem] rounded-md border border-dashed border-secondary-foreground/20 p-4 pt-6"
            >
              <div className="row-span-3 grid max-w-sm grid-rows-subgrid space-y-2">
                {service.icon}
                <h4 className="text-lg font-medium">{service.subheader}</h4>
                <p className="">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesPage;

// bg-gradient-to-t from-black via-black/60 to-transparent opacity-75 dark:via-black/85 dark:to-black/20 dark:opacity-85 md:bg-gradient-to-tr
