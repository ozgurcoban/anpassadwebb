import React from 'react';
import { UI_TEXT } from '../constants';

export const HelpText = React.memo(() => (
  <div className="absolute bottom-4 right-4 z-50 hidden md:block">
    <div className="bg-black/70 backdrop-blur-md text-white px-4 py-3 rounded-lg text-sm text-right border border-white/20">
      <div className="font-semibold mb-1">{UI_TEXT.keyboardShortcuts}</div>
      <div>{UI_TEXT.scrollZoom}</div>
      <div>{UI_TEXT.dragToMove}</div>
      <div>{UI_TEXT.fitToScreenShortcut}</div>
    </div>
  </div>
));

HelpText.displayName = 'HelpText';