import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '@/lib/mdx';
import { formatDateWithFallback } from '@/utils/formattedDate';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { blogConfig } from '@/lib/blog-config';
import { FadeInView } from '@/components/ui/FadeInView';

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
          frontmatter: { title, description, date, tags, image, imageAlt },
          readingTime,
        } = post;

        return (
          <FadeInView
            key={slug}
            delay={index * 0.1}
            duration={0.6}
            enableHover
            as="article"
            className="group relative grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 dark:bg-gray-800/70 dark:border-gray-700/30 supports-[grid-template-rows:subgrid]:[grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:row-span-5"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20" />
            
            {/* Image */}
            <Link
              href={`/blogg/${slug}`}
              className="relative block h-56 w-full overflow-hidden rounded-t-2xl"
            >
              {image ? (
                <>
                  <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Reading Time Badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {Math.ceil(readingTime.minutes)} min läsning
              </div>
            </Link>

            {/* Content */}
            <div className="relative grid grid-rows-[auto_1fr_auto_auto] gap-3 px-5 py-4 supports-[grid-template-rows:subgrid]:[grid-template-rows:subgrid] supports-[grid-template-rows:subgrid]:row-span-4">
              {/* Title */}
              <Link href={`/blogg/${slug}`}>
                <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {title && capitalizeFirstLetter(title)}
                </h3>
              </Link>

              {/* Description */}
              <Link href={`/blogg/${slug}`}>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {description}
                </p>
              </Link>

              {/* Meta Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={date} className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDateWithFallback(date, locale)}
                </time>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-start gap-2 min-h-[32px]">
                {tags && tags.length > 0 && (
                  <>
                    {tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogg/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary/70 text-xs font-medium transition-all duration-300 whitespace-nowrap dark:text-gray-300 dark:hover:text-primary/80 no-underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                    {tags.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
                        +{tags.length - 3}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>
          </FadeInView>
        );
      })}
    </div>
  );
}
