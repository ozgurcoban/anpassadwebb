import { Open_Sans, Montserrat, Quicksand } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anpassad Webb - Skräddarsydda hemsidor för företag',
  description: 'Vi skapar professionella, responsiva hemsidor som hjälper ditt företag att växa online.',
  robots: 'noindex, nofollow',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${open_sans.variable} ${montserrat.variable} ${quicksand.variable} bg-background flex min-h-svh flex-col overflow-y-scroll`}
      >
        <Providers>
          <Header />
          <main className="mt-4 flex-grow md:mt-8">{children}</main>
          <Footer />
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
