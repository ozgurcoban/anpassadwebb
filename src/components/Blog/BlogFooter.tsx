import Link from 'next/link';
import { ContactButton } from '../ContactButton';
import { CardFooter } from '../ui/card';
import { DynamicMotion } from '../ui/DynamicMotion';

const Footer = () => {
  return (
    <CardFooter className="flex flex-col items-center gap-y-10">
      <DynamicMotion
        delay={0.6}
        className="my-8 rounded-md bg-secondary p-6 text-center font-medium"
      >
        <p className="mb-4 max-w-lg text-base leading-loose">
          Vill du veta mer om hur du kan förbättra din webbnärvaro? Kontakta mig
          för rådgivning eller frågor.
        </p>
        <ContactButton />
      </DynamicMotion>
      <DynamicMotion delay={0.8}>
        <Link href="/posts" className='text-link hover:text-link-hover'>&larr; Return to blog</Link>
      </DynamicMotion>
    </CardFooter>
  );
};
export default Footer;
