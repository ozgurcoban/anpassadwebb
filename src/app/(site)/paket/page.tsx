import { Metadata } from 'next';
import PackagesComponents from '@/components/PagesComponents/PackagesPage';

export const metadata: Metadata = {
  title: 'Hemsidor Uppsala - Priser & Paket | Anpassad Webb',
  description:
    'Prisvärda hemsidor i Uppsala. Vi erbjuder tydliga paket för småföretag - från enkel startsida till komplett webbplats. Inga dolda avgifter.',
  openGraph: {
    title: 'Hemsidor Uppsala - Priser & Paket | Anpassad Webb',
    description:
      'Prisvärda hemsidor för företag i Uppsala. Från enkel startsida till komplett digital lösning.',
    type: 'website',
  },
};

export default function PackagesPage() {
  return <PackagesComponents />;
}
