import { CardHeader, CardTitle, CardDescription } from '../ui/card';
import { badgeVariants } from '../ui/badge';
import { DynamicMotion } from '../ui/DynamicMotion';
import Link from 'next/link';
import formattedDate from '@/utils/formattedDate';
import { Tag } from '@/lib/types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  tag?: Tag[];
  published?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, tag, published }) => {
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
      {tag && Array.isArray(tag) && (
        <DynamicMotion delay={0.3} className="mt-8 flex flex-wrap gap-2">
          {tag.map((t) => {
            console.log('t', t);

            return (
              <Link
                key={t._id}
                className={`${badgeVariants({ variant: 'outline' })} text-4xl`}
                href={`/tag/${t.slug.current}`}
              >
                #{t.title.toLowerCase()}
              </Link>
            );
          })}
        </DynamicMotion>
      )}
      {title ? (
        <DynamicMotion delay={0.5}>
          <CardTitle className="mt-4 break-words text-4xl leading-normal text-card-foreground">
            {title.charAt(0).toUpperCase() + title.slice(1)}
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
