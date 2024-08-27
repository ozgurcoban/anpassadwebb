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
    return href === pathname;
  };
  return (
    <nav className="hidden rounded-full bg-muted p-2 md:flex">
      <ul>
        <li className="flex space-x-8">
          {links.map(({ label, href }) => {
            return (
              <Link
                key={href}
                href={href}
                className={`${
                  isActive(href) ? '' : 'hover:accent-foreground'
                } relative rounded-full px-3 py-1.5 text-sm font-medium uppercase outline-sky-400 transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {isActive(href) ? (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-[-0.25rem] z-10 bg-primary text-foreground mix-blend-difference"
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
            );
          })}
        </li>
      </ul>
    </nav>
  );
};
export default DesktopNavbar;
