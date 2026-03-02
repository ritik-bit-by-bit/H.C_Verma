import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getBlogPost, getBlogSlugs } from "@/lib/mdx";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-foreground/70 hover:text-amber-500 text-sm mb-8"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {post.meta.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-foreground/60">
          <time dateTime={post.meta.date}>
            {new Date(post.meta.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.meta.readTime && <span>{post.meta.readTime}</span>}
        </div>
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-12">
        <Button href="/blog" variant="ghost">
          ← Back to Blog
        </Button>
      </div>
    </article>
  );
}
