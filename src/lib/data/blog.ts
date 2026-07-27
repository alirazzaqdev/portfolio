export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  readTime: string;
  category: string;
  tags: string[];
  content: BlogSection[];
}

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

/**
 * Blog posts authored by Ali Razzaq. Add new posts as written.
 * Blog index and preview auto-hide when this array is empty.
 */
export const posts: BlogPost[] = [];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
