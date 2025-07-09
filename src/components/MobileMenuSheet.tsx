'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// Full navigation links including secondary pages
const fullNavLinks = [
  { href: '/', label: 'Hem' },
  { href: '/case', label: 'Case' },
  { href: '/blogg', label: 'Blogg' },
  { href: '/paket', label: 'Paket' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/boka-mote', label: 'Boka möte' },
  { href: '/integritetspolicy', label: 'Integritetspolicy' },
];

interface MobileMenuSheetProps {
  triggerClassName?: string;
}

export default function MobileMenuSheet({ triggerClassName }: MobileMenuSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => 
    href === '/' ? pathname === href : pathname.startsWith(href);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'relative md:hidden',
            triggerClassName
          )}
          aria-label="Öppna meny"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className={cn(
          'w-[85vw] sm:w-[380px] p-0',
          'bg-background/95 backdrop-blur-xl'
        )}
      >
        {/* Header with gradient accent */}
        <SheetHeader className="relative p-6 pb-4 border-b border-border/30">
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-br from-brand-purple/10 to-brand-pink/10',
            'opacity-50'
          )} />
          <SheetTitle className="relative text-xl font-bold">
            Meny
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4">
          {fullNavLinks.map(({ href, label }) => {
            const isActive = isLinkActive(href);
            
            return (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={cn(
                  'relative flex items-center px-4 py-3 rounded-lg',
                  'text-base font-medium',
                  'transition-all duration-200',
                  'hover:bg-muted/50',
                  'group outline-none focus-visible:ring-2 focus-visible:ring-brand-purple',
                  isActive && 'bg-muted'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2',
                    'w-1 h-8 rounded-r-full',
                    'bg-gradient-to-b from-brand-purple to-brand-pink'
                  )} />
                )}
                
                {/* Link text */}
                <span className={cn(
                  'relative transition-colors duration-200',
                  isActive 
                    ? 'text-foreground font-semibold' 
                    : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer with brand gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className={cn(
            'h-1 w-full rounded-full',
            'bg-gradient-to-r from-brand-purple to-brand-pink',
            'opacity-30'
          )} />
        </div>
      </SheetContent>
    </Sheet>
  );
}