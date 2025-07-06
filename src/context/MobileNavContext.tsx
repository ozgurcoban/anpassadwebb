'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MobileNavContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeRoute: string | null;
  setActiveRoute: (route: string | null) => void;
}

const MobileNavContext = createContext<MobileNavContextType | undefined>(undefined);

export const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error('useMobileNav must be used within a MobileNavProvider');
  }
  return context;
};

interface MobileNavProviderProps {
  children: ReactNode;
}

export const MobileNavProvider = ({ children }: MobileNavProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  return (
    <MobileNavContext.Provider 
      value={{ 
        isMenuOpen, 
        setIsMenuOpen, 
        activeRoute, 
        setActiveRoute 
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
};