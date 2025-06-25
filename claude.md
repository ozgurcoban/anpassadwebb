# Anpassad Webb

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- MDX (Markdown + React Components)
- shadcn/ui
- Tailwind CSS

## Project Structure

```
├── app/
│   ├── (site)/         # Main site routes
│   └── api/            # API routes
├── components/
│   ├── ui/             # shadcn/ui components
│   └── [feature]/      # Feature-specific components
├── content/
│   ├── posts/          # Blog posts in MDX format
│   ├── pages/          # Static pages in MDX
│   └── data/           # JSON/YAML data files
├── lib/
│   ├── mdx.ts          # MDX utilities
│   └── utils.ts        # Utility functions
└── typing.d.ts         # Global type definitions
```

## Key Rules

- Content in MDX format in content/ directory
- Server components by default ("use client" only when needed)
- Use cn() utility for className merging
- Path alias: @/ for root imports

## MDX Content Structure

### Blog Post Frontmatter

```yaml
---
title: Post Title
description: Brief description
date: 2024-01-18
tags: ['Tag1', 'Tag2']
categories: ['Category']
author: Author Name
featured: true/false
image: /images/post-image.jpg
imageAlt: Image description
---
```

### Type Patterns

- PostFrontmatter interface for metadata
- Post interface includes frontmatter + content + readingTime
- Tag/Category interfaces with name, slug, count

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript checking
- `npm run lint` - Run ESLint
