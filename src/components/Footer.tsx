'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Navbar/Logo';
import { ContactButton } from './ContactButton';
import { PRIMARY_GRADIENT } from '@/lib/gradient-constants';
import { links } from '@/utils/links';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    // Mark 'Hem' as active when on legal pages
    if (href === '/' && (pathname === '/villkor' || pathname === '/integritetspolicy')) {
      return true;
    }
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <footer className="relative mt-16 w-full bg-gradient-to-b from-background via-muted/30 to-muted/50 dark:from-background dark:via-slate-900/50 dark:to-slate-900">
      {/* Gradient border top */}
      <div className={`absolute inset-x-0 top-0 h-px ${PRIMARY_GRADIENT.full}`} />
      
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main footer content */}
          <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
            {/* Company info */}
            <div className="space-y-6 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="text-lg font-semibold font-heading">Anpassad Webb</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skräddarsydda hemsidor som hjälper företag i Uppsala att växa online.
              </p>
              <ContactButton className="w-full sm:w-auto" />
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Snabblänkar</h3>
              <nav className="flex flex-col gap-3">
                {links.filter(link => link.label !== 'Blogg' && !isActive(link.href)).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="relative">
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full ${PRIMARY_GRADIENT.full}`} />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Våra tjänster</h3>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/paket"
                  className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowRight className="mr-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  Våra paket
                </Link>
                <Link
                  href="/case"
                  className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowRight className="mr-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  Se våra projekt
                </Link>
                <Link
                  href="/blogg"
                  className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowRight className="mr-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  Blogg & resurser
                </Link>
              </nav>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontakt</h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@anpassadwebb.se"
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className={`rounded-lg ${PRIMARY_GRADIENT.backgroundAdaptive} p-2 transition-transform group-hover:scale-110`}>
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span>info@anpassadwebb.se</span>
                </a>
                <a
                  href="tel:+46701234567"
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className={`rounded-lg ${PRIMARY_GRADIENT.backgroundAdaptive} p-2 transition-transform group-hover:scale-110`}>
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <span>070-123 45 67</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className={`rounded-lg ${PRIMARY_GRADIENT.backgroundAdaptive} p-2`}>
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span>Uppsala, Sverige</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/50 py-10">
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Anpassad Webb. Alla rättigheter förbehållna.
              </p>
              <nav className="flex items-center gap-6">
                <Link
                  href="/villkor"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Villkor
                </Link>
                <Link
                  href="/integritetspolicy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Integritetspolicy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
