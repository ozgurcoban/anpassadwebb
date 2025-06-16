# Digital Studio Project

## Tech Stack
- Next.js (App Router)
- TypeScript
- Sanity CMS
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
├── sanity/
│   ├── lib/
│   │   ├── queries.ts  # All Sanity queries
│   │   └── client.ts   # Sanity client config
│   └── schemas/        # Sanity schema definitions
├── lib/
│   └── utils.ts        # Utility functions
└── typing.d.ts         # Global type definitions
```

## Key Rules
- All Sanity queries in sanity/lib/queries.ts
- Define all Sanity types in typing.d.ts
- Server components by default ("use client" only when needed)
- Use cn() utility for className merging
- Path alias: @/ for root imports

## TypeScript Type Structure

### Base Types (Always the same)
```ts
type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Image {
  _type: "image";
  _key: string;
  asset: Reference;
  alt?: string;
}

interface Reference {
  _ref: string;
  _type: "reference";
}
```

### Type Patterns
- Extend Base for all Sanity documents
- Match property names to Sanity schema fields
- Use optional (?) for non-required fields
- Group related types together

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript checking
- `npm run lint` - Run ESLint