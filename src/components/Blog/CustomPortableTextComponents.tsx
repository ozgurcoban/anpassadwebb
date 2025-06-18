import { FadeInView } from '../ui/FadeInView';
import Image from 'next/image';

const customPortableTextComponents = {
  types: {
    // Image component
    image: ({ value }: { value: any }) => {
      const { alt, asset } = value;
      return (
        <FadeInView as="figure" delay={0.5}>
          <div className="relative w-full aspect-video mb-0.5">
            <Image 
              src={asset.url} 
              alt={alt || ''} 
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <figcaption className="mt-4 text-sm">
            {alt ? alt.charAt(0).toUpperCase() + alt.slice(1) : undefined}
          </figcaption>
        </FadeInView>
      );
    },
    // Bold text component

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
  marks: {
    // Bold text component
    strong: ({ children }: { children: React.ReactNode }) => {
      return (
        <strong className="font-bold text-secondary-foreground">
          {children}
        </strong>
      );
    },
  },
};

export default customPortableTextComponents;
