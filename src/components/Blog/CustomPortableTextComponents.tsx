import { DynamicMotion } from '../ui/DynamicMotion';
import SanityImage from '../SanityImage';

const customPortableTextComponents = {
  types: {
    // Image component
    image: ({ value }: { value: any }) => {
      const { alt } = value;
      return (
        <DynamicMotion type="figure" delay={0.5}>
          <SanityImage src={value} className="mb-0.5 rounded-lg" />
          <figcaption className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </figcaption>
        </DynamicMotion>
      );
    },
    // Bold text component
    bold: ({ value }: { value: any }) => {
      return <strong className="font-bold dark:text-white">{value}</strong>;
    },
    // Link component
    link: ({ value }: { value: any }) => {
      const { href, title } = value;
      return (
        <a
          href={href}
          className="text-link hover:text-link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title || href}
        </a>
      );
    },
  },
};

export default customPortableTextComponents;
