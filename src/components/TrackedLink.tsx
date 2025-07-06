'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/gtag';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  trackingLabel?: string;
  trackingLocation?: string;
  children: React.ReactNode;
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ trackingLabel, trackingLocation, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (trackingLabel && trackingLocation) {
        trackCTAClick(trackingLabel, trackingLocation);
      }
      onClick?.(e);
    };

    return (
      <Link ref={ref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);

TrackedLink.displayName = 'TrackedLink';

interface TrackedButtonProps extends React.ComponentProps<typeof Button> {
  href: string;
  trackingLabel?: string;
  trackingLocation?: string;
}

export const TrackedButton = forwardRef<HTMLAnchorElement, TrackedButtonProps>(
  ({ href, trackingLabel, trackingLocation, ...buttonProps }, ref) => {
    return (
      <Button asChild {...buttonProps}>
        <TrackedLink
          ref={ref}
          href={href}
          trackingLabel={trackingLabel}
          trackingLocation={trackingLocation}
        >
          {buttonProps.children}
        </TrackedLink>
      </Button>
    );
  }
);

TrackedButton.displayName = 'TrackedButton';