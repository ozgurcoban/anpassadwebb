import Link from 'next/link';
import { Button, ButtonProps } from './button';
import React from 'react';
import { cn } from '@/lib/utils';

type NavigationButtonProps = ButtonProps & {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  return (
    <Button
      asChild
      className={cn(
        'delay-50 before: relative flex items-center justify-center overflow-hidden rounded bg-gray-800 bg-primary text-primary-foreground shadow-2xl transition-all ease-in-out before:absolute before:h-0 before:w-0 before:rounded-full before:bg-pink-500 before:bg-gradient-to-r before:duration-500 hover:text-yellow-400 hover:shadow-orange-600 hover:before:h-56 hover:before:w-56 md:w-fit',
        className,
      )}
      {...props}
    >
      <Link href={href}>
        <span className="relative z-10">{children}</span>
      </Link>
    </Button>
  );
};
export default NavigationButton;
