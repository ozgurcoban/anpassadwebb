import { Open_Sans, Montserrat, Quicksand } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalyticsConsent from '@/components/GoogleAnalyticsConsent';
import { Analytics } from '@/components/Analytics';
import { ScrollTracker } from '@/components/ScrollTracker';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://anpassadwebb.se'),
  title: 'Hemsidor & Webbutveckling i Uppsala - Anpassad Webb',
  description: 'Vi skapar professionella hemsidor i Uppsala. Specialister på webbutveckling med fokus på responsiv design som hjälper lokala företag att växa online.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://anpassadwebb.se',
    siteName: 'Anpassad Webb',
    title: 'Hemsidor & Webbutveckling i Uppsala - Anpassad Webb',
    description: 'Vi skapar professionella hemsidor i Uppsala. Specialister på webbutveckling med fokus på responsiv design som hjälper lokala företag att växa online.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemsidor & Webbutveckling i Uppsala - Anpassad Webb',
    description: 'Vi skapar professionella hemsidor i Uppsala. Specialister på webbutveckling med fokus på responsiv design som hjälper lokala företag att växa online.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};
const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '600', '700', '800'],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300'],
});
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${open_sans.variable} ${montserrat.variable} ${quicksand.variable} bg-gradient-to-br from-slate-50 to-stone-50 dark:from-slate-900 dark:to-stone-900 flex min-h-svh flex-col overflow-y-scroll`}
      >
        <OrganizationJsonLd
          name="Anpassad Webb"
          description="Vi skapar professionella hemsidor i Uppsala. Specialister på webbutveckling Uppsala med fokus på responsiv design som hjälper lokala företag att växa online."
          url="https://anpassadwebb.se"
          email="kontakt@anpassadwebb.se"
          address={{
            addressLocality: 'Uppsala',
            addressCountry: 'SE',
          }}
        />
        <WebSiteJsonLd
          name="Anpassad Webb"
          description="Vi skapar professionella hemsidor i Uppsala. Specialister på webbutveckling Uppsala med fokus på responsiv design som hjälper lokala företag att växa online."
          url="https://anpassadwebb.se"
        />
        <Providers>
          <Header />
          <main className="mt-4 flex-grow md:mt-8">{children}</main>
          <Footer />
          <Modal />
          <CookieBanner />
        </Providers>
        <GoogleAnalyticsConsent />
        <Analytics />
        <ScrollTracker />
      </body>
    </html>
  );
}
