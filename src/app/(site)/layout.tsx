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
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${open_sans.variable} ${poppins.variable} flex min-h-svh flex-col overflow-y-scroll`}
      >
        {draftMode().isEnabled && (
          <a
            className="fixed bottom-0 right-0 m-4 bg-blue-500 p-4 text-white"
            href="/api/draft-mode/disable"
          >
            Disable preview mode
          </a>
        )}
        <Providers>
          <Navbar />
          <main className="container mt-4 flex-grow md:mt-8">{children}</main>
          <Footer />
          <Modal />
          {draftMode().isEnabled && <VisualEditing />}
        </Providers>
      </body>
    </html>
  );
}
