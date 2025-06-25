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
      className={badgeVariants({ variant, className })}
      href={`/blogg/tag/${slug}`}
    >
      #{tag.toLowerCase()}
    </Link>
  );
}