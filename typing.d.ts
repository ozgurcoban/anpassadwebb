// Base type that all Sanity documents extend
type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

// Slug type
interface Slug {
  _type: "slug";
  current: string;
}

// Reference type for Sanity references
interface Reference {
  _ref: string;
  _type: "reference";
}

// Image type for Sanity
interface Image {
  _type: "image";
  asset: Reference;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  metadata?: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    palette?: {
      dominant?: {
        background: string;
        foreground: string;
        title: string;
        population: number;
      };
    };
  };
}

// Block content types (Portable Text)
interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Block {
  _key: string;
  _type: "block";
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  children: Span[];
  markDefs?: MarkDef[];
  level?: number;
  listItem?: "bullet" | "number";
}

interface MarkDef {
  _key: string;
  _type: "link";
  href: string;
}

interface BlockImage {
  _key: string;
  _type: "image";
  asset: Reference;
  alt?: string;
  caption?: string;
}

type BlockContent = Array<Block | BlockImage>;

// Document types
interface Post extends Base {
  title: string;
  slug: Slug;
  excerpt?: string;
  body: BlockContent;
  coverImage?: Image;
  categories?: Reference[];
  tags?: Reference[];
  publishedAt?: string;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: Image;
  };
}

interface Category extends Base {
  title: string;
  slug: Slug;
  description?: string;
}

interface Tag extends Base {
  title: string;
  slug: Slug;
}

interface Author extends Base {
  name: string;
  slug: Slug;
  bio?: BlockContent;
  image?: Image;
}

// Extended types for populated queries
interface PostWithReferences extends Omit<Post, "categories" | "tags"> {
  categories?: Category[];
  tags?: Tag[];
}

// Query result types (with slug as string)
interface PostQueryResult extends Omit<Post, "slug"> {
  slug: string;
}

interface CategoryQueryResult extends Omit<Category, "slug"> {
  slug: string;
}

interface TagQueryResult extends Omit<Tag, "slug"> {
  slug: string;
}

interface AuthorQueryResult extends Omit<Author, "slug"> {
  slug: string;
}