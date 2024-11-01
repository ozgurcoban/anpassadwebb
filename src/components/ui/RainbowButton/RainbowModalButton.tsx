import { ButtonProps } from '../button';
import { RainbowButton } from './RainbowButton';

type RainbowLinkButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
} & Omit<ButtonProps, 'href'>;

export const RainbowModalButton: React.FC<RainbowLinkButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <RainbowButton onClick={onClick} {...props}>
      {children}
    </RainbowButton>
  );
};
