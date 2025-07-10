import { Metadata } from 'next';
import { CaseComponents } from '@/components/PagesComponents/CasePage';

export const metadata: Metadata = {
  title: 'Kundcase - Palermo Uppsala | Webbutveckling & SEO',
  description:
    'Se hur vi hjälpte Palermo, en lokal kvarterskrog i Uppsala, att klättra från plats 25 till 5 på Google. Ett praktiskt exempel på vår webbutveckling i Uppsala.',
  openGraph: {
    title: 'Kundcase - Palermo Uppsala | Webbutveckling & SEO',
    description:
      'Se hur vi hjälpte en lokal kvarterskrog i Uppsala att synas bättre online.',
    type: 'website',
  },
};

const CasePage = () => {
  return <CaseComponents />;
};

export default CasePage;
