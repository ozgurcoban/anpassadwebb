'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import * as gtag from '@/lib/gtag';

interface GA4Event {
  id: string;
  timestamp: string;
  command: string;
  parameters: any;
}

let eventCounter = 0;

export default function GA4Debug() {
  const [events, setEvents] = useState<GA4Event[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;
    if (!isMounted) return;

    // Initialize gtag if needed
    gtag.initializeGtag();

    // Wait a bit for GA4 script to load
    setTimeout(() => {
      // Override window.gtag to capture events
      const originalGtag = window.gtag;
    
    window.gtag = function(...args: any[]) {
      const [command, ...params] = args;
      
      // Log to console
      console.log('🎯 GA4 Event:', { command, params });
      
      // Add to our debug list with unique ID
      const event: GA4Event = {
        id: `${Date.now()}-${++eventCounter}`,
        timestamp: new Date().toLocaleTimeString(),
        command,
        parameters: params,
      };
      
      setEvents(prev => [event, ...prev].slice(0, 20)); // Keep last 20 events
      
      // Call original gtag
      if (originalGtag) {
        originalGtag.apply(window, args);
      }
    };

      return () => {
        // Restore original gtag on cleanup
        window.gtag = originalGtag;
      };
    }, 100); // Wait 100ms for GA4 to initialize
  }, [isMounted]);

  const testEvents = () => {
    // Initialize gtag if needed
    gtag.initializeGtag();
    
    // Run events with slight delays to ensure they're captured
    setTimeout(() => {
      gtag.trackContactFormSubmission('test_package');
    }, 0);
    
    setTimeout(() => {
      gtag.trackPackageSelection('Premium');
    }, 100);
    
    setTimeout(() => {
      gtag.trackCTAClick('Test Button', 'debug_panel');
    }, 200);
    
    setTimeout(() => {
      gtag.trackExternalLink('https://example.com');
    }, 300);
    
    setTimeout(() => {
      gtag.trackScrollDepth(50);
    }, 400);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  // Don't render in production or before mounting
  if (process.env.NODE_ENV !== 'development' || !isMounted) return null;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
        size="sm"
        variant="outline"
      >
        GA4 Debug
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] overflow-hidden shadow-lg border-2 border-primary/20">
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <h3 className="font-semibold text-sm">GA4 Debug Panel</h3>
        <div className="flex gap-1">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="p-3 space-y-2 border-b">
            <div className="text-xs text-muted-foreground">
              GA4 ID: {process.env.NEXT_PUBLIC_GA_ID || 'Not configured'}
            </div>
            <div className="text-xs text-muted-foreground">
              NODE_ENV: {process.env.NODE_ENV}
            </div>
            {!process.env.NEXT_PUBLIC_GA_ID && (
              <div className="text-xs text-destructive">
                ⚠️ GA4 not configured. Add NEXT_PUBLIC_GA_ID to .env.local
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                onClick={testEvents} 
                size="sm" 
                variant="outline"
                disabled={!process.env.NEXT_PUBLIC_GA_ID}
              >
                Test All Events
              </Button>
              <Button onClick={clearEvents} size="sm" variant="outline">
                Clear
              </Button>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[400px] p-3">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No events captured yet. Navigate the site or click &quot;Test All Events&quot;.
              </p>
            ) : (
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded border bg-muted/30 text-xs space-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-semibold text-primary">
                        {event.command}
                      </span>
                      <span className="text-muted-foreground">
                        {event.timestamp}
                      </span>
                    </div>
                    <pre className="text-[10px] overflow-x-auto text-muted-foreground">
                      {JSON.stringify(event.parameters, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}