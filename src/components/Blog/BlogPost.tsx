import { type Post } from '@/lib/mdx';
import { Card } from '@/components/ui/card';
import Header from './BlogHeader';
import Content from './BlogContent';
import Footer from './BlogFooter';
import { blogConfig } from '@/lib/blog-config';

type PostProps = {
  post: Post;
  locale?: string;
};

export default function Post({ post, locale = blogConfig.defaultLocale }: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const { title, description, tags, date, image, imageAlt } = frontmatter;

  return (
    <article>
      <h2 className="text-center text-7xl">{blogConfig.siteName}</h2>
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        {title && date ? (
          <Header
            title={title}
            subtitle={description}
            tags={tags || []}
            published={date}
            readingTime={readingTime.text}
            locale={locale}
          />
        ) : (
          <p>Missing header information</p>
        )}
        <Content 
          content={content} 
          image={image} 
          imageAlt={imageAlt || title}
        />
        <Footer locale={locale} />
      </Card>
    </article>
  );
}