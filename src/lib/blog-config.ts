export const blogConfig = {
  siteName: 'Anpassad Webb',
  postsPerPage: 12,
  defaultLocale: 'sv-SE',
  fallbackDate: '2025-01-01',
  labels: {
    sv: {
      published: 'Publicerad:',
      readMore: 'Läs hela artikeln',
      contactUs: 'Vill du veta mer? Kontakta oss gärna!',
      previousPost: 'Föregående inlägg',
      nextPost: 'Nästa inlägg',
      allPosts: 'Alla inlägg',
      byTag: 'Inlägg taggade med',
      noPostsFound: 'Inga inlägg hittades',
      loading: 'Laddar...',
    },
    en: {
      published: 'Published:',
      readMore: 'Read full article',
      contactUs: 'Want to know more? Contact us!',
      previousPost: 'Previous post',
      nextPost: 'Next post',
      allPosts: 'All posts',
      byTag: 'Posts tagged with',
      noPostsFound: 'No posts found',
      loading: 'Loading...',
    },
  },
} as const;

export function getLabel(
  key: keyof typeof blogConfig.labels.sv,
  locale: string = blogConfig.defaultLocale,
): string {
  const lang = locale.startsWith('sv') ? 'sv' : 'en';
  return blogConfig.labels[lang][key];
}
