'use client';

import { type Post } from '@/lib/mdx';
import { Card } from '@/components/ui/card';
import Header from './BlogHeader';
import Content from './BlogContent';
import Footer from './BlogFooter';
import { blogConfig } from '@/lib/blog-config';
import { ReadingProgress } from './ReadingProgress';
import { FadeInView } from '@/components/ui/FadeInView';
import { ArrowLeft, BookmarkPlus, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type PostProps = {
  post: Post;
  locale?: string;
};

export default function Post({
  post,
  locale = blogConfig.defaultLocale,
}: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const { title, description, tags, date, image, imageAlt, contentMedia } =
    frontmatter;
  const [isSaved, setIsSaved] = useState(false);

  // Fix scroll position on navigation
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL (preserve anchor link functionality)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to user's reading list
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <>
      <ReadingProgress />

      <article className="relative">
        {/* Hero Section with Image/Video */}
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          {image ? (
            <>
              {image.endsWith('.mp4') || image.endsWith('.webm') ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={image}
                    type={`video/${image.split('.').pop()}`}
                  />
                </video>
              ) : (
                <Image
                  src={image}
                  alt={imageAlt || title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
            </>
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          )}

          {/* Navigation Bar */}
          <div className="absolute left-0 right-0 top-0 z-10 p-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
              <Link
                href="/blogg"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Tillbaka till bloggen
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={cn(
                    'rounded-lg p-2 backdrop-blur-sm transition-all',
                    isSaved
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-white/10 text-white hover:bg-white/20',
                  )}
                  aria-label="Spara artikel"
                >
                  <BookmarkPlus className="h-5 w-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Dela artikel"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="absolute bottom-0 left-0 right-0 mb-6 p-8">
            <div className="mx-auto max-w-5xl">
              <FadeInView delay={0.2} duration={0.8}>
                <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </FadeInView>

              {description && (
                <FadeInView delay={0.4} duration={0.8}>
                  <p className="max-w-3xl text-xl leading-relaxed text-white/90">
                    {description}
                  </p>
                </FadeInView>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="prose prose-lg mx-auto max-w-full bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-gray-800/95">
            {title && date ? (
              <Header
                title={title}
                subtitle={description}
                tags={tags || []}
                published={date}
                readingTime={readingTime.text}
                locale={locale}
                hideTitle={true} // Since we show it in the hero
              />
            ) : (
              <p>Missing header information</p>
            )}

            <Content
              content={content}
              image={image}
              imageAlt={imageAlt || title}
              contentMedia={contentMedia}
              className="prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300"
            />

            <Footer locale={locale} />
          </Card>
        </div>
      </article>
    </>
  );
}
