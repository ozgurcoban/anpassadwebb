'use client';

import { useState, useEffect } from 'react';
import { useCookieConsent, CookiePreferences as CookiePrefs } from '@/hooks/useCookieConsent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, BarChart3 } from 'lucide-react';

interface CookiePreferencesProps {
  open: boolean;
  onClose: () => void;
}

export default function CookiePreferences({ open, onClose }: CookiePreferencesProps) {
  const { preferences, updatePreferences, acceptAll, rejectAll } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState<CookiePrefs>(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleToggle = (type: keyof CookiePrefs) => {
    if (type === 'necessary') return; // Can't toggle necessary cookies
    
    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    onClose();
  };

  const handleAcceptAll = () => {
    acceptAll();
    onClose();
  };

  const handleRejectAll = () => {
    rejectAll();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cookie-inställningar</DialogTitle>
          <DialogDescription>
            Hantera dina cookie-preferenser. Du kan välja vilka typer av cookies 
            du vill tillåta på vår webbplats.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Necessary Cookies */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="necessary" className="text-base font-semibold">
                    Nödvändiga cookies
                  </Label>
                  <Checkbox
                    id="necessary"
                    checked={true}
                    disabled
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. 
                  De kan inte stängas av eftersom de krävs för grundläggande funktioner 
                  som navigering och säkerhet.
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  <p className="font-medium mb-1">Inkluderar:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Sessionshantering</li>
                    <li>Säkerhetsfunktioner</li>
                    <li>Sparande av cookie-preferenser</li>
                    <li>Tema-inställningar (ljust/mörkt läge)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Analytics Cookies */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics" className="text-base font-semibold">
                    Analytiska cookies (Google Analytics)
                  </Label>
                  <Checkbox
                    id="analytics"
                    checked={localPreferences.analytics}
                    onCheckedChange={() => handleToggle('analytics')}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Vi använder Google Analytics 4 för att förstå hur besökare använder vår 
                  webbplats. All data samlas in anonymt och hjälper oss att förbättra 
                  webbplatsens prestanda och användarupplevelse.
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  <p className="font-medium mb-1">Vi samlar in:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Sidvisningar och besöksstatistik</li>
                    <li>Geografisk plats (stad/region-nivå)</li>
                    <li>Enhetstyp och webbläsarinformation</li>
                    <li>Trafiккällor och användarflöden</li>
                  </ul>
                  <p className="mt-2 font-medium">Integritetsskydd:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>IP-adresser anonymiseras automatiskt</li>
                    <li>Ingen personlig information samlas in</li>
                    <li>Data lagras i 14 månader</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleRejectAll}
            className="w-full sm:w-auto"
          >
            Endast nödvändiga
          </Button>
          <Button
            variant="outline"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto"
          >
            Acceptera alla
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            Spara mina val
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}