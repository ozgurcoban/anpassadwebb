'use client';

import { delay, motion, MotionProps } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements>
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

const textTransition = {
  duration: 0.4,
  ease: 'easeOut',
};

const imageTransition = {
  duration: 0.6,
  ease: 'easeInOut',
  delay: 1.2,
};

export const DynamicMotion = <Tag extends keyof JSX.IntrinsicElements>({
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

  // if (typeof window !== 'undefined') {
  //   const imageElement = document.getElementsByTagName('img');
  //   // console.log('imageElement:', imageElement);
  // } // console.log('type:', type);
  // console.log('Component:', Component);
  // const owner = React.isValidElement(children);

  // console.log('children:', children);

  // console.log('isImage:', isImage);
  // console.log('imageElement:', imageElement);

  // const isNextImage =
  //   React.isValidElement(imageElement) && imageElement === Image;
  // const isImage = type === 'img' || className?.includes('image') || isNextImage;

  // console.log('isNextImage:', isNextImage);
  // console.log('isImage:', isImage);

  // const computedTransition = {
  //   ...(isImage ? imageTransition : textTransition),
  //   delay: delay,
  //   duration:
  //     duration ??
  //     (isImage ? imageTransition.duration : textTransition.duration),
  //   ...transition,
  // };
  // console.log('computedTransition:', computedTransition);

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
