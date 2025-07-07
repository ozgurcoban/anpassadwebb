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
      <DialogContent className="h-[100dvh] max-h-[100dvh] gap-0 overflow-y-auto p-0 sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg">
        <div className="flex min-h-full flex-col p-4 sm:p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-left text-xl sm:text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription className="text-left text-sm sm:text-base">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
