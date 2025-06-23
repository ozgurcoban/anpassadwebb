import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'
import { Redis } from '@upstash/redis'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  categories: string[]
  author: string
  featured?: boolean
  image?: string
  imageAlt?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const stats = readingTime(content)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => 
      new Date(post2.frontmatter.date).getTime() - 
      new Date(post1.frontmatter.date).getTime()
    )
  
  return posts
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.frontmatter.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => 
    post.frontmatter.categories.includes(category)
  )
}

export function getFeaturedPosts(limit: number = 3): Post[] {
  return getAllPosts()
    .filter(post => post.frontmatter.featured)
    .slice(0, limit)
}

export function getAllTags(): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPosts()
  const tagCounts = new Map<string, number>()
  
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => b.count - a.count)
}

export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPosts()
  const categoryCounts = new Map<string, number>()
  
  posts.forEach(post => {
    post.frontmatter.categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
    })
  })
  
  return Array.from(categoryCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => b.count - a.count)
}

export function getPageBySlug(slug: string): { slug: string; frontmatter: any; content: string } | null {
  const fullPath = path.join(pagesDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data,
    content
  }
}

export async function getMostReadPosts(limit: number = 3): Promise<Post[]> {
  try {
    const posts = getAllPosts()
    const redis = Redis.fromEnv()
    
    // Get view counts for all posts
    const postsWithViews = await Promise.all(
      posts.map(async (post) => {
        const views = await redis.get<number>(`post:${post.slug}:views`) || 0
        return { ...post, views }
      })
    )
    
    // Sort by views and return top posts
    return postsWithViews
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
      .map(({ views, ...post }) => post)
  } catch (error) {
    console.error('Error fetching most read posts:', error)
    // Fallback to featured posts if KV is not available
    return getFeaturedPosts(limit)
  }
}