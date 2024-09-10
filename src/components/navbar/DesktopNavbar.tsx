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
    <nav className="hidden rounded-full bg-muted p-2 md:flex">
      <ul className="flex space-x-8">
        {links.map(({ label, href }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${
                  isActive(href) ? '' : 'hover:text-[#E57373]'
                } relative rounded-full px-3 py-1.5 text-sm font-medium uppercase outline-sky-400 transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {isActive(href) ? (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-[-0.25rem] z-10 bg-accent text-primary mix-blend-difference"
                    style={{ borderRadius: 9999 }}
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
