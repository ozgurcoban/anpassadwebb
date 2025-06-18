import { Separator } from '@/components/ui/separator';
import SanityImage from '@/components/SanityImage';
import { CardContent } from '@/components/ui/card';
import { DynamicMotion } from '@/components/ui/DynamicMotion';
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
        <DynamicMotion
          delay={0.6}
          duration={0.8}
          className="relative w-full md:w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+8rem)] md:-mx-4 lg:-mx-8 xl:-mx-16"
          type="figure"
        >
          <SanityImage className="mt-4 w-full rounded-lg object-cover aspect-video" src={image} />
          <DynamicMotion
            type="figcaption"
            delay={0.6}
            duration={0.8}
            className="mt-4 text-sm"
          >
            {alt}
          </DynamicMotion>
          <Separator className="my-4" />
        </DynamicMotion>
      ) : null}
      {body ? (
        <DynamicMotion
          className="drop-cap leading-[1.9rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <PortableText
            value={body}
            components={{
              ...customPortableTextComponents,

              block: ({ children }) => (
                <DynamicMotion type="p" delay={0.4} className="my-4">
                  {children}
                </DynamicMotion>
              ),
            }}
          />
        </DynamicMotion>
      ) : null}
    </CardContent>
  );
};
export default Content;
