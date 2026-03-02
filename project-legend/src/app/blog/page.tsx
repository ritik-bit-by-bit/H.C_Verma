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
    <Section
      title="Blog"
      subtitle="Insights on physics, teaching, and education."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card as="article" className="h-full flex flex-col">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {post.meta.title}
              </h3>
              <p className="text-foreground/70 mt-2 line-clamp-2">
                {post.meta.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-foreground/50">
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.meta.readTime && <span>{post.meta.readTime}</span>}
              </div>
              <span className="inline-flex items-center mt-4 text-amber-500 text-sm font-medium">
                Read more →
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-foreground/60 py-12">No posts yet.</p>
      )}
    </Section>
  );
}
