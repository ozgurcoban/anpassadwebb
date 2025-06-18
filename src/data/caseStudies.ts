import { CaseStudy } from '@/components/Case/CaseCard';

export const caseStudies: CaseStudy[] = [
  {
    id: 'uppsala-tandvard',
    title: 'Modern Webbplats för Tandvårdsklinik',
    client: 'Uppsala Tandvård',
    description: 'Skapade en modern och användarvänlig webbplats för en tandvårdsklinik i Uppsala. Fokus på enkel bokning och tydlig information om behandlingar.',
    category: 'Hälsa & Vård',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    image: '/images/placeholder-case-1.jpg',
    imageAlt: 'Uppsala Tandvård webbplats screenshot',
    link: 'https://uppsalatandvard.se',
    featured: true,
    results: [
      { metric: 'Ökad konvertering', value: '+45%' },
      { metric: 'Laddningstid', value: '0.8s' },
      { metric: 'Mobiltrafik', value: '+60%' }
    ]
  },
  {
    id: 'cafe-linnea',
    title: 'E-handel för Lokalt Kafé',
    client: 'Café Linnéa',
    description: 'Utvecklade en e-handelslösning för ett populärt kafé i centrala Uppsala. Integration med kassasystem och beställning för avhämtning.',
    category: 'E-handel',
    technologies: ['Next.js', 'Shopify', 'TypeScript', 'Stripe'],
    image: '/images/placeholder-case-2.jpg',
    imageAlt: 'Café Linnéa e-handel screenshot',
    link: 'https://cafelinnea.se',
    results: [
      { metric: 'Online-försäljning', value: '+120%' },
      { metric: 'Återkommande kunder', value: '+35%' }
    ]
  },
  {
    id: 'byggfirma-andersson',
    title: 'Företagssida med Projektgalleri',
    client: 'Andersson Bygg AB',
    description: 'Professionell företagssida med omfattande projektgalleri och kundrecensioner. SEO-optimerad för lokala sökningar i Uppsala län.',
    category: 'Företag',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    image: '/images/placeholder-case-3.jpg',
    imageAlt: 'Andersson Bygg webbplats screenshot',
    results: [
      { metric: 'Organisk trafik', value: '+200%' },
      { metric: 'Förfrågningar', value: '+80%' }
    ]
  },
  {
    id: 'yoga-studio',
    title: 'Bokningssystem för Yogastudio',
    client: 'Uppsala Yoga',
    description: 'Komplett bokningssystem med medlemshantering, schemaläggning och betalningsintegration för en växande yogastudio.',
    category: 'Hälsa & Fitness',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    image: '/images/placeholder-case-4.jpg',
    imageAlt: 'Uppsala Yoga bokningssystem screenshot',
    featured: true,
    results: [
      { metric: 'Bokningseffektivitet', value: '+90%' },
      { metric: 'Administrativ tid', value: '-70%' }
    ]
  },
  {
    id: 'restaurang-viktor',
    title: 'Flerspråkig Restaurangwebbplats',
    client: 'Restaurang Viktor',
    description: 'Elegant webbplats på svenska och engelska med menyvisning, bordbokning och integration med sociala medier.',
    category: 'Restaurang',
    technologies: ['Next.js', 'i18n', 'Contentful', 'Tailwind CSS'],
    image: '/images/placeholder-case-5.jpg',
    imageAlt: 'Restaurang Viktor webbplats screenshot',
    link: 'https://restaurangviktor.se',
    results: [
      { metric: 'Bordbokningar online', value: '+150%' },
      { metric: 'Internationella gäster', value: '+40%' }
    ]
  },
  {
    id: 'fastighetsbyra',
    title: 'Fastighetsportal med Sökfunktion',
    client: 'Uppsala Fastigheter',
    description: 'Avancerad fastighetsportal med realtidsuppdateringar, avancerad sökfunktion och virtuella visningar.',
    category: 'Fastigheter',
    technologies: ['Next.js', 'Elasticsearch', 'MapBox', 'Sanity CMS'],
    image: '/images/placeholder-case-6.jpg',
    imageAlt: 'Uppsala Fastigheter portal screenshot',
    results: [
      { metric: 'Visningar per objekt', value: '+85%' },
      { metric: 'Kontaktförfrågningar', value: '+110%' }
    ]
  }
];