import { blogConfig } from "@/lib/blog-config";

export default function FormattedDate(
  publishedAt: string | null | undefined,
  locale: string = blogConfig.defaultLocale
): string | null {
  if (!publishedAt) return null;
  const date = new Date(publishedAt);
  const formatted = date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatDateWithFallback(
  date: string | null | undefined,
  locale: string = blogConfig.defaultLocale
): string {
  return FormattedDate(date, locale) || FormattedDate(blogConfig.fallbackDate, locale)!;
}
