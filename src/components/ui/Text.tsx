import { cn } from '@/lib/utils';

type TextProps = {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Text: React.FC<TextProps> = ({
  as = 'p',
  children,
  className,
  style,
}) => {
  const Component = as;

  return (
    <Component className={cn(`px-2`, className)} style={style}>
      {children}
    </Component>
  );
};

export default Text;
