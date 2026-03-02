"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";

const defaultAbout = {
  name: "H.C. Verma",
  imagePlaceholder: "HCV",
  bioParagraphs: [
    "Dr. Harish Chandra Verma is a distinguished Indian physicist and educator. He served as a professor in the Department of Physics at IIT Kanpur, where he dedicated decades to teaching and inspiring countless students.",
    "His most notable contribution is the two-volume textbook Concepts of Physics, which has become the cornerstone of physics education for JEE and other competitive examinations in India. The books are celebrated for their clarity, conceptual depth, and carefully crafted problem sets.",
  ],
  achievements: [
    {
      title: "IIT Kanpur",
      description:
        "Long-standing faculty member in the Department of Physics, mentoring generations of engineers and scientists.",
    },
    {
      title: "Concepts of Physics",
      description:
        "Author of the definitive two-volume textbook used by millions of students preparing for JEE and similar examinations.",
    },
    {
      title: "Teaching Philosophy",
      description:
        "Believing that physics should be understood, not memorized—focusing on intuition and conceptual clarity.",
    },
  ],
  quoteText:
    "Physics is not about memorizing formulas—it's about understanding the way the universe works.",
  quoteAuthor: "H.C. Verma",
};

export default function AboutPage() {
  const about = useContent("about", defaultAbout);
  const data = about && typeof about === "object" ? about : defaultAbout;
  const bioParagraphs = Array.isArray(data.bioParagraphs)
    ? data.bioParagraphs
    : defaultAbout.bioParagraphs;
  const achievements = Array.isArray(data.achievements)
    ? data.achievements
    : defaultAbout.achievements;

  return (
    <>
      <Section className="pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
              <span className="text-5xl text-slate-400 dark:text-slate-500 font-heading font-bold">
                {data.imagePlaceholder || "HCV"}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {data.name || "H.C. Verma"}
              </h1>
              {bioParagraphs.map((p: string, i: number) => (
                <p
                  key={i}
                  className="text-foreground/80 text-lg leading-relaxed mb-6 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Key Achievements"
        subtitle="A career dedicated to physics education."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a: { title: string; description: string }, i: number) => (
            <Card key={i}>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {a.title}
              </h3>
              <p className="text-foreground/70">{a.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card hover={false} className="max-w-3xl mx-auto text-center">
          <blockquote className="font-heading text-2xl md:text-3xl text-foreground/90 italic">
            &ldquo;{data.quoteText}&rdquo;
          </blockquote>
          <p className="mt-4 text-foreground/60">— {data.quoteAuthor}</p>
        </Card>
      </Section>
    </>
  );
}
