'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import React from 'react';
import Link from 'next/link';

const MotionButton = motion(Button);

type AnimatedButtonProps = {
  children: React.ReactNode;
  size?: 'default' | 'sm' | 'icon' | 'lg' | null;
  href: string;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  size,
  href = '/',
}) => {
  return (
    <MotionButton
      asChild
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      size={size}
    >
      <Link className="uppercase no-underline" href={href}>
        {children}
      </Link>
    </MotionButton>
  );
};
export default AnimatedButton;
