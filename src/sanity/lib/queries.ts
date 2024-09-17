import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, excerpt, mainImage,
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  title, body, subtitle, excerpt,  mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip
        }
      }
    }
}`;

export const FEATURED_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) [0...3]{
  _id, title, slug, mainImage, excerpt
}`;
