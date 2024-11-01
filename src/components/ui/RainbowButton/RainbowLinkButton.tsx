import Link from 'next/link';
import { RainbowButton } from './RainbowButton';
import { ButtonProps } from '../button';

type RainbowLinkButtonProps = {
  href: string;
  children: React.ReactNode;
} & Omit<ButtonProps, 'onClick'>;

const RainbowLinkButton: React.FC<RainbowLinkButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <RainbowButton {...props}>{children}</RainbowButton>
    </Link>
  );
};
export default RainbowLinkButton;
