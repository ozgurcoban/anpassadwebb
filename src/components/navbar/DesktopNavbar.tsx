// For reference: Tutorials on animating navbar modal with Framer Motion
// https://www.youtube.com/watch?v=obib4ka06y0&t=41s
// https://www.youtube.com/watch?v=kep_Iaxuzy0&t=0s

'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NavLinks } from '@/utils/links';
import Link from 'next/link';

type DesktopNavbarProps = {
  links: NavLinks[];
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ links }) => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  return (
    <nav className="hidden rounded-full border-2 border-muted/60 bg-muted/60 p-2 backdrop-blur-md md:flex">
      <ul className="flex space-x-8">
        {links.map(({ label, href }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${
                  isActive(href) ? '' : 'hover:text-muted'
                } relative rounded-full px-3 py-1.5 text-sm font-medium uppercase text-secondary-foreground outline-sky-400 transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {isActive(href) ? (
                  <motion.span
                    layoutId="bubble"
                    className="pointer-events-none absolute inset-[-0.25rem] rounded-[9999px] bg-accent mix-blend-difference"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                ) : null}

                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
