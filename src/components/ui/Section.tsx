import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'narrow' | 'wide';

const VARIANT_STYLES: Record<SectionVariant, string> = {
  default: 'px-2 py-12 md:py-16 md:px-0 lg:py-20',
  narrow: 'px-2 py-8 md:px-4 md:py-12 lg:py-16',
  wide: 'px-0 py-16 md:py-20 lg:py-24',
};

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
};

const Section = ({
  children,
  className,
  variant = 'default',
  ...props
}: Props) => {
  const variantClasses = VARIANT_STYLES[variant];
  const hasBg = className?.includes('bg-');
  return (
    <section
      className={cn(variantClasses, className, {
        'my-8 md:my-12 lg:my-16': hasBg,
      })}
      {...props}
    >
      {children}
    </section>
  );
};
export default Section;
