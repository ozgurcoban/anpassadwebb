'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import React from 'react';

const MotionButton = motion(Button);

type AnimatedButtonProps = {
  children: React.ReactNode;
  size?: 'default' | 'sm' | 'icon' | 'lg' | null;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, size }) => {
  return (
    <MotionButton
      asChild
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      size={size}
    >
      {children}
    </MotionButton>
  );
};
export default AnimatedButton;
