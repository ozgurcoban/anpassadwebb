import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import type { Tag } from "@/types/blog";

interface TagBadgeProps {
  tag: Tag;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function TagBadge({ tag, variant = "outline", className }: TagBadgeProps) {
  return (
    <Link
      className={badgeVariants({ variant, className })}
      href={`/tag/${tag.slug?.current}`}
    >
      #{tag.title?.toLowerCase()}
    </Link>
  );
}