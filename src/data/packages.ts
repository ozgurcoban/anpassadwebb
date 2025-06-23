import { CheckCircle2 } from 'lucide-react';

export interface Package {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
  priceNote?: string;
  delivery: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  popular?: boolean;
  badgeText?: string;
}

export interface PackagesConfig {
  introDescription?: string;
}

export const packagesConfig: PackagesConfig = {
  introDescription:
    'Vi bygger smart så att era löpande kostnader startar lågt. Först betalar ni bara för domän (~150kr/år). När trafiken ökar och ni vill ha full CMS-kontroll uppgraderar vi - då har ni redan sett ROI från hemsidan.',
};

export const packages: Package[] = [
  {
    id: 'startklar',
    name: 'Grundpaket "Startklar"',
    tagline:
      'För dig som vill komma online snabbt och synas när kunder söker lokalt.',
    description:
      'Perfekt för små företag som behöver en professionell digital närvaro utan krångel.',
    features: [
      'Upp till 5 sidor + kontaktformulär',
      'Mobilvänlig design på beprövade moduler',
      'Google-optimering för ditt område',
      'Snabba laddtider och säker drift',
      'Google Analytics installerat',
      'Guidade textmallar inkluderat',
    ],
    price: 'Från 15 000 kr',
    priceNote: 'Grundpris',
    delivery: 'Leverans inom 2 veckor',
    gradientFrom: 'from-blue-300',
    gradientVia: 'via-blue-400',
    gradientTo: 'to-blue-500',
  },
  {
    id: 'tillvaxtturbo',
    name: 'Premiumpaket "Tillväxtturbo"',
    tagline:
      'För dig som vill växa trafiken och få fler bokningar eller försäljning.',
    description:
      'Komplett lösning för företag som vill ta nästa steg och växa online.',
    features: [
      'Allt i Startklar-paketet',
      'Upp till 15 sidor + blogg',
      'Unikt designsystem med animationer',
      'Avancerad SEO och konkurrentanalys',
      'Månadsrapport i 6 månader',
      'Professionell copy och bilder',
    ],
    price: 'Från 35 000 kr',
    priceNote: 'Premiumpris',
    delivery: 'Leverans 4–6 veckor',
    gradientFrom: 'from-purple-300',
    gradientVia: 'via-purple-400',
    gradientTo: 'to-purple-500',
    popular: true,
  },
  {
    id: 'skraddarsytt',
    name: 'Skräddarsytt paket',
    tagline:
      'För dig som har större behov och vill ha något helt unikt för din verksamhet.',
    description:
      'Helt anpassad lösning för e-handel, speciallösningar eller digitalt varumärke i toppklass.',
    features: [
      'Allt i tidigare paket',
      'Helt skräddarsydd design och funktionalitet',
      'Obegränsade sidor och komponenter',
      'Avancerade integrationer',
      'Dedikerad projektledare',
      'Omfattande support och utbildning',
    ],
    price: 'Kontakta oss',
    priceNote: 'för offert',
    delivery: 'Leverans enligt överenskommelse',
    gradientFrom: 'from-pink-300',
    gradientVia: 'via-orange-300',
    gradientTo: 'to-amber-300',
  },
];
