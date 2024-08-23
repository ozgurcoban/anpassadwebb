'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';
import { links } from '@/utils/links';

const MobileMenuToggle = () => {
  const pathname = usePathname();
  // const basePath = '/studio';
  console.log('pathname:', pathname);

  const mobileLinks = useMemo(() => {
    const pathArray = pathname.split('/').filter(Boolean); // Split pathname into an array and remove empty strings
    return [{ href: pathname, label: pathArray.shift() }, ...links];
  }, [pathname]);

  // console.log(mobileLinks);

  return (
    <Sheet>
      <SheetTrigger asChild className="flex md:hidden">
        <Button className="gap-2" variant="outline">
          Menu <ChevronDown className="size-3" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-start">
        <SheetHeader className="flex items-start">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Select an Option</SheetDescription>
        </SheetHeader>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col items-start space-x-0">
            {mobileLinks.map((link) => {
              console.log('href: ', link.href);

              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    asChild
                    // className={isActive ? `[data-active]:text-orange` : ''}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuToggle;
