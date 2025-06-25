import { Metadata } from 'next';
import PackagesComponents from '@/components/PagesComponents/PackagesPage';

export const metadata: Metadata = {
  title: 'Paket & Priser | Anpassad Webb',
  description:
    'Välj mellan våra tre paket: Startklar för snabb start, Tillväxtturbo för expansion, eller Skräddarsytt för unika behov. Transparent prissättning utan dolda avgifter.',
  keywords:
    'webbutveckling paket, hemsida priser, webbdesign kostnad, paket startklar, tillväxtturbo, skräddarsydd hemsida',
  openGraph: {
    title: 'Paket & Priser | Anpassad Webb',
    description:
      'Från enkel startsida till komplett digital lösning. Välj det paket som passar dina behov och budget.',
    type: 'website',
  },
};

export default function PackagesPage() {
  return <PackagesComponents />;
}
