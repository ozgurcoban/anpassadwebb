import { POST_QUERYResult } from '../../../sanity.types';

import { Card } from '@/components/ui/card';
import Header from './BlogHeader';
import Content from './BlogContent';
import Footer from './BlogFooter';

export default function POST({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, subtitle, tags, publishedAt } = post || {};

  const alt = (mainImage as { alt?: string })?.alt;

  return (
    <article>
      <h2 className="text-center text-7xl">ByteSpark</h2>
      <Card className="prose prose-lg mx-auto mt-8 max-w-full">
        <Header
          title={title}
          subtitle={subtitle}
          tag={tags}
          published={publishedAt}
        />
        <Content image={mainImage} alt={alt} body={body} />
        {/* <hr /> */}
        <Footer />
      </Card>
    </article>
  );
}
