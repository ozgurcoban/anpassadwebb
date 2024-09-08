'use client';

import React from 'react';
import { MotionProps, motion } from 'framer-motion';

interface FadeUp extends MotionProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  transition?: MotionProps['transition'];
  enableHover?: boolean;
}

const variants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const FadeUp: React.FC<FadeUp> = ({
  children,
  className,
  delay,
  duration,
  transition,
  enableHover,
  ...props
}) => {
  return (
    <motion.div
      variants={variants}
      initial={'initial'}
      className={className}
      whileInView={'animate'}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeIn', ...transition }}
      whileHover={enableHover ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
