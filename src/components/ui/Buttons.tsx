'use client';

import { motion, MotionProps } from 'framer-motion';
import { Button } from './button';

const MotionButton = motion.create(Button);

const transition = { type: 'spring', stiffness: 400, damping: 10 };

interface AnimatedButtonProps extends Omit<MotionProps, 'onAnimationStart'> {
  children: React.ReactNode;
  size?: 'default' | 'icon' | 'lg' | 'sm';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;

  disabled?: boolean;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  size = 'default',
  type,
  variant = 'default',
  disabled,
  onClick,
  className,
  ...props
}) => {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={transition}
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </MotionButton>
  );
};
