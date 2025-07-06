'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const bottomNavItems = [
  { href: '/', label: 'Hem', icon: Home },
  { href: '/paket', label: 'Paket', icon: Package },
  { href: '/blogg', label: 'Blogg', icon: BookOpen },
  { href: '/kontakt', label: 'Kontakt', icon: Mail },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => 
    href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50 md:hidden',
      'bg-background/95 backdrop-blur-md',
      'border-t border-border/30',
      'px-2 pb-safe' // pb-safe for iOS safe area
    )}>
      <div className="flex items-center justify-around">
        {bottomNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = isLinkActive(href);
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'min-w-[64px] py-2 px-3',
                'transition-all duration-200',
                'group outline-none',
                'touch-manipulation' // Improves touch responsiveness
              )}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active indicator background */}
              {isActive && (
                <span className={cn(
                  'absolute inset-0 -top-1',
                  'bg-gradient-to-b from-brand-purple/20 to-brand-pink/20',
                  'blur-xl opacity-50',
                  'transition-opacity duration-300'
                )} />
              )}
              
              {/* Icon container */}
              <div className={cn(
                'relative flex items-center justify-center',
                'w-12 h-12 rounded-full',
                'transition-all duration-300',
                isActive && 'scale-110'
              )}>
                {/* Icon gradient background for active state */}
                {isActive && (
                  <span className={cn(
                    'absolute inset-0 rounded-full',
                    'bg-gradient-to-r from-brand-purple to-brand-pink',
                    'opacity-90'
                  )} />
                )}
                
                <Icon 
                  className={cn(
                    'relative z-10 w-5 h-5',
                    'transition-all duration-300',
                    isActive 
                      ? 'text-white' 
                      : 'text-muted-foreground group-hover:text-foreground'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              
              {/* Label */}
              <span className={cn(
                'text-xs font-medium mt-1',
                'transition-colors duration-300',
                isActive 
                  ? 'text-foreground' 
                  : 'text-muted-foreground group-hover:text-foreground'
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}