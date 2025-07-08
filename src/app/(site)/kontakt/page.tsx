import { Metadata } from 'next';
import { ContactComponents } from '@/components/PagesComponents/ContactPage';

export const metadata: Metadata = {
  title: 'Kontakta oss - Webbutveckling Uppsala | Anpassad Webb',
  description: 'Kontakta oss för webbutveckling i Uppsala. Vi erbjuder kostnadsfri konsultation för hemsidor och digital marknadsföring. Lokal webbyrå med personlig service.',
  openGraph: {
    title: 'Kontakta oss - Webbutveckling Uppsala',
    description: 'Lokal webbyrå i Uppsala redo att hjälpa dig med din nästa hemsida.',
    type: 'website',
  },
};

const KontaktPage = () => {
  return <ContactComponents />;
};

export default KontaktPage;
