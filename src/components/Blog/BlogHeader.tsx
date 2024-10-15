import { CardHeader, CardTitle, CardDescription } from '../ui/card';
import { badgeVariants } from '../ui/badge';
import { DynamicMotion } from '../ui/DynamicMotion';
import Link from 'next/link';
import formattedDate from '@/utils/formattedDate';
import React from 'react';
import { Slug } from '../../../sanity.types';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

type HeaderProps = {
  title: string;
  subtitle?: string;
  tags: Array<{
    _id: string;
    slug: Slug | null;
    title: string | null;
    description: string | null;
  }> | null;
  published: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tags,
  published,
}) => {
  return (
    <CardHeader className="mx-auto max-w-4xl py-0">
      {published ? (
        <DynamicMotion
          delay={0.1}
          type="p"
          className="mt-8 text-sm text-card-foreground"
        >
          <span className="font-semibold">Publicerad:</span>{' '}
          {formattedDate(published)}
        </DynamicMotion>
      ) : (
        <p className="mt-8 text-sm text-card-foreground">
          <span className="font-semibold">Publicerad:</span>{' '}
          {formattedDate('2022-01-01')}
        </p>
      )}
      {tags && Array.isArray(tags) && (
        <DynamicMotion delay={0.3} className="mt-8 flex flex-wrap gap-2">
          {tags.map((t) => {
            return (
              <Link
                key={t._id}
                className={`${badgeVariants({ variant: 'outline' })} text-4xl`}
                href={`/tag/${t.slug?.current}`}
              >
                #{t.title?.toLowerCase()}
              </Link>
            );
          })}
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
