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
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const ServiceOfferings = [
  {
    icon: <IconDeviceDesktopCode />,
    subheader: 'Skräddarsydda Webblösningar',
    description:
      'Vi skapar unika och anpassade webblösningar som speglar ditt varumärke och erbjuder en modern användarupplevelse. Varje lösning är utformad för att möta dina specifika behov och hjälpa ditt företag att synas och växa online.',
  },
  {
    icon: <IconMapSearch />,
    subheader: 'SEO & Lokal Optimering',
    description:
      'Förbättra din synlighet på sökmotorer och nå dina lokala kunder i Uppsala. Vi hjälper dig att synas när kunder söker efter just det du erbjuder.',
  },
  {
    icon: <IconShoppingCartCog />,
    subheader: 'E-Commerce & CMS Integration',
    description:
      'Vi erbjuder flexibla lösningar och arbetar med plattformar som WordPress och Shopify, men anpassar oss efter dina behov. Oavsett vilken lösning du väljer, ser vi till att du enkelt kan hantera och uppdatera din webbplats eller e-handel smidigt och effektivt.',
  },
  {
    icon: <IconLifebuoy />,
    subheader: 'Löpande Support & Underhåll',
    description:
      'Vi erbjuder löpande underhåll och support för att säkerställa att din webbplats alltid är uppdaterad och fungerar optimalt.',
  },
];

const ServicesPage = () => {
  return (
    <section className="space-y-10">
      <SubHero
        title="Våra tjänster"
        description="På NextWebb skapar vi anpassade webbplatser för småföretag i Uppsala och omnejd. Med kreativitet och teknisk precision hjälper vi ditt företag att synas online och växa."
        textAlign="left"
        imageSrc={img}
        alt="xiri gir"
      />
      <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
        <h3 className="self-end text-[2.6rem] font-medium leading-snug">
          Varje företag är <span className="font-extrabold">unikt</span>
        </h3>
        <div className="row-start-3 flex max-w-sm flex-col justify-around gap-4 md:col-span-1 md:col-start-1 md:row-start-2">
          <p className="">
            Därför erbjuder vi personliga och anpassade webbutvecklingstjänster
            som hjälper ditt företag att sticka ut online.{' '}
          </p>
          <ContactButton />
        </div>
        <Image
          className="rounded md:col-start-2 md:row-span-2 md:row-start-1"
          src={uniqueImg}
          alt="unique services"
        />
      </div>

      <div className="space-y-6 rounded-md bg-secondary px-2 py-4 md:p-6">
        <h3 className="text-3xl font-medium leading-snug">
          Helhetslösningar för din digitala närvaro
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {ServiceOfferings.map((service, index) => (
            <div key={index} className="">
              <div className="max-w-sm space-y-4">
                <Button variant="ghost" size="icon" className="">
                  {service.icon}
                </Button>
                <h4 className="text-xl font-semibold">{service.subheader}</h4>
                <p>{service.description}</p>
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
