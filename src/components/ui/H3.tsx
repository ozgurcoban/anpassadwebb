import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const H3 = ({ children, className, ...props }: Props) => {
  return (
    <h3
      className={cn(`px-2 text-3xl font-medium leading-snug`, className)}
      {...props}
    >
      {children}
    </h3>
  );
};
export default H3;
