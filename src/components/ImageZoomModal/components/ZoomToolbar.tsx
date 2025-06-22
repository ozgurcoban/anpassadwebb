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
      "absolute top-4 left-4 right-16 z-50 flex items-center justify-between bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 transition-opacity duration-300",
      isToolbarVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}
    onMouseEnter={showToolbar}
  >
    <div className="flex items-center gap-2">
      {/* Title space is handled by DialogTitle */}
    </div>
    
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= ZOOM_SETTINGS.minScale}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200"
          >
            <ZoomOut className="h-5 w-5" />
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
            size="sm"
            onClick={zoomIn}
            disabled={scale >= ZOOM_SETTINGS.maxScale}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200"
          >
            <ZoomIn className="h-5 w-5" />
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
            size="sm"
            onClick={fitToScreen}
            className="bg-white/30 hover:bg-white/40 text-white border-0 backdrop-blur-sm transition-all duration-200"
          >
            <Maximize2 className="h-5 w-5" />
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