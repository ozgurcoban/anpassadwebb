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
import { useState } from 'react';
import { cn } from '@/lib/utils';

type PostProps = {
  post: Post;
  locale?: string;
};

export default function Post({ post, locale = blogConfig.defaultLocale }: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const { title, description, tags, date, image, imageAlt } = frontmatter;
  const [isSaved, setIsSaved] = useState(false);

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
        {/* Hero Section with Image */}
        <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
          {image ? (
            <>
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
            </>
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          )}
          
          {/* Navigation Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 z-10">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <Link 
                href="/blogg" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Tillbaka till bloggen</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={cn(
                    "p-2 rounded-lg backdrop-blur-sm transition-all",
                    isSaved 
                      ? "bg-purple-600 text-white hover:bg-purple-700" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                  aria-label="Spara artikel"
                >
                  <BookmarkPlus className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  aria-label="Dela artikel"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Title Section */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-5xl mx-auto">
              <FadeInView delay={0.2} duration={0.8}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h1>
              </FadeInView>
              
              {description && (
                <FadeInView delay={0.4} duration={0.8}>
                  <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
                    {description}
                  </p>
                </FadeInView>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <Card className="prose prose-lg mx-auto max-w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl">
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
              className="prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg"
            />
            
            <Footer locale={locale} />
          </Card>
        </div>
      </article>
    </>
  );
}