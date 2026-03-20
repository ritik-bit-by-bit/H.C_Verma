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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto px-6 max-w-3xl py-24 relative z-10">
      <Link
        href="/blog"
        className="inline-flex items-center text-accent hover:text-accent-muted font-semibold text-sm mb-12 tracking-wider uppercase transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Return to Portal
      </Link>

      <header className="mb-12 relative">
        <div className="absolute -left-8 top-0 bottom-0 w-1 bg-accent/20 rounded-full hidden md:block" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
          {post.meta.title}
        </h1>
        <div className="mt-6 flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-foreground/50 border-b border-white/60 pb-8">
          <time dateTime={post.meta.date}>
            {new Date(post.meta.date).toLocaleDateString("en-IN", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
          {post.meta.readTime && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              <span>{post.meta.readTime}</span>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-white/60 prose-img:shadow-glass prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-heading prose-blockquote:text-foreground/90 prose-blockquote:italic">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-20 pt-10 border-t border-white/40 flex justify-center">
        <Button href="/blog" variant="secondary" className="px-10">
          Close Transmission
        </Button>
      </div>
    </article>
  );
}
