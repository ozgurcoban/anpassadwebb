import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DynamicMotion } from '@/components/ui/DynamicMotion';
import { formatDateWithFallback } from '@/utils/formattedDate';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { TagBadge } from './TagBadge';
import { blogConfig, getLabel } from '@/lib/blog-config';
import type { Tag } from '@/types/blog';

type HeaderProps = {
  title: string;
  subtitle?: string;
  tags: Tag[] | null;
  published: string;
  locale?: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tags,
  published,
  locale = blogConfig.defaultLocale,
}) => {
  return (
    <CardHeader className="mx-auto max-w-4xl py-0">
      <DynamicMotion
        delay={0.1}
        type="p"
        className="mt-8 text-sm text-card-foreground"
      >
        <span className="font-semibold">{getLabel('published', locale)}</span>{' '}
        {formatDateWithFallback(published, locale)}
      </DynamicMotion>
      {tags && Array.isArray(tags) && (
        <DynamicMotion delay={0.3} className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge 
              key={tag._id} 
              tag={tag} 
              className="text-base"
            />
          ))}
        </DynamicMotion>
      )}
      {title ? (
        <DynamicMotion delay={0.5}>
          <CardTitle className="mt-4 break-words text-4xl leading-normal text-card-foreground">
            {capitalizeFirstLetter(title)}
          </CardTitle>
        </DynamicMotion>
      ) : null}
      {subtitle ? (
        <DynamicMotion type="div" delay={0.75}>
          <CardDescription className="mt-4 text-pretty text-xl leading-relaxed tracking-tight text-card-foreground">
            {subtitle}
          </CardDescription>
        </DynamicMotion>
      ) : null}
    </CardHeader>
  );
};
export default Header;
