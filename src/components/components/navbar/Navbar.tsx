import { links } from '@/utils/links';
import Logo from './Logo';
import DarkMode from './DarkMode';
import MobileMenuToggle from './MobileMenuToggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// Navigation-menu example
// https://v0.dev/t/efIO1Wze3xI

const Navbar = () => {
  return (
    <header className="container flex items-center justify-between py-8">
      <div className="size-15">
        <Logo />
      </div>
      <NavigationMenu className="hidden gap-2 md:flex">
        <NavigationMenuList>
          {links.map((link) => {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        <MobileMenuToggle />
        <DarkMode />
      </div>
    </header>
  );
};
export default Navbar;
