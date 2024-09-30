// For reference: https://medium.com/@descometusah/mastering-dialog-components-in-shadcn-ui-library-9420ac736b9e

'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AnimatedButton } from './ui/Buttons';
import useDialog from '@/hooks/useDialog';
// import { Button } from './ui/button';

const Modal = () => {
  const { isOpen, onClose, title, description, children } = useDialog();

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-svh sm:mx-auto sm:max-w-lg">
        <DialogHeader className="mt-6">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-md">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <AnimatedButton variant="outline" type="button" onClick={onClose}>
            Stäng
          </AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
