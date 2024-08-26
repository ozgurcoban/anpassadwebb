'use client';

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
  const isActive = (href: string) => {
    return href === pathname;
  };
  console.log(isActive('/'));

  // console.log('isActive:', isActive);

  return (
    <nav>
      <ul>
        {links.map(({ label, href }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={isActive(href) ? activeClass : className}
                onClick={onLinkClick}
              >
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
