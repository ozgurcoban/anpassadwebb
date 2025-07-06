import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

export interface CookieConsent {
  hasConsented: boolean;
  preferences: CookiePreferences;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  analytics: false,
};

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load consent from localStorage
  useEffect(() => {
    const loadConsent = () => {
      try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
          setConsent(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading cookie consent:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConsent();
  }, []);

  // Save consent to localStorage
  const saveConsent = useCallback((preferences: CookiePreferences) => {
    const newConsent: CookieConsent = {
      hasConsented: true,
      preferences: {
        ...preferences,
        necessary: true, // Ensure necessary is always true
      },
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
      
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
        detail: newConsent 
      }));
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }, []);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
    });
  }, [saveConsent]);

  // Reject all non-necessary cookies
  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
    });
  }, [saveConsent]);

  // Update specific preferences
  const updatePreferences = useCallback((preferences: Partial<CookiePreferences>) => {
    const currentPreferences = consent?.preferences || defaultPreferences;
    saveConsent({
      ...currentPreferences,
      ...preferences,
      necessary: true, // Always keep necessary as true
    });
  }, [consent, saveConsent]);

  // Check if a specific cookie type is allowed
  const isAllowed = useCallback((type: keyof CookiePreferences) => {
    if (!consent?.hasConsented) return false;
    return consent.preferences[type];
  }, [consent]);

  // Reset consent (for testing or user request)
  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsent(null);
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
        detail: null 
      }));
    } catch (error) {
      console.error('Error resetting cookie consent:', error);
    }
  }, []);

  return {
    consent,
    isLoading,
    hasConsented: consent?.hasConsented || false,
    preferences: consent?.preferences || defaultPreferences,
    acceptAll,
    rejectAll,
    updatePreferences,
    isAllowed,
    resetConsent,
  };
}