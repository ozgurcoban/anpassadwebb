import { Logo, DarkMode } from './Navbar';
import Navigation from './Navigation';
import { links } from '@/utils/links';

const Header = () => {
  return (
    <header className="sticky top-0 z-[20] flex items-center justify-between px-8 pt-8 pb-4">
      <div className="size-15">
        <Logo />
      </div>
      <Navigation links={links} />

      <div className="flex items-center gap-4">
        <DarkMode />
      </div>
    </header>
  );
};
export default Header;
