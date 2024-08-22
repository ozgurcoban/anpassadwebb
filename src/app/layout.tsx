import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

import './globals.css';
import Providers from '@/providers';
import Navbar from '@/components/components/navbar/Navbar';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container py-10">
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
        </Providers>
      </body>
    </html>
  );
}
