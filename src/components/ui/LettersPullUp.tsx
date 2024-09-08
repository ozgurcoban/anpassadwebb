'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

type LettersPullUpProps = {
  text: string;
  className?: string;
};

const LettersPullUp = ({ text, className }: LettersPullUpProps) => {
  const splitText = text.split('');

  const pullupVariants = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex justify-center">
      {splitText.map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariants}
          initial="initial"
          animate={isInView ? 'animate' : ''}
          custom={i}
          className={cn('inline-block', className)}
        >
          {current == ' ' ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
};
export default LettersPullUp;
