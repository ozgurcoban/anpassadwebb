import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const H4 = ({ children, className, ...props }: Props) => {
  return (
    <h4 className={cn(`text-lg font-medium`, className)} {...props}>
      {children}
    </h4>
  );
};
export default H4;
