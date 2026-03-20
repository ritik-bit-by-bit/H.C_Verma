import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Insights on teaching physics, education, and conceptual clarity.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Section title="Research & Insights" subtitle="Transmissions regarding physics, pedagogy, and conceptual evolution.">
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block focus:outline-none">
            <Card as="article" className="h-full flex flex-col group-hover:-translate-y-1 transition-transform duration-500">
              <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {post.meta.title}
              </h3>
              <p className="text-foreground/70 mt-3 line-clamp-2 font-light leading-relaxed flex-1">
                {post.meta.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-white/40 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-foreground/50">
                  <time dateTime={post.meta.date}>
                    {new Date(post.meta.date).toLocaleDateString("en-IN", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </time>
                  {post.meta.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-accent/50 text-transparent">.</span>
                      <span>{post.meta.readTime}</span>
                    </>
                  )}
                </div>
                <span className="text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Access <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-accent/60 py-20 font-mono tracking-widest uppercase text-sm">
          &lt; ERROR: No entries found /&gt;
        </p>
      )}
    </Section>
  );
}
