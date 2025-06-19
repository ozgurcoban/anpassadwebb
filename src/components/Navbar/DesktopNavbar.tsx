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

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative hidden md:flex",
        "rounded-full bg-muted/60 backdrop-blur-md",
        "[clip-path:inset(0_round_9999px)]"
      )}
    >
      <ul className="flex py-2">
        {/* Animated Bubble */}
        <span
          ref={bubbleRef}
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10",
            "rounded-full bg-accent",
            "will-change-transform",
            "mix-blend-difference"
          )}
          style={{
            transition: 'transform 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6), width 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6)'
          }}
        />
        
        {/* Navigation Links */}
        {links.map(({ label, href }) => (
          <li key={href} className="px-4 py-1">
            <Link
              href={href}
              className={cn(
                "relative z-20 block",
                "rounded-full px-3 py-1.5",
                "text-sm font-medium uppercase",
                "text-secondary-foreground",
                "transition-colors hover:text-foreground",
                "outline-sky-400 focus-visible:outline-2",
                "select-none touch-none"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}