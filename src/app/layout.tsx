import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} overflow-y-scroll`}>
        <Providers>
          <Navbar />
          <main className="container mt-16">
            {draftMode().isEnabled && (
              <a
                className="fixed bottom-0 right-0 m-4 bg-blue-500 p-4 text-white"
                href="/api/draft-mode/disable"
              >
                Disable preview mode
              </a>
            )}

            {children}

            {draftMode().isEnabled && <VisualEditing />}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
