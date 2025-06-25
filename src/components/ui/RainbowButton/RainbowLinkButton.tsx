import Link from 'next/link';
import { RainbowButton, RainbowButtonProps } from './RainbowButton';

type RainbowLinkButtonProps = {
  href: string;
} & RainbowButtonProps;

const RainbowLinkButton: React.FC<RainbowLinkButtonProps> = ({
  href,
  ...props
}) => {
  return (
    <RainbowButton asChild {...props}>
      <Link href={href} />
    </RainbowButton>
  );
};
export default RainbowLinkButton;
