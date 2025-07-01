import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface CloseButtonProps {
  onClose: () => void;
  showToolbar: () => void;
}

export const CloseButton = React.memo(({ onClose, showToolbar }: CloseButtonProps) => (
  <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          onClick={onClose}
          className="bg-black/60 hover:bg-black/70 text-white border-0 backdrop-blur-sm font-bold transition-all duration-200 h-8 w-8 md:h-10 md:w-10"
          onMouseEnter={showToolbar}
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{UI_TEXT.close}</p>
      </TooltipContent>
    </Tooltip>
  </div>
));

CloseButton.displayName = 'CloseButton';