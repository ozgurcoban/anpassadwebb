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
    'bg-gradient-to-r from-slate-50/95 via-white/90 to-slate-50/95',
    'dark:from-slate-900/90 dark:via-slate-800/95 dark:to-slate-900/90',
    'backdrop-blur-xl backdrop-saturate-150',
    'border border-slate-300/60 dark:border-slate-700/50',
    'shadow-lg shadow-slate-900/10 dark:shadow-slate-100/5',
    'ring-1 ring-slate-900/5 dark:ring-slate-100/5',
    '[clip-path:inset(0_round_9999px)]',
    'transition-all duration-300',
    'hover:shadow-xl hover:shadow-slate-900/15 dark:hover:shadow-slate-100/10',
  ),
  bubble: 'pointer-events-none absolute inset-y-0 left-0 z-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90 will-change-transform',
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
        !isActive && 'hover:scale-[1.02]',
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
              : 'text-slate-600 dark:text-slate-400',
            !isActive && 'group-hover:text-slate-900 group-hover:tracking-wider dark:group-hover:text-slate-100'
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
            isActive ? 'text-white opacity-100' : 'text-white opacity-0'
          )}
          style={{
            transitionDelay: isActive ? '200ms' : '0ms'
          }}
        >
          {label}
        </span>
        
        {/* Subtle glow effect on hover */}
        {!isActive && (
          <span 
            className="absolute inset-0 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            }}
          />
        )}
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

      {/* Glass effect */}
      <div className="absolute inset-0 rounded-full bg-white/5 dark:bg-white/10" />

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

      {/* Bottom accent line */}
      <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </nav>
  );
}
