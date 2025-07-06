'use client';

import { Logo, DarkMode } from './Navbar';
import Navigation from './Navigation';
import MobileMenuSheet from './MobileMenuSheet';
import { links } from '@/utils/links';
import { useAutoHideHeader } from '@/hooks/useAutoHideHeader';

const Header = () => {
  const { transform } = useAutoHideHeader();

  return (
    <header 
      className="sticky top-0 z-[20] bg-background/90 backdrop-blur-sm shadow-sm dark:shadow-md relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/50 after:to-transparent transition-transform duration-300 ease-out will-change-transform"
      style={{ transform }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between pt-8 pb-4">
          <div className="size-15">
            <Logo />
          </div>
          <Navigation links={links} />

          <div className="flex items-center gap-4">
            <DarkMode />
            <MobileMenuSheet />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
