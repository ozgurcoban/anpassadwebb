import Logo from './Logo';
import DarkMode from './DarkMode';
import DesktopNavbar from './DesktopNavbar';
import { links } from '@/utils/links';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[20] flex items-center justify-between px-8 pt-8">
      <div className="size-15">
        <Logo />
      </div>
      <DesktopNavbar links={links} />

      <div className="flex items-center gap-4">
        <DarkMode />
      </div>
    </header>
  );
};
export default Navbar;
