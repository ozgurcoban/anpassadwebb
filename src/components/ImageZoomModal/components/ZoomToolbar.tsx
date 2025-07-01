import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ZOOM_SETTINGS, UI_TEXT } from '../constants';

interface ZoomToolbarProps {
  scale: number;
  isToolbarVisible: boolean;
  showToolbar: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fitToScreen: () => void;
}

export const ZoomToolbar = React.memo(({
  scale,
  isToolbarVisible,
  showToolbar,
  zoomIn,
  zoomOut,
  fitToScreen,
}: ZoomToolbarProps) => (
  <div 
    className={cn(
      "absolute top-2 left-2 right-14 md:top-4 md:left-4 md:right-16 z-50 hidden md:flex items-center justify-between transition-opacity duration-300",
      isToolbarVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}
    onMouseEnter={showToolbar}
  >
    <div className="flex items-center gap-2">
      {/* Title space is handled by DialogTitle */}
    </div>
    
    <div className="flex items-center gap-1 md:gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= ZOOM_SETTINGS.minScale}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
          >
            <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{UI_TEXT.zoomOut}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= ZOOM_SETTINGS.maxScale}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
          >
            <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{UI_TEXT.zoomIn}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={fitToScreen}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200 h-8 w-8 md:h-9 md:w-9"
          >
            <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{UI_TEXT.fitToScreen}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
));

ZoomToolbar.displayName = 'ZoomToolbar';