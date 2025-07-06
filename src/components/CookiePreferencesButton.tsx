'use client';

import { useState } from 'react';
import { Cookie } from 'lucide-react';
import CookiePreferences from './CookiePreferences';

interface CookiePreferencesButtonProps {
  className?: string;
}

export default function CookiePreferencesButton({ className }: CookiePreferencesButtonProps) {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPreferences(true)}
        className={className}
        aria-label="Cookie-inställningar"
      >
        <Cookie className="inline h-3 w-3 mr-1" />
        Cookie-inställningar
      </button>
      
      <CookiePreferences 
        open={showPreferences} 
        onClose={() => setShowPreferences(false)}
      />
    </>
  );
}