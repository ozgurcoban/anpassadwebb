// For reference: https://medium.com/@descometusah/mastering-dialog-components-in-shadcn-ui-library-9420ac736b9e

'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useDialog from '@/hooks/useDialog';
// import { Button } from './ui/button';

const Modal = () => {
  const { isOpen, onClose, title, description, children } = useDialog();

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-svh gap-0 p-2 sm:mx-auto sm:max-w-lg sm:p-4 md:gap-4">
        <DialogHeader className="mt-6">
          <DialogTitle className="pl-2 text-left text-xl sm:text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription className="sm:text-md px-2 text-justify">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
