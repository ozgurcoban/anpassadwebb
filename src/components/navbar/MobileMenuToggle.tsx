'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { links } from '@/utils/links';

import { Button } from '@/components/ui/button';
import NavLinks from './NavLinks';

const MobileMenuToggle = () => {
  const [open, setOpen] = useState(false);
  const mobileLinks = [{ href: '/', label: 'Home' }, ...links];

  const handleMenu = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button
          className="gap-2"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Menu <ChevronDown className="size-3" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-start">
        <SheetTitle hidden={true}>Menu</SheetTitle>
        <NavLinks
          links={mobileLinks}
          className=""
          activeClass="bg-red-500"
          onLinkClick={handleMenu}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuToggle;
