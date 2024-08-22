import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, LucideArrowDownSquare } from 'lucide-react';

const MobileToggleButton = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center gap-2">
          Menu
          <ChevronDown className="size-2" />
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              labore.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileToggleButton;
