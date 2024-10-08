export type Tag = {
  title: string;
  slug: { current?: string; source?: string } | null;
  _id: string;
  description?: string;
  // postCount?: number;
};
