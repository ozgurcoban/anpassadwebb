import { Separator } from '@radix-ui/react-separator';
import SanityImage from '../SanityImage';
import { CardContent } from '../ui/card';
import { DynamicMotion } from '../ui/DynamicMotion';
import { PortableText } from 'next-sanity';
import customPortableTextComponents from './CustomPortableTextComponents';

type ContentProps = {
  alt?: string;
  image: any;
  body: any;
};

const Content: React.FC<ContentProps> = ({ alt, image, body }) => {
  return (
    <CardContent className="mx-32">
      {image?.asset?.url ? (
        <DynamicMotion
          delay={0.6}
          duration={0.8}
          className="md:mx-2 lg:-mx-10 xl:-mx-32"
          type="figure"
        >
          <SanityImage className="mt-4 w-full rounded-lg" src={image} />
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
