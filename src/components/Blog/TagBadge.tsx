import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function TagBadge({ tag, variant = "outline", className }: TagBadgeProps) {
  const slug = tag.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link
      className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary/70 text-sm font-medium transition-all duration-300 whitespace-nowrap dark:text-gray-300 dark:hover:text-primary/80 no-underline"
      href={`/blogg/tag/${slug}`}
    >
      #{tag}
    </Link>
  );
}