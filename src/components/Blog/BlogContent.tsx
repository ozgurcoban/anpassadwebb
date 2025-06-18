import { Separator } from '@/components/ui/separator';
import SanityImage from '@/components/SanityImage';
import { CardContent } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { PortableText } from 'next-sanity';
import customPortableTextComponents from './CustomPortableTextComponents';
import { cn } from '@/lib/utils';

type ContentProps = {
  alt?: string;
  image: any;
  body: any;
  className?: string;
};

const Content: React.FC<ContentProps> = ({ alt, image, body, className }) => {
  return (
    <CardContent className={cn("px-4 md:px-8 lg:px-16 xl:px-32", className)}>
      {image?.asset?.url ? (
        <FadeInView
          delay={0.6}
          duration={0.8}
          className="relative w-full md:w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+8rem)] md:-mx-4 lg:-mx-8 xl:-mx-16"
          as="figure"
        >
          <SanityImage className="mt-4 w-full rounded-lg object-cover aspect-video" src={image} />
          <FadeInView
            as="figcaption"
            delay={0.6}
            duration={0.8}
            className="mt-4 text-sm"
          >
            {alt}
          </FadeInView>
          <Separator className="my-4" />
        </FadeInView>
      ) : null}
      {body ? (
        <FadeInView
          className="drop-cap leading-[1.9rem]"
        >
          <PortableText
            value={body}
            components={{
              ...customPortableTextComponents,

              block: ({ children }) => (
                <FadeInView as="p" delay={0.4} className="my-4">
                  {children}
                </FadeInView>
              ),
            }}
          />
        </FadeInView>
      ) : null}
    </CardContent>
  );
};
export default Content;
