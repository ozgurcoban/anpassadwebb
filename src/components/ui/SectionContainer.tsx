import { cn } from '@/lib/utils';

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

const SectionContainer = ({ 
  children, 
  className,
  innerClassName 
}: SectionContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-screen-2xl px-4 lg:px-8", className)}>
      <div className={cn("mx-auto max-w-7xl", innerClassName)}>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;