export default function FormattedDate(
  publishedAt: string | null | undefined,
): string | null {
  if (!publishedAt) return null;
  const date = new Date(publishedAt);
  const formatted = date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
