import React from 'react';
import { cn } from '@/lib/utils';
import Text from './Text';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  as: Component = 'h2',
}) => {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <Component className={cn('mb-4 text-3xl font-bold', titleClassName)}>
        {title}
      </Component>
      {subtitle && (
        <Text
          className={cn(
            'mx-auto max-w-2xl text-lg text-muted-foreground',
            subtitleClassName,
          )}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
};

export default SectionHeading;