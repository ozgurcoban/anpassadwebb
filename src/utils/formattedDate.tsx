export default function formatDate(
  publishedAt: string | null | undefined,
): string | null {
  return publishedAt
    ? new Date(publishedAt).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
}
