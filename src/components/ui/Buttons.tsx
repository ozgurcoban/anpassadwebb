'use client';

import { Button, ButtonProps } from './button';
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'transition-transform duration-200 ease-out hover:scale-110 active:scale-90',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};