// For reference: Tutorials on animating navbar modal with Framer Motion
// https://www.youtube.com/watch?v=obib4ka06y0&t=41s
// https://www.youtube.com/watch?v=kep_Iaxuzy0&t=0s

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { NavLinks } from '@/utils/links';
import Link from 'next/link';

type Position = {
  left: number;
  width: number;
};

type DesktopNavbarProps = {
  links: NavLinks[];
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ links }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navbarRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  const pathname = usePathname();
  const [position, setPosition] = useState<Position | null>(null);

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
    if (navbarRef.current && liRefs.current) {
      const activeLinkIndex = links.findIndex((link) => isActive(link.href));
      const activeLink = liRefs.current[activeLinkIndex];

      if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();

        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        setPosition({ left, width });
      }
    }
  }, [pathname, links, isActive, isDesktop]);

  return (
    <motion.nav
      layout
      layoutRoot
      ref={navbarRef}
      className="relative hidden rounded-full bg-muted/60 backdrop-blur-md md:flex"
    >
      <ul className="flex py-2">
        {/* Bubble */}
        {position && (
          <motion.span
            layoutId="bubble"
            initial={false}
            className="pointer-events-none absolute bottom-0 top-0 z-10 rounded-full bg-accent mix-blend-difference"
            style={{
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6,
            }}
          />
        )}
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
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              className="-z-1 relative rounded-full px-3 py-1.5 text-sm font-medium uppercase text-secondary-foreground outline-sky-400 transition focus-visible:outline-2"
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default DesktopNavbar;
