import { cn } from '@/lib/utils';

type TextProps = {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Text: React.FC<TextProps> = ({
  size = 'lg',
  as = 'p',
  children,
  className,
  style,
}) => {
  const Component = as;

  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg leading-loose tracking-wide',
    xl: 'px-2 text-3xl font-medium leading-snug',
  };

  return (
    <Component className={cn(sizes[size], className)} style={style}>
      {children}
    </Component>
  );
};

export default Text;
