import { Open_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
const openSans = Open_Sans({ subsets: ['latin'] });
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} flex min-h-svh flex-col overflow-y-scroll`}
      >
         {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4"
            href="/api/draft-mode/disable"
          >
            Disable preview mode
          </a>
        )}
        <Providers>
          <Navbar />
          <main className="container mt-8 flex-grow">{children}</main>
          <Footer />
          <Modal />
        </Providers>
        {draftMode().isEnabled && <VisualEditing />}

      </body>
    </html>
  );
}
