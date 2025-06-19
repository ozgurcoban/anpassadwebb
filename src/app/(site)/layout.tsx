import { Open_Sans, Poppins } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '600', '700', '800'],
});
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${open_sans.variable} ${poppins.variable} flex min-h-svh flex-col overflow-y-scroll`}
      >
        <Providers>
          <Navbar />
          <main className="container mt-4 flex-grow md:mt-8">{children}</main>
          <Footer />
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
