import { Button, ButtonProps } from '../button';

export type RainbowButtonProps = ButtonProps;

export const RainbowButton: React.FC<RainbowButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button variant="rainbow" size="lg" {...props}>
      {children}
    </Button>
  );
};
