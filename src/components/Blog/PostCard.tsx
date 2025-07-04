import Link from 'next/link';
import { type Post } from '@/lib/mdx';
import { formatDateWithFallback } from '@/utils/formattedDate';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { blogConfig } from '@/lib/blog-config';
import { FadeInView } from '@/components/ui/FadeInView';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MediaDisplay } from '@/components/ui/MediaDisplay';
import { GradientOverlay } from '@/components/ui/GradientOverlay';
import { TagBadge } from './TagBadge';
import { blogStyles, getCardClasses, getTagClasses } from '@/lib/styles/blog';

interface PostCardProps {
  post: Post;
  locale?: string;
  index?: number;
}

export function PostCard({ post, locale = blogConfig.defaultLocale, index = 0 }: PostCardProps) {
  const {
    slug,
    frontmatter: { title, description, date, tags, image, imageAlt, thumbnail },
    readingTime,
  } = post;

  return (
    <FadeInView
      key={slug}
      delay={index * 0.1}
      duration={0.6}
      enableHover
      as="article"
      className={cn(
        getCardClasses('default'),
        "group relative grid grid-rows-[auto_1fr]",
        "supports-[grid-template-rows:subgrid]:[grid-template-rows:subgrid]",
        "supports-[grid-template-rows:subgrid]:row-span-5"
      )}
    >
      {/* Background Gradient Overlay */}
      <GradientOverlay variant="card" groupHover />
      
      {/* Image */}
      <Link
        href={`/blogg/${slug}`}
        className="relative block h-56 w-full overflow-hidden rounded-t-2xl"
      >
        <MediaDisplay
          src={thumbnail || image}
          alt={imageAlt || title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={blogStyles.animations.hover.scale}
          containerClassName="w-full h-full"
        />
        <GradientOverlay variant="bottom" groupHover />
        
        {/* Reading Time Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(readingTime.minutes)} min</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="relative grid grid-rows-[auto_1fr_auto_auto] gap-4 px-6 py-6 supports-[grid-template-rows:subgrid]:[grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:row-span-4">
        {/* Title */}
        <Link href={`/blogg/${slug}`}>
          <h3 className={cn(
            "text-xl font-bold leading-tight text-gray-900 dark:text-white transition-all duration-300 line-clamp-2",
            "group-hover:text-transparent group-hover:bg-gradient-to-r",
            `group-hover:${blogStyles.gradients.primary}`,
            "group-hover:bg-clip-text"
          )}>
            {title && capitalizeFirstLetter(title)}
          </h3>
        </Link>

        {/* Description */}
        <Link href={`/blogg/${slug}`}>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 text-base">
            {description}
          </p>
        </Link>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                variant="default"
                size="md"
                showHash={false}
              />
            ))}
            {tags.length > 3 && (
              <span className={getTagClasses('counter', 'md')}>
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Date */}
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time dateTime={date}>
              {formatDateWithFallback(date, locale)}
            </time>
          </div>
          
          {/* CTA */}
          <Link
            href={`/blogg/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors"
          >
            Läs mer
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent dark:via-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </FadeInView>
  );
}