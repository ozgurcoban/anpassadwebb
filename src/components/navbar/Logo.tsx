import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative block size-24 overflow-hidden rounded-3xl"
    >
      <Image
        src="/logo.png"
        alt="logo"
        fill
        style={{ objectFit: 'cover' }}
        className="scale-150"
        priority
      />
    </Link>
  );
};
export default Logo;
