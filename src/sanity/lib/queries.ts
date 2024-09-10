import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, mainImage, excerpt
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage, subtitle, excerpt
}`;

export const FEATURED_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) [0...3]{
  _id, title, slug, mainImage, excerpt
}`;
