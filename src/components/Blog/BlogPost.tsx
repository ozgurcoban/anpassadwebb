import { POST_QUERYResult } from '../../../sanity.types';
import { Card } from '@/components/ui/card';
import Header from './BlogHeader';
import Content from './BlogContent';
import Footer from './BlogFooter';
import { blogConfig } from '@/lib/blog-config';

type PostProps = {
  post: POST_QUERYResult;
  locale?: string;
};

export default function Post({ post, locale = blogConfig.defaultLocale }: PostProps) {
  const { title, mainImage, body, subtitle, tags, publishedAt } = post || {};

  const alt = (mainImage as { alt?: string })?.alt ?? '';

  return (
    <article>
      <h2 className="text-center text-7xl">{blogConfig.siteName}</h2>
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        {title && subtitle && publishedAt ? (
          <Header
            title={title}
            subtitle={subtitle}
            tags={tags || null}
            published={publishedAt}
            locale={locale}
          />
        ) : (
          <p>Missing header information</p>
        )}
        <Content image={mainImage} alt={alt} body={body} />
        {/* <hr /> */}
        <Footer locale={locale} />
      </Card>
    </article>
  );
}
