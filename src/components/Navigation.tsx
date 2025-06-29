'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLinks } from '@/utils/links';
import { cn } from '@/lib/utils';

// Style constants
const navStyles = {
  container: cn(
    'relative hidden rounded-full pr-[2px] md:flex',
    'bg-background/80',
    'backdrop-blur-md',
    'border border-border/30',
    'shadow-sm',
    '[clip-path:inset(0_round_9999px)]',
    'transition-all duration-300',
    'hover:shadow-xl hover:shadow-foreground/10',
  ),
  bubble: cn(
    'pointer-events-none absolute inset-y-0 left-0 z-10 rounded-full will-change-transform',
    'bg-gradient-to-r from-brand-purple to-brand-pink', // Gradient matching logo
    'opacity-95', // Slight transparency for depth
    'transition-all duration-300',
    'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-brand-purple/20 before:to-brand-pink/20 before:blur-xl before:-z-10' // Glow effect
  ),
  bubbleTransition: 'transform 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6), width 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

// Custom hook for bubble animation
function useBubbleAnimation(
  links: NavLinks[],
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current || !bubbleRef.current) return;

    // Find active link
    const activeIndex = links.findIndex(({ href }) =>
      href === '/' ? pathname === href : pathname.startsWith(href),
    );

    if (activeIndex === -1) return;

    // Get link element and calculate position
    const linkElements = containerRef.current.querySelectorAll('li');
    const activeLink = linkElements[activeIndex];

    if (!activeLink) return;

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Update bubble position
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;

    bubbleRef.current.style.transform = `translateX(${left}px)`;
    bubbleRef.current.style.width = `${width}px`;
  }, [pathname, links, containerRef]);

  return bubbleRef;
}

// NavLink component
type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative z-20 flex items-center px-6 py-4',
        'text-sm font-medium uppercase tracking-wide',
        'outline-none transition-transform duration-300 ease-out',
        !isActive && 'hover:scale-[1.01]',
      )}
    >
      {/* Dual-layer text for smooth transition */}
      <span className="relative">
        {/* Base text layer */}
        <span 
          className={cn(
            'relative transition-all duration-700 ease-out',
            isActive 
              ? 'text-transparent' 
              : 'text-muted-foreground dark:text-white/70',
            !isActive && 'group-hover:text-foreground'
          )}
          style={{
            transitionDelay: isActive ? '100ms' : '400ms',
            textShadow: !isActive ? undefined : 'none',
          }}
        >
          {label}
        </span>
        
        {/* White text layer for active state */}
        <span 
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-out',
            isActive ? 'text-white opacity-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]' : 'text-white opacity-0'
          )}
          style={{
            transitionDelay: isActive ? '200ms' : '0ms'
          }}
        >
          {label}
        </span>
        
      </span>
    </Link>
  );
}

type NavigationProps = {
  links: NavLinks[];
};

export default function Navigation({ links }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const bubbleRef = useBubbleAnimation(links, navRef);
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isLinkActive = (href: string) => 
    href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <nav ref={navRef} className={navStyles.container}>

      <ul className="relative flex">
        {/* Animated Bubble */}
        <span
          ref={bubbleRef}
          className={navStyles.bubble}
          style={{
            transition: navStyles.bubbleTransition,
          }}
        />

        {/* Navigation Links */}
        {links.map(({ label, href }) => (
          <li key={href} className="flex items-stretch">
            <NavLink 
              href={href} 
              label={label} 
              isActive={isLinkActive(href)} 
            />
          </li>
        ))}
      </ul>

    </nav>
  );
}
