import { DynamicMotion } from '../ui/DynamicMotion';
import SanityImage from '../SanityImage';

const customPortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const { alt } = value;

      return (
        <DynamicMotion type="figure" className="" delay={0.5}>
          <SanityImage src={value} className="mb-0.5 rounded-lg" />
          <figcaption className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </figcaption>
        </DynamicMotion>
      );
    },
  },
};

export default customPortableTextComponents;
