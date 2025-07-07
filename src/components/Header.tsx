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
      className="relative sticky top-0 z-[20] bg-background/90 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-out will-change-transform after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/50 after:to-transparent dark:shadow-md"
      style={{ transform }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between md:pb-4 md:pt-8">
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
