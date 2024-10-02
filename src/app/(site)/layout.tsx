import { Open_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} flex min-h-svh flex-col overflow-y-scroll`}
      >
        <Providers>
          <Navbar />
          <main className="container mt-16 flex-grow">{children}</main>
          <Footer />
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
