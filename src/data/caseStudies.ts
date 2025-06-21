import { CaseStudy } from '@/components/Case/CaseCard';

// Extended interface for detailed project
export interface DetailedCaseStudy extends CaseStudy {
  longDescription?: string;
  beforeImage?: string;
  afterImage?: string;
  challenges?: string[];
  solutions?: string[];
  projectDuration?: string;
  teamSize?: number;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export const palermoProject: DetailedCaseStudy = {
  id: 'palermo-restaurant',
  title: 'SEO-optimerad restaurangwebbplats med exceptionell design',
  client: 'Palermo Restaurang',
  description:
    'En väldesignad och SEO-optimerad webbplats som kombinerar italiensk elegans med modern webbteknik. Resultatet är en snabb, tillgänglig och sökbar digital upplevelse.',
  longDescription:
    'Palermo är ett framstående exempel på hur genomtänkt design och teknisk excellens kan skapa en webbplats som både imponerar visuellt och presterar exceptionellt i sökmotorer. Genom att kombinera modern Next.js-arkitektur med avancerad SEO-optimering har vi skapat en digital plattform som lyfter restaurangens varumärke och driver konkret affärsnytta.',
  category: 'Restaurang & Mat',
  technologies: [
    'Next.js 14',
    'TypeScript',
    'Tailwind CSS',
    'Vercel',
    'SEO',
    'Performance',
  ],
  image: '/images/palermo-hero.jpg',
  imageAlt: 'Palermo restaurang hemsida - elegant italiensk design',
  beforeImage: '/images/palermo-case/palermo-before.png',
  afterImage: '/images/palermo-case/palermo-after.png',
  link: 'https://palermo.se',
  featured: true,
  results: [
    { metric: 'Google PageSpeed', value: '98/100' },
    { metric: 'SEO-ranking', value: 'Top 3' },
    { metric: 'Laddningstid', value: '0.6s' },
    { metric: 'Konverteringsökning', value: '+85%' },
  ],
  challenges: [
    'Skapa en visuellt imponerande design som laddar blixtsnabbt',
    'Optimera för lokala sökningar i en konkurrensutsatt restaurangbransch',
    'Integrera bokningssystem utan att påverka prestandan',
    'Säkerställa perfekt mobilupplevelse för restaurangbesökare',
    'Implementera flerspråkigt stöd för internationella gäster',
  ],
  solutions: [
    'Implementerade Next.js med statisk generering för optimal prestanda',
    'Avancerad bildoptimering med lazy loading och moderna format',
    'Strukturerad data (Schema.org) för rik visning i sökresultat',
    'Progressiv förbättring för snabb initial laddning',
    'Responsiv design med mobile-first approach',
    'Tillgänglighetsanpassad enligt WCAG 2.1 AA-standard',
  ],
  projectDuration: '8 veckor',
  teamSize: 3,
  testimonial: {
    quote:
      'Vår nya webbplats har överträffat alla förväntningar. Vi syns nu i toppen av Google för relevanta sökningar och får dagligen nya bokningar genom hemsidan. Designen fångar perfekt vår italienska elegans.',
    author: 'Marco Rossi',
    position: 'Ägare, Palermo Restaurang',
  },
  gallery: [
    {
      src: '/images/palermo-menu.jpg',
      alt: 'Palermo digital menydesign',
      caption: 'Elegant digital meny med snabb laddning',
    },
    {
      src: '/images/palermo-mobile.jpg',
      alt: 'Palermo mobilanpassad design',
      caption: 'Perfekt mobilupplevelse för restaurangbesökare',
    },
    {
      src: '/images/palermo-booking.jpg',
      alt: 'Palermo bokningssystem',
      caption: 'Integrerat bokningssystem med hög konvertering',
    },
  ],
};

// For backwards compatibility, keep the array with just Palermo
export const caseStudies: CaseStudy[] = [palermoProject];
