# Digital Studio

A modern web development agency website built with Next.js 14 and MDX.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Content**: MDX (Markdown + React Components)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Email**: Resend
- **State Management**: Zustand

## Features

- ✅ MDX-based blog with full-text search
- ✅ Dark mode support
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Contact form with email notifications
- ✅ Reading time estimation
- ✅ Tag-based content filtering
- ✅ Featured posts
- ✅ Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd digital-studio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```env
RESEND_API_KEY=your-resend-api-key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

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
├── public/
│   └── images/         # Static images
└── typing.d.ts         # Global type definitions
```

## Content Management

### Creating a Blog Post

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: Your Post Title
description: A brief description of your post
date: 2024-01-18
tags: ["Next.js", "React"]
categories: ["Tutorial"]
author: Your Name
featured: false
image: /images/post-image.jpg
imageAlt: Description of the image
---

# Your Post Title

Your content here...
```

### MDX Components

You can use React components directly in your MDX files:

```mdx
import { Button } from '@/components/ui/button'

<Button>Click me!</Button>
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.