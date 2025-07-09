import { CaseStudy } from '@/components/Case/CaseCard';

// Extended interface for detailed project
export interface DetailedCaseStudy extends CaseStudy {
  longDescription?: string;
  beforeImage?: string;
  afterImage?: string;
  story?: {
    title: string;
    subtitle: string;
    beforeTitle?: string;
    beforeDescription?: string;
    afterTitle?: string;
    afterDescription?: string;
    value: string;
    image?: string;
    beforeImage?: string;
    afterImage?: string;
    features?: {
      title: string;
      description: string;
      icon?: string;
    }[];
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  aboutSection?: {
    title: string;
    content: string;
  };
  processSection?: {
    title: string;
    subtitle: string;
    steps: string[];
  };
}

export const palermoProject: DetailedCaseStudy = {
  id: 'palermo-restaurant',
  title: 'Palermo',
  client: 'Klassisk restaurang, pizzeria och bar i Uppsala',
  description:
    'Från dold pärla till online-succé. Se hur vi lyfte deras digitala närvaro.',
  longDescription: 'Tre enkla förändringar som gav Palermo 85% fler gäster.',
  category: 'Restaurang',
  technologies: ['Syns på Google', 'Enkel att uppdatera', 'Säljer mer'],
  image: '/images/palermo-hero.jpg',
  imageAlt: 'Palermo restaurang',
  beforeImage: '/images/palermo-case/palermo-before.png',
  afterImage: '/images/palermo-case/palermo-after.png',
  link: 'https://palermo-uppsala.se',
  featured: true,
  results: [
    { metric: 'Fler bokningar', value: '+85%' },
    { metric: 'Google', value: 'Top 3' },
    { metric: 'Nöjda gäster', value: '4.8/5' },
  ],
  story: [
    {
      title: 'Syns överallt',
      subtitle: 'Smart SEO som fungerar',
      beforeTitle: 'Förut',
      beforeDescription:
        'Ingen hittade restaurangen på Google. Potentiella gäster gick till konkurrenter.',
      afterTitle: 'Nu',
      afterDescription:
        'Från plats 25 till top 5 på Google när någon söker "pizza uppsala". Nya gäster varje dag.',
      value: '73% fler besökare från Google',
      beforeImage: '/images/palermo-case/palermo-seo-before.webp',
      afterImage: '/images/palermo-case/palermo-seo-after.png',
    },
    {
      title: 'Alltid uppdaterad',
      subtitle:
        'Innehåll du styr själv från mobilen eller datorn. Allt i ett verktyg.',
      value: 'Sparar 10 timmar per månad',
      image: '/images/palermo-cms-demo.jpg',
      features: [
        {
          title: 'Flerspråkigt innehåll',
          description:
            'Automatisk översättning mellan svenska och engelska för alla texter',
          icon: 'Languages',
        },
        {
          title: 'Dynamisk lunchmeny',
          description:
            'Hantera dagens lunch, lunchpizza och månadens tips - allt på ett ställe',
          icon: 'CalendarDays',
        },
        {
          title: 'Smarta öppettider & Happy Hours',
          description:
            'Uppdatera öppettider och happy hours som visas automatiskt i FAQ och kontakt',
          icon: 'Clock',
        },
        {
          title: 'Avancerad menyhantering',
          description:
            'Organisera mat och vin med kategorier, priser och specialmärkningar',
          icon: 'UtensilsCrossed',
        },
        {
          title: 'FAQ med dynamisk data',
          description:
            'Vanliga frågor som automatiskt visar aktuella öppettider och lunchpriser',
          icon: 'MessageCircle',
        },
        {
          title: 'Galleri & bildhantering',
          description:
            'Ladda upp och hantera bilder med automatisk optimering och hotspot-fokus',
          icon: 'Image',
        },
      ],
    },
    {
      title: 'Meny som säljer',
      subtitle: 'Design som gör gäster hungriga',
      beforeTitle: 'Förut',
      beforeDescription:
        'Svårnavigerad meny. Innehållet var rörigt och oöverskådligt. Samt att den inte var anpassad för mobil. Det gjorde att många gäster tappade intresset innan de ens beställt.',
      afterTitle: 'Nu',
      afterDescription:
        'Vi tog fram en menystruktur för mobil som sorterar innehållet i “chips” (kategorier) och döljer onödigt brus, så att det blir lätt att hitta exakt det man är sugen på.',
      value: '45% fler beställningar online',
      beforeImage: '/images/palermo-case/palermo-menu-before.webp',
      afterImage: '/images/palermo-menu-after.jpg',
    },
  ],
  testimonial: {
    quote:
      'Professionellt bemötande och mycket nöjd med resultatet. Sidan är enkel att uppdatera och den syns på Google.',
    author: 'Burhan Balikci',
    position: 'Ägare, Palermo',
  },
  aboutSection: {
    title: 'Vem står bakom?',
    content:
      'Vi bakom Anpassad Webb har själva stått bakom kassan, planerat menyer och jobbat sena kvällar i restaurangbranschen. Idag hjälper vi andra företagare att bygga hemsidor som inte bara ser bra ut – utan som faktiskt levererar resultat. Med öga för detaljer, förståelse för vardagen som företagare och teknik i framkant skapar vi lösningar som funkar – även efter att hypen lagt sig.',
  },
  processSection: {
    title: 'Så här går det till – vår process',
    subtitle: 'Exempel: Vårt samarbete med Palermo i Uppsala',
    steps: [
      'Första mötet – Palermo ville ha en hemsida som matchade känslan folk redan har: bra pizza, skön stämning och ett ställe man gillar att hänga på.',
      'Visuell identitet – Vi tog fram en design som fångar Palermos atmosfär med en mix av exteriörbilder, miljödetaljer och en tydlig, personlig ton.',
      'Byggt med omsorg – Sidan utvecklades i flera etapper med fokus på att den skulle kännas rätt för Palermo – både i innehåll och uttryck.',
      'Löpande stöd – Vi finns kvar i bakgrunden och hjälper till när det behövs, så att sidan rullar på – precis som vardagen på Palermo.',
    ],
  },
};

// For backwards compatibility, keep the array with just Palermo
export const caseStudies: CaseStudy[] = [palermoProject];
