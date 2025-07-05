'use client';

import { type Post } from '@/lib/mdx';
import { Card } from '@/components/ui/card';
import Header from './BlogHeader';
import BlogContentClient from './BlogContentClient';
import Footer from './BlogFooter';
import { blogConfig } from '@/lib/blog-config';
import { ReadingProgress } from './ReadingProgress';
import { FadeInView } from '@/components/ui/FadeInView';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MediaDisplay } from '@/components/ui/MediaDisplay';
import { GradientOverlay } from '@/components/ui/GradientOverlay';
import { blogStyles, getButtonClasses, getCardClasses } from '@/lib/styles/blog';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

type PostProps = {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  locale?: string;
};

export default function BlogPostClient({
  post,
  mdxSource,
  locale = blogConfig.defaultLocale,
}: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const { title, description, tags, date, image, imageAlt, contentMedia } =
    frontmatter;

  // Fix scroll position on navigation
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL (preserve anchor link functionality)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: title,
      text: description || title,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        // Fallback: kopiera länken till clipboard om det stöds
        await navigator.clipboard.writeText(shareUrl);
        
        // Visa en temporär bekräftelse
        const button = document.querySelector('[aria-label="Dela artikel"]');
        if (button) {
          const originalText = button.innerHTML;
          button.innerHTML = '<svg class="h-6 w-6 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        }
      } else {
        // Om varken Web Share eller Clipboard fungerar, använd mailto
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + shareUrl)}`;
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Vid fel, använd mailto som fallback
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + shareUrl)}`;
    }
  };

  return (
    <>
      <ReadingProgress />

      <article className="relative">
        {/* Hero Section with Image/Video */}
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <MediaDisplay
            src={image}
            alt={imageAlt || title}
            priority
            containerClassName="w-full h-full"
            className="object-cover"
            fallback={
              <div className={cn("h-full bg-gradient-to-br", blogStyles.gradients.primary)} />
            }
          />
          {image && <GradientOverlay variant="dark" />}

          {/* Navigation Bar */}
          <div className="absolute left-0 right-0 top-0 z-10 p-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
              <Link
                href="/blogg"
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 text-white",
                  getButtonClasses('light')
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Tillbaka till bloggen
                </span>
              </Link>

              <button
                onClick={handleShare}
                className={cn(
                  "p-3 md:p-2 text-white z-20",
                  getButtonClasses('light'),
                  "active:scale-95 active:bg-white/30"
                )}
                aria-label="Dela artikel"
              >
                <Share2 className="h-6 w-6 md:h-5 md:w-5" />
              </button>
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
          <Card className={cn(
            blogStyles.prose.base,
            "mx-auto max-w-full",
            getCardClasses('transparent')
          )}>
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

            <BlogContentClient
              mdxSource={mdxSource}
              contentMedia={contentMedia}
              className={cn(
                blogStyles.prose.headings,
                blogStyles.prose.paragraphs
              )}
            />

            <Footer locale={locale} />
          </Card>
        </div>
      </article>
    </>
  );
}
