'use client';

import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface CustomMotionProps<Tag extends keyof React.JSX.IntrinsicElements>
  extends MotionProps {
  type?: Tag;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
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

export const DynamicMotion = <Tag extends keyof React.JSX.IntrinsicElements>({
  type,
  children,
  className,
  delay = 0.2,
  duration,
  transition,
  enableHover,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = type ? (motion as any)[type] : motion.div;

  return (
    <Component
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
    </Component>
  );
};
