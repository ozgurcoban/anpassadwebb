import { CaseStudy } from '@/components/Case/CaseCard';

// Extended interface for detailed project
export interface DetailedCaseStudy extends CaseStudy {
  longDescription?: string;
  beforeImage?: string;
  afterImage?: string;
  story?: {
    title: string;
    subtitle: string;
    beforeTitle: string;
    beforeDescription: string;
    afterTitle: string;
    afterDescription: string;
    value: string;
    image?: string;
    beforeImage?: string;
    afterImage?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export const palermoProject: DetailedCaseStudy = {
  id: 'palermo-restaurant',
  title: 'Palermo',
  client: 'Italiensk restaurang i Stockholm',
  description:
    'Från osynlig till fullbokad. Se hur rätt digital strategi förändrade allt.',
  longDescription:
    'Tre enkla förändringar som gav Palermo 85% fler gäster.',
  category: 'Restaurang',
  technologies: [
    'Syns på Google',
    'Enkel att uppdatera',
    'Säljer mer',
  ],
  image: '/images/palermo-hero.jpg',
  imageAlt: 'Palermo restaurang',
  beforeImage: '/images/palermo-case/palermo-before.png',
  afterImage: '/images/palermo-case/palermo-after.png',
  link: 'https://palermo.se',
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
      beforeDescription: 'Ingen hittade restaurangen på Google. Potentiella gäster gick till konkurrenter.',
      afterTitle: 'Nu',
      afterDescription: 'Top 3 på Google när någon söker "italiensk restaurang Stockholm". Nya gäster varje dag.',
      value: '73% fler besökare från Google',
      beforeImage: '/images/palermo-seo-before.jpg',
      afterImage: '/images/palermo-seo-after.jpg',
    },
    {
      title: 'Alltid uppdaterad',
      subtitle: 'Innehåll du styr själv',
      beforeTitle: 'Förut',
      beforeDescription: 'Ring webbutvecklaren för varje liten ändring. Vänta dagar. Betala dyrt.',
      afterTitle: 'Nu',
      afterDescription: 'Uppdatera menyn direkt från mobilen. Publicera erbjudanden på sekunder. Full kontroll.',
      value: 'Sparar 10 timmar per månad',
      image: '/images/palermo-cms-demo.jpg',
    },
    {
      title: 'Meny som säljer',
      subtitle: 'Design som gör gäster hungriga',
      beforeTitle: 'Förut',
      beforeDescription: 'Svårnavigerad PDF. Dåliga bilder. Gäster gav upp.',
      afterTitle: 'Nu',
      afterDescription: 'Vacker presentation. Läckra bilder. Enkel att läsa på mobilen.',
      value: '45% fler beställningar online',
      beforeImage: '/images/palermo-menu-before.jpg',
      afterImage: '/images/palermo-menu-after.jpg',
    },
  ],
  testimonial: {
    quote:
      'Det bästa vi gjort för vår restaurang. Vi får nya gäster varje dag och sparar massor av tid.',
    author: 'Marco Rossi',
    position: 'Ägare, Palermo',
  },
};

// For backwards compatibility, keep the array with just Palermo
export const caseStudies: CaseStudy[] = [palermoProject];
