// For reference: Tutorial on animating mobile navbar modal with Framer Motion
// https://javascript.plainenglish.io/animating-mobile-navbar-modal-with-framer-motion-ab33f904e201

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { NavLinks } from '@/utils/links';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const linkItemVariants = {
  hidden: { opacity: 0, y: '50%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut', // Add ease-out easing function
    },
  },
  exit: {
    opacity: 0,
    y: '50%',
    transition: {
      duration: 0.1,
      ease: 'easeOut', // Add ease-out easing function
    },
  },
};

const navLinksVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

type MobileMenuToggleProps = {
  links: NavLinks[];
};

const emphasizeFirstLetter = (text: string) => {
  if (!text || text.length === 0) return text;

  const firstLetter = text[0];
  const restOfText = text.slice(1);

  return (
    <span className="text-4xl">
      <span className="text-[2.75rem]">{firstLetter}</span>
      {restOfText}
    </span>
  );
};

//

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ links }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => href === pathname;

  const handleMenu = async () => {
    if (open) {
      // Delay the closing of the menu
      await new Promise((resolve) => setTimeout(resolve, 200));
      setOpen(false);
    } else {
      // Open the menu immediately
      setOpen(true);
    }
  };

  const handleLinkClick = async (href: string) => {
    setOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    router.push(href);
  };

  return (
    <Sheet open={open} onOpenChange={handleMenu}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button className="gap-2" variant="outline" onClick={handleMenu}>
          Menu <ChevronDown className="size-3" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-start p-10">
        <SheetTitle hidden={true}>Menu</SheetTitle>
        <nav>
          <AnimatePresence>
            <motion.ul
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-y-8"
            >
              {links.map(({ label, href }) => {
                return (
                  <motion.li key={href} variants={linkItemVariants}>
                    <Link
                      href={href}
                      className={isActive(href) ? 'font-extrabold' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(href);
                      }}
                    >
                      {emphasizeFirstLetter(label)}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuToggle;
