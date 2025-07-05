import Link from "next/link";
import { cn, slugify } from "@/lib/utils";
import { getTagClasses } from "@/lib/styles/blog";

interface TagBadgeProps {
  tag: string;
  variant?: "default" | "selected" | "outline" | "muted" | "counter";
  size?: "sm" | "md" | "lg";
  href?: string;
  showHash?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagBadge({ 
  tag, 
  variant = "outline", 
  size = "md",
  href,
  showHash = true,
  onClick,
  className 
}: TagBadgeProps) {
  const slug = slugify(tag);
  const defaultHref = `/blogg/tag/${slug}`;
  const classes = cn(getTagClasses(variant, size), className);
  const content = `${showHash ? '#' : ''}${tag}`;
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(classes, "cursor-pointer")}
      >
        {content}
      </button>
    );
  }
  
  return (
    <Link
      className={cn(classes, "no-underline whitespace-nowrap")}
      href={href || defaultHref}
    >
      {content}
    </Link>
  );
}