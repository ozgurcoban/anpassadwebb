'use client';

import { links } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  // links: NavLink[];
  className?: string;
  activeClass?: string;
  onLinkClick?: () => void;
  shouldEmphasizeFirstLetter?: boolean;
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
  className = '',
  activeClass = '',
  onLinkClick,
  shouldEmphasizeFirstLetter = false,
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    // Mark 'Hem' as active when on legal pages
    if (href === '/' && (pathname === '/villkor' || pathname === '/integritetspolicy')) {
      return true;
    }
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {links.map(({ label, href }) => {
        return (
          <li key={href}>
            <Link
              href={href}
              className={isActive(href) ? activeClass : className}
              onClick={onLinkClick}
            >
              {shouldEmphasizeFirstLetter ? emphasizeFirstLetter(label) : label}
            </Link>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
