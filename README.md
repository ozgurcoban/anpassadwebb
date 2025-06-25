# Anpassad Webb

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
tags: ['Next.js', 'React']
categories: ['Tutorial']
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
import { Button } from '@/components/ui/button';

<Button>Click me!</Button>
```

## Custom Components

### BeforeAfterSlider

An interactive before/after image comparison slider with keyboard navigation, animations, and extensive customization options.

**Demo** (Internal/Development Only): [http://localhost:3000/before-after-demo](http://localhost:3000/before-after-demo)

**Component Location**: `src/components/BeforeAfterSlider.tsx`

#### Props

| Prop                     | Type                   | Default         | Description                              |
| ------------------------ | ---------------------- | --------------- | ---------------------------------------- |
| **beforeImage**          | `string`               | _required_      | URL of the before image                  |
| **afterImage**           | `string`               | _required_      | URL of the after image                   |
| **beforeLabel**          | `string`               | `"Before"`      | Label for the before image               |
| **afterLabel**           | `string`               | `"After"`       | Label for the after image                |
| **title**                | `string`               | -               | Optional title above/below the slider    |
| **description**          | `string`               | -               | Optional description text                |
| **titleClassName**       | `string`               | -               | Custom CSS classes for title             |
| **descriptionClassName** | `string`               | -               | Custom CSS classes for description       |
| **headerPosition**       | `"top" \| "bottom"`    | `"top"`         | Position of title/description            |
| **className**            | `string`               | -               | Additional CSS classes for the container |
| **aspectRatio**          | `string`               | `"16/9"`        | CSS aspect ratio (e.g., "4/3", "1/1")    |
| **initialPosition**      | `number`               | `35`            | Initial slider position (0-100)          |
| **labelPosition**        | `LabelPosition`        | `"bottom-left"` | Default position for both labels         |
| **beforeLabelPosition**  | `LabelPosition`        | -               | Override position for before label       |
| **afterLabelPosition**   | `LabelPosition`        | -               | Override position for after label        |
| **labelClassName**       | `string`               | -               | CSS classes for both labels              |
| **beforeLabelClassName** | `string`               | -               | Override classes for before label        |
| **afterLabelClassName**  | `string`               | -               | Override classes for after label         |
| **sliderLineWidth**      | `number`               | `2`             | Width of the slider line in pixels       |
| **sliderLineColor**      | `string`               | `"white"`       | Color of the slider line                 |
| **sliderHandleColor**    | `string`               | `"white"`       | Color of the slider handle               |
| **sliderHandleSize**     | `"sm" \| "md" \| "lg"` | `"md"`          | Size of the slider handle                |
| **animateOnHover**       | `boolean`              | `false`         | Enable hover animations                  |
| **transitionDuration**   | `number`               | `0`             | Transition duration in milliseconds      |
| **overlayOpacity**       | `number`               | `0`             | Dark overlay opacity (0-1)               |
| **borderRadius**         | `string`               | -               | Custom border radius (e.g., "1rem")      |
| **disabled**             | `boolean`              | `false`         | Disable all interactions                 |
| **onPositionChange**     | `function`             | -               | Callback when position changes           |
| **ariaLabelBefore**      | `string`               | -               | Accessibility label for before image     |
| **ariaLabelAfter**       | `string`               | -               | Accessibility label for after image      |

**Label Positions**: `"bottom-left"`, `"bottom-right"`, `"top-left"`, `"top-right"`, `"bottom-center"`, `"top-center"`

#### Usage Examples

**Basic Usage:**

```tsx
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
/>;
```

**With Title and Description:**

```tsx
<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  title="Website Redesign"
  description="See how our modern redesign transformed the user experience"
  beforeLabel="Old Design"
  afterLabel="New Design"
/>
```

**Advanced Customization:**

```tsx
<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  title="UI Transformation"
  description="Modern design with improved accessibility"
  beforeLabel="Original"
  afterLabel="Enhanced"
  initialPosition={50}
  labelPosition="top-center"
  sliderHandleSize="lg"
  animateOnHover={true}
  transitionDuration={200}
  overlayOpacity={0.1}
  borderRadius="1rem"
  className="shadow-2xl"
  onPositionChange={(pos) => console.log(`Position: ${pos}%`)}
/>
```

**Custom Styling:**

```tsx
<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  sliderLineWidth={4}
  sliderLineColor="#3b82f6"
  sliderHandleColor="#3b82f6"
  aspectRatio="4/3"
  borderRadius="1.5rem"
  className="mx-auto max-w-2xl"
/>
```

#### Keyboard Navigation

When the slider is focused, users can navigate with:

- **Arrow Left/Right**: Move slider by 5%
- **Home**: Jump to start (0%)
- **End**: Jump to end (100%)

### Favicon

The project includes a custom favicon based on the logo component with a gradient design.

#### Favicon Files

- `public/favicon.svg` - SVG favicon for modern browsers
- `public/favicon.ico` - Legacy favicon
- `public/favicon-16x16.png` - 16x16 PNG favicon
- `public/favicon-32x32.png` - 32x32 PNG favicon
- `public/apple-touch-icon.png` - 180x180 Apple touch icon

#### Favicon Generator

To generate new favicon PNG files from the logo, use the FaviconGenerator component:

1. Temporarily add the component to a page:

```tsx
import FaviconGenerator from '@/components/FaviconGenerator';

// In your page component
<FaviconGenerator />;
```

2. Visit the page and use the download buttons to get PNG files in different sizes
3. Place the downloaded files in the `public/` directory
4. For `.ico` file, use an online converter with the 16x16 and 32x32 PNG files

The favicon metadata is already configured in `src/app/(site)/layout.tsx`.

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
