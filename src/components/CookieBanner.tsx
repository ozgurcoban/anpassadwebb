'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, X } from 'lucide-react';
import CookiePreferences from './CookiePreferences';

export default function CookieBanner() {
  const { hasConsented, acceptAll, rejectAll } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Show banner if user hasn't consented
    setShowBanner(!hasConsented);
  }, [hasConsented]);

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setShowBanner(false);
  };

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
    setShowBanner(false);
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <Card className="mx-auto max-w-5xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Cookie className="h-6 w-6 flex-shrink-0 text-primary mt-1" />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Vi värnar om din integritet</h3>
                    <p className="text-sm text-muted-foreground">
                      Vi använder cookies för att säkerställa att vår webbplats fungerar korrekt. 
                      Vi använder även Google Analytics för att förstå hur besökare använder 
                      webbplatsen så att vi kan förbättra den. Du kan välja att endast tillåta 
                      nödvändiga cookies om du vill.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleAcceptAll}
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Acceptera alla
                    </Button>
                    <Button 
                      onClick={handleRejectAll}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Endast nödvändiga
                    </Button>
                    <Button 
                      onClick={handleManagePreferences}
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Hantera preferenser
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Läs mer i vår{' '}
                    <Link 
                      href="/integritetspolicy" 
                      className="underline hover:text-primary"
                    >
                      integritetspolicy
                    </Link>
                  </p>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Stäng cookie-banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <CookiePreferences 
        open={showPreferences} 
        onClose={handleClosePreferences}
      />
    </>
  );
}