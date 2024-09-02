'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { motion } from 'framer-motion';

type MaskTextProps<T extends React.ElementType> = {
  phrases: string[];
  as?: T; // This prop allows specifying the element type
  className?: string;
  delay?: number;
};

const MaskText = <T extends React.ElementType = 'p'>({
  phrases,
  as,
  className,
  delay,
}: MaskTextProps<T>) => {
  const Component = as || 'p'; // Default to 'p' if no element type is specified

  const animation = {
    initial: { y: '100%' },

    enter: (i: number) => ({
      y: '0',
      transition: {
        duration: 1.55,
        ease: [0.33, 1, 0.68, 1],
        delay: (delay ?? 0) + 0.075 * i,
      },
    }),
  };

  return (
    <Component className={className}>
      {phrases.map((phrase, index) => {
        const words = phrase.split(' '); // Split phrase into words

        return (
          <span key={index} className={cn('overflow-hidden', className)}>
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                custom={index + wordIndex}
                variants={animation}
                initial="initial"
                whileInView={'enter'}
                viewport={{ once: true }}
                className="mr-[4px] inline-block" // Add space between words
              >
                {word}
              </motion.span>
            ))}
          </span>
        );
      })}
    </Component>
  );
};

export default MaskText;
