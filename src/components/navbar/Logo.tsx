import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Logo = () => {
  return (
    <Button size="icon" className="flex size-full">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={700}
          height={700}
          className="size-20"
        />
      </Link>
    </Button>
  );
};
export default Logo;
