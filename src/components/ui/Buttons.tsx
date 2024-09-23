'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import Link from 'next/link';

const MotionButton = motion.create(Button);
const MotionLink = motion.create(Link);

type AnimatedButtonProps = {
  children: React.ReactNode;
  size?: 'default' | 'sm' | 'icon' | 'lg' | null;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  size,
  href = '#',
  type = 'button',
  onClick,
  variant = 'default',
  ...props
}) => {
  return (
    <MotionButton
      size={size}
      type={type}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={onClick}
      variant={variant}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export const AnimatedLink: React.FC<AnimatedButtonProps> = ({
  children,
  size,
  href = '#',
  type = 'button',
  onClick,
  variant = 'default',
  ...props
}) => {
  return (
    <MotionLink
      size={size}
      type={type}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={onClick}
      variant={variant}
      {...props}
    />
  );
};
