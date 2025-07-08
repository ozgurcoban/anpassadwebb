import { MetadataRoute } from 'next';
import { getPostSlugs, getPostBySlug } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anpassadwebb.se';
  
  // Static pages with fixed dates (update these when content changes significantly)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogg`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/paket`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/boka-mote`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic blog posts with actual dates from frontmatter
  const blogSlugs = getPostSlugs();
  const blogPosts = blogSlugs.map((slug) => {
    const post = getPostBySlug(slug);
    return {
      url: `${baseUrl}/blogg/${slug}`,
      lastModified: post ? new Date(post.frontmatter.date) : new Date('2025-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  return [...staticPages, ...blogPosts];
}