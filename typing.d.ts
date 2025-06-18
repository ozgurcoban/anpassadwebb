// MDX types
declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

// Global types
interface Window {
  // Add any custom window properties here
}

// Utility types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// Common types used across the application
interface BaseMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
}

// Form types
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Image types
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Blog types (now used with MDX)
interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  categories: string[];
  author: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

interface Tag {
  name: string;
  slug: string;
  count: number;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}