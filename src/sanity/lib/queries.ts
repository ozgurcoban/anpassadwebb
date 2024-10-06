import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset->{
      url,
      metadata {
        lqip
      }
    },
    alt
  },
  tags[]->{
    _id,
    title,
    slug,
    description
  }
}`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    subtitle,
    publishedAt,
    tags[]->{
    _id,
    slug,
    title,
    description
  },
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt
    },
    body[]{
      ...,
      _type == "image" => {
        _key,
        alt,
        asset->{
          _id,
          url,
          metadata {
            lqip
          }
        }
      },
    }
  }
`;

export const FEATURED_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) [0...4]{
  _id, title, slug, mainImage, excerpt, tags[]->{
    _id,
    slug,
    title,
  },
}`;

export const TAGS_QUERY = groq`*[_type == "tag"] {
  title,
  slug,
  description,
    _id
}`;
