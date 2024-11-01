import Image, { StaticImageData } from 'next/image';
import { ContactButton } from '../ContactButton';
import Section from './Section';
import Text from './Text';
import { ReactElement } from 'react';
import { RainbowButton } from './RainbowButton/RainbowButton';
import { Button } from './button';
import Link from 'next/link';
import NavigationButton from './NavigationButton';
import RainbowLinkButton from './RainbowButton/RainbowLinkButton';

interface FeatureSectionProps {
  title: ReactElement;
  description: string;
  imageSrc: StaticImageData;
  reverse?: boolean;
  buttonLabel: string;
}

const ContentSection: React.FC<FeatureSectionProps> = ({
  imageSrc,
  title,
  description,
  reverse,
  buttonLabel,
}) => {
  return (
    <Section className="grid gap-6 px-2 md:grid-cols-[2.5fr_3fr]">
      <header className="self-end">
        <Text as="h3" size="xl" className="text-[2.7rem]">
          {title}
        </Text>
      </header>
      <div className="row-start-3 flex flex-col justify-start gap-12 px-2 md:col-span-1 md:col-start-1 md:row-start-2">
        <Text>{description}</Text>
        {/* <ContactButton className="md:w-fit" /> */}
        {/* <RainbowButton href="/tjanster">{buttonLabel}</RainbowButton> */}
        <RainbowLinkButton className="w-full md:w-fit" href="/tjanster">
          Ring oss jao
        </RainbowLinkButton>
      </div>
      <div className="-mx-2 rounded md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0">
        <Image
          className="h-full w-full md:rounded-md"
          src={imageSrc}
          alt="unique services"
          placeholder="blur"
        />
      </div>
    </Section>
  );
};
export default ContentSection;
