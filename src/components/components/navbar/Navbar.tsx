import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Logo from './Logo';
import DarkMode from './DarkMode';
import MobileToggleButton from './MobileToggleButton';

const Navbar = () => {
  return (
    <header className="container flex items-center justify-between py-8">
      <div>
        <Logo />
      </div>
      <h3 className="hidden md:inline-block">links</h3>
      <div className="flex items-center gap-4">
        <MobileToggleButton />
        <DarkMode />
      </div>
    </header>
  );
};
export default Navbar;
