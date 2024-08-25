'use client';

import { useState, useEffect } from 'react';
import { NavLink } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  links: NavLink[];
  className?: string;
  activeClass?: string;
  onLinkClick?: () => void;
};

const emphasizeFirstLetter = (text: string) => {
  if (!text || text.length === 0) return text;

  const firstLetter = text[0];
  const restOfText = text.slice(1);

  return (
    <span className="text-4xl">
      <span className="text-[2.75rem]">{firstLetter}</span>
      {restOfText}
    </span>
  );
};

const NavLinks: React.FC<NavLinkProps> = ({
  links,
  className = '',
  activeClass = '',
  onLinkClick,
}) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <nav>
      <ul>
        {links.map(({ label, href }) => {
          const isActive = currentPath === href;
          console.log('Current pathname:', currentPath);
          console.log('Link href:', href);
          console.log('isActive:', isActive);

          const linkClassName = `${className} ${isActive ? activeClass : ''}`;

          return (
            <li key={href}>
              <Link href={href} className={linkClassName} onClick={onLinkClick}>
                {emphasizeFirstLetter ? emphasizeFirstLetter(label) : label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavLinks;
