import Logo from './Logo';
import DarkMode from './DarkMode';
import MobileMenuToggle from './MobileMenuToggle';
import DesktopNavbar from './DesktopNavbar';
import { links } from '@/utils/links';

const Navbar = () => {
  return (
    <header className="z-1000 container sticky top-0 flex w-full items-center justify-between pt-8">
      <div className="size-15">
        <Logo />
      </div>
      <DesktopNavbar links={links} />

      <div className="flex items-center gap-4">
        <MobileMenuToggle links={links} />
        <DarkMode />
      </div>
    </header>
  );
};
export default Navbar;
