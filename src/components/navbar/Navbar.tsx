import Logo from './Logo';
import DarkMode from './DarkMode';
import MobileMenuToggle from './MobileMenuToggle';
import DesktopNavbar from './DesktopNavbar';
import { links } from '@/utils/links';

const Navbar = () => {
  return (
    <header className="container flex w-full items-center justify-between py-8">
      <div className="size-15">
        <Logo />
      </div>
      <DesktopNavbar links={links} />

      <div className="flex items-center gap-4">
        <MobileMenuToggle />
        <DarkMode />
      </div>
    </header>
  );
};
export default Navbar;
