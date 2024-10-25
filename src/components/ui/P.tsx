import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const P = ({ children, className, ...props }: Props) => {
  return (
    <p className={cn(`px-2 text-lg leading-loose`, className)} {...props}>
      {children}
    </p>
  );
};
export default P;
