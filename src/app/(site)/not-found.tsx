import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, MessageCircle, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sidan hittades inte | 404 - Anpassad Webb',
  description: 'Sidan du söker kunde inte hittas. Kanske har den flyttats eller tagits bort. Gå tillbaka till startsidan eller kontakta oss för hjälp.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <h1 className="text-[150px] font-bold leading-none text-transparent md:text-[200px]">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            404
          </span>
        </h1>
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Hoppsan! Sidan kunde inte hittas
        </h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Det verkar som att sidan du letar efter har flyttats, tagits bort eller kanske aldrig funnits. 
          Men oroa dig inte, vi hjälper dig hitta rätt!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Till startsidan
            </Button>
          </Link>
          
          <Link href="/kontakt">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <MessageCircle className="mr-2 h-4 w-4" />
              Kontakta oss
            </Button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Här är några användbara länkar som kanske kan hjälpa dig:
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/blogg" className="text-blue-600 hover:underline dark:text-blue-400">
              Blogg
            </Link>
            <Link href="/paket" className="text-blue-600 hover:underline dark:text-blue-400">
              Våra paket
            </Link>
            <Link href="/case" className="text-blue-600 hover:underline dark:text-blue-400">
              Case studies
            </Link>
            <Link href="/boka-mote" className="text-blue-600 hover:underline dark:text-blue-400">
              Boka möte
            </Link>
          </div>
        </div>
      </div>

      {/* Search suggestion */}
      <div className="mt-12 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Search className="h-4 w-4" />
        <span>Tips: Använd navigationen högst upp för att hitta det du söker</span>
      </div>
    </div>
  );
}