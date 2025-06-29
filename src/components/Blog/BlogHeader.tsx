import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FadeInView } from '@/components/ui/FadeInView';
import { formatDateWithFallback } from '@/utils/formattedDate';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { blogConfig, getLabel } from '@/lib/blog-config';

type HeaderProps = {
  title: string;
  subtitle?: string;
  tags: string[];
  published: string;
  readingTime?: string;
  locale?: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tags,
  published,
  readingTime,
  locale = blogConfig.defaultLocale,
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
            <Link
              key={tag}
              href={`/blogg/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary/70 text-sm font-medium transition-all duration-300 whitespace-nowrap dark:text-gray-300 dark:hover:text-primary/80 no-underline"
            >
              #{tag}
            </Link>
          ))}
        </FadeInView>
      )}
      {title ? (
        <FadeInView delay={0.5}>
          <CardTitle className="mt-4 break-words text-4xl leading-normal text-card-foreground">
            {capitalizeFirstLetter(title)}
          </CardTitle>
        </FadeInView>
      ) : null}
      {subtitle ? (
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