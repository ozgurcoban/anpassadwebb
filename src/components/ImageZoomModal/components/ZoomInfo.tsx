import React from 'react';

interface ZoomInfoProps {
  scale: number;
}

export const ZoomInfo = React.memo(({ scale }: ZoomInfoProps) => (
  <div className="absolute bottom-4 left-4 z-50">
    <div className="bg-black/70 backdrop-blur-md text-white px-4 py-3 rounded-lg text-lg font-bold border border-white/20">
      {Math.round(scale * 100)}%
    </div>
  </div>
));

ZoomInfo.displayName = 'ZoomInfo';