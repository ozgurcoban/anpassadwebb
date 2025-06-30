'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ className }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(Math.min(scrollPercent * 100, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800", className)}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};