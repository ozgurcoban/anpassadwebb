import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { BlogPost } from '@/components/Blog';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return notFound();
  }
  
  return <BlogPost post={post} />;
}
