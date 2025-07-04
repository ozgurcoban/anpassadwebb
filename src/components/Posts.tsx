import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '@/lib/mdx';
import { formatDateWithFallback } from '@/utils/formattedDate';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { blogConfig } from '@/lib/blog-config';
import { FadeInView } from '@/components/ui/FadeInView';
import { Clock, ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type PostsProps = {
  posts: Post[];
  locale?: string;
};

export function Posts({
  posts,
  locale = blogConfig.defaultLocale,
}: PostsProps) {
  return (
    <div id="posts" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 [grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:grid-rows-[auto_auto_1fr_auto_auto]">
      {posts.map((post, index) => {
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
            className="group relative grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 dark:bg-gray-800/80 dark:border-gray-700/50 supports-[grid-template-rows:subgrid]:[grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:row-span-5"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/10" />
            
            {/* Image */}
            <Link
              href={`/blogg/${slug}`}
              className="relative block h-56 w-full overflow-hidden rounded-t-2xl"
            >
              {(thumbnail || image) ? (
                <>
                  <Image
                    src={thumbnail || image || ''}
                    alt={imageAlt || title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/40" />
                  </div>
                </div>
              )}
              
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
                <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
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
                    <Link
                      key={tag}
                      href={`/blogg/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        "bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700",
                        "hover:from-blue-100 hover:to-purple-100 transition-all duration-200",
                        "dark:from-blue-900/20 dark:to-purple-900/20 dark:text-purple-300",
                        "dark:hover:from-blue-900/30 dark:hover:to-purple-900/30",
                        "border border-purple-200/50 dark:border-purple-700/50"
                      )}
                    >
                      {tag}
                    </Link>
                  ))}
                  {tags.length > 3 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
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
      })}
    </div>
  );
}