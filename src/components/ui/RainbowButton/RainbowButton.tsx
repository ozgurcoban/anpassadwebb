import { cn } from '@/lib/utils';
import { Button, ButtonProps, buttonVariants } from '../button';
import Link from 'next/link';

type RainbowButtonProps = ButtonProps & {
  // href?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const RainbowButton: React.FC<RainbowButtonProps> = ({
  children,
  className,
  // onClick,
  // href,
  ...props
}) => {
  return (
    <div className={cn('group relative z-10', className)}>
      <span
        className="pointer-events-none absolute inset-0 -z-10 animate-rainbow rounded-md bg-[linear-gradient(90deg,theme('colors.red.300'),theme('colors.purple.300'),theme('colors.blue.300'),theme('colors.cyan.300'),theme('colors.lime.300'),theme('colors.orange.300'))] bg-[length:200%] blur-[5px] group-hover:blur-[2px]"
        aria-hidden="true"
      ></span>
      <Button
        // onClick={onClick}
        variant="rainbow"
        className="relative w-full"
        size="lg"
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};
