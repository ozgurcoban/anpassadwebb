import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { PRIMARY_GRADIENT, GRADIENT_OPACITY } from '@/lib/gradient-constants';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        rainbow: cn(
          'relative z-10 overflow-hidden border-2 border-transparent transition-all',
          // solid background colors
          'bg-white text-black dark:bg-gray-900 dark:text-white',
          // animated border gradient
          "before:absolute before:inset-0 before:-z-20 before:animate-rainbow before:rounded-md before:bg-[linear-gradient(90deg,theme('colors.red.500'),theme('colors.orange.500'),theme('colors.yellow.500'),theme('colors.lime.500'),theme('colors.cyan.500'),theme('colors.blue.500'),theme('colors.purple.500'),theme('colors.red.500'))] before:bg-[length:200%] before:p-[2px]",
          // inner background to create border effect
          "after:absolute after:inset-[2px] after:-z-10 after:rounded-[calc(theme(borderRadius.md)-2px)] after:bg-white dark:after:bg-gray-900",
          // blur effect on hover
          "hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:before:blur-[2px]",
        ),
        glass: cn(
          'relative bg-black/50 text-white backdrop-blur-sm transition-all duration-300',
          `before:absolute before:inset-0 before:-z-10 before:rounded-md ${PRIMARY_GRADIENT.before} before:p-[1px] before:${GRADIENT_OPACITY.button}`,
          `hover:bg-black/60 hover:before:${GRADIENT_OPACITY.hover}`,
          '[text-shadow:0_2px_10px_rgba(0,0,0,0.8)]'
        ),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
