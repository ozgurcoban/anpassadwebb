import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { formatDateWithFallback } from '@/utils/formattedDate';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { TagBadge } from './TagBadge';
import { blogConfig, getLabel } from '@/lib/blog-config';

type HeaderProps = {
  title: string;
  subtitle?: string;
  tags: string[];
  published: string;
  readingTime?: string;
  locale?: string;
  hideTitle?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tags,
  published,
  readingTime,
  locale = blogConfig.defaultLocale,
  hideTitle = false,
}) => {
  return (
    <CardHeader className="mx-auto max-w-4xl py-0">
      <FadeInView
        delay={0.1}
        as="p"
        className="mt-8 text-sm text-card-foreground"
      >
        <span className="font-semibold">{getLabel('published', locale)}</span>{' '}
        {formatDateWithFallback(published, locale)}
        {readingTime && (
          <>
            {' • '}
            <span className="text-muted-foreground">{readingTime}</span>
          </>
        )}
      </FadeInView>
      {tags && Array.isArray(tags) && tags.length > 0 && (
        <FadeInView delay={0.3} className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              variant="outline"
              size="md"
            />
          ))}
        </FadeInView>
      )}
      {title && !hideTitle ? (
        <FadeInView delay={0.5}>
          <CardTitle className="mt-4 break-words text-4xl leading-normal text-card-foreground">
            {capitalizeFirstLetter(title)}
          </CardTitle>
        </FadeInView>
      ) : null}
      {subtitle && !hideTitle ? (
        <FadeInView as="div" delay={0.75}>
          <CardDescription className="mt-4 text-pretty text-xl leading-relaxed tracking-tight text-card-foreground">
            {subtitle}
          </CardDescription>
        </FadeInView>
      ) : null}
    </CardHeader>
  );
};
export default Header;