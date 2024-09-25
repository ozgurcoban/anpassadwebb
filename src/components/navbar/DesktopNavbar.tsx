// For reference: Tutorials on animating navbar modal with Framer Motion
// https://www.youtube.com/watch?v=obib4ka06y0&t=41s
// https://www.youtube.com/watch?v=kep_Iaxuzy0&t=0s

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
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
      const navbarRect = navbarRef.current.getBoundingClientRect();
      const activeLinkIndex = links.findIndex((link) => isActive(link.href));
      // console.log(activeLinkIndex);

      const linkRect = liRefs.current[activeLinkIndex]?.getBoundingClientRect();

      if (linkRect) {
        let left = linkRect.left - navbarRect.left;
        let width = linkRect.width;

        if (activeLinkIndex === 0) {
          left = 0;
          width = linkRect.right - navbarRect.left;
        } else if (activeLinkIndex === links.length - 1) {
          left = linkRect.left - navbarRect.left;
          width = navbarRect.right - linkRect.left;
        }

        setPosition({ left, width });
      }
    }
  }, [pathname, links, isActive]);

  return (
    <nav
      ref={navbarRef}
      className="hidden rounded-full bg-muted/60 backdrop-blur-md md:flex"
    >
      <ul className="relative flex py-2">
        {/* Bubble */}
        {position && (
          <motion.span
            layoutId="bubble"
            className="absolute bottom-0 top-0 z-10 rounded-full bg-accent mix-blend-difference"
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
    </nav>
  );
};

export default DesktopNavbar;
