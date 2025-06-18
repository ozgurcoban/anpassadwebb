'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLinks } from '@/utils/links';

type DesktopNavbarProps = {
  links: NavLinks[];
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ links }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname],
  );

  useEffect(() => {
    if (navbarRef.current && bubbleRef.current && liRefs.current) {
      const activeLinkIndex = links.findIndex((link) => isActive(link.href));
      const activeLink = liRefs.current[activeLinkIndex];

      if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();

        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        // Direct transform for better performance
        bubbleRef.current.style.transform = `translateX(${left}px)`;
        bubbleRef.current.style.width = `${width}px`;
      }
    }
  }, [pathname, links, isActive]);

  return (
    <nav
      ref={navbarRef}
      className="relative hidden rounded-full bg-muted/60 backdrop-blur-md md:flex"
    >
      <ul className="flex py-2">
        {/* Animated Bubble - Ultra Optimized */}
        <span
          ref={bubbleRef}
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 rounded-full bg-accent mix-blend-difference will-change-transform"
          style={{
            transition: 'transform 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6), width 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          }}
        />
        
        {/* Links */}
        {links.map(({ label, href }, index) => (
          <li
            key={href}
            className="px-4 py-1"
            ref={(el) => {
              liRefs.current[index] = el;
            }}
          >
            <Link
              href={href}
              className="relative z-20 rounded-full px-3 py-1.5 text-sm font-medium uppercase text-secondary-foreground outline-sky-400 transition-colors hover:text-foreground focus-visible:outline-2"
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavbar;