import Link from 'next/link';
import { ContactButton } from '@/components/ContactButton';
import { CardFooter } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { blogConfig, getLabel } from '@/lib/blog-config';

type FooterProps = {
  locale?: string;
};

const Footer: React.FC<FooterProps> = ({ locale = blogConfig.defaultLocale }) => {
  return (
    <CardFooter className="flex flex-col items-center gap-y-10">
      <FadeInView
        delay={0.6}
        className="my-8 rounded-md bg-secondary p-6 text-center font-medium"
      >
        <p className="mb-4 max-w-lg text-base leading-loose">
          {getLabel('contactUs', locale)}
        </p>
        <ContactButton />
      </FadeInView>
      <FadeInView delay={0.8}>
        <Link href="/blogg" className='text-link hover:text-link-hover'>&larr; {getLabel('allPosts', locale)}</Link>
      </FadeInView>
    </CardFooter>
  );
};
export default Footer;
