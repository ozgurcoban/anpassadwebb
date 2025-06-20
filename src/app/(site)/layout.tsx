import { Open_Sans, Montserrat, Quicksand } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
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
