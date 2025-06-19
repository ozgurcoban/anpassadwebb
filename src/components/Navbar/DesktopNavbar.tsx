'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLinks } from '@/utils/links';
import { cn } from '@/lib/utils';

// Custom hook for bubble animation
function useBubbleAnimation(links: NavLinks[], containerRef: React.RefObject<HTMLElement | null>) {
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current || !bubbleRef.current) return;

    // Find active link
    const activeIndex = links.findIndex(({ href }) => 
      href === '/' ? pathname === href : pathname.startsWith(href)
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

type DesktopNavbarProps = {
  links: NavLinks[];
};

export default function DesktopNavbar({ links }: DesktopNavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const bubbleRef = useBubbleAnimation(links, navRef);
  const pathname = usePathname();

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative hidden md:flex rounded-full",
        "bg-gradient-to-r from-slate-50/80 via-slate-100/80 to-slate-50/80",
        "dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-slate-200/50 dark:border-slate-700/50",
        "shadow-lg shadow-slate-900/5 dark:shadow-slate-100/5",
        "[clip-path:inset(0_round_9999px)]",
        "transition-all duration-300",
        "hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-slate-100/10"
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />
      
      {/* Glass effect */}
      <div className="absolute inset-0 rounded-full bg-white/5 dark:bg-white/10" />
      
      <ul className="relative flex">
        {/* Animated Bubble */}
        <span
          ref={bubbleRef}
          className="pointer-events-none absolute inset-y-0 left-0 z-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90 will-change-transform"
          style={{
            transition: 'transform 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6), width 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6)'
          }}
        />
        
        {/* Navigation Links */}
        {links.map(({ label, href }) => {
          const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
          
          return (
            <li key={href} className="flex items-stretch">
              <Link
                href={href}
                className={cn(
                  "relative z-20 flex items-center px-6 py-4",
                  "text-sm font-medium uppercase tracking-wide",
                  "transition-all duration-300 outline-none",
                  isActive 
                    ? "text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <span className="relative z-10">{label}</span>
                {!isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      
      {/* Bottom accent line */}
      <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </nav>
  );
}