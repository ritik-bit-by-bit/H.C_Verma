import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  readTime?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
}

export function getBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      return getBlogPost(slug);
    })
    .filter((p): p is BlogPost => p !== null);
  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    meta: data as BlogPostMeta,
    content,
  };
}

