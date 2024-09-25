'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import React from 'react';
import Link from 'next/link';

const MotionButton = motion.create(Button);

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

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
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
      asChild
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
export default AnimatedButton;
