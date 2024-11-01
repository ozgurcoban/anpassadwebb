'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import React from 'react';
import Link from 'next/link';

const MotionButton = motion(Button);

type AnimatedButtonProps = React.ComponentPropsWithoutRef<typeof MotionButton>;

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};
export default AnimatedButton;

// type AnimatedButtonProps = {
//   children: React.ReactNode;
//   asChild?: boolean;
//   size?: 'default' | 'sm' | 'icon' | 'lg' | null;
//   href?: string;
//   type?: 'button' | 'submit' | 'reset';
//   className?: string;
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   variant?:
//     | 'link'
//     | 'default'
//     | 'destructive'
//     | 'outline'
//     | 'secondary'
//     | 'ghost';
// };
