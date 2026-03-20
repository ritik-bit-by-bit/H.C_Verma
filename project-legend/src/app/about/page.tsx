"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";
import { motion } from "framer-motion";

const defaultAbout = {
  name: "H.C. Verma",
  imagePlaceholder: "HCV",
  bioParagraphs: [
    "Dr. Harish Chandra Verma is a distinguished Indian physicist and educator. He served as a professor in the Department of Physics at IIT Kanpur, where he dedicated decades to teaching and inspiring countless students.",
    "His most notable contribution is the two-volume textbook Concepts of Physics, which has become the cornerstone of physics education for JEE and other competitive examinations in India. The books are celebrated for their clarity, conceptual depth, and carefully crafted problem sets.",
  ],
  achievements: [
    { title: "IIT Kanpur", description: "Long-standing faculty member in the Department of Physics, mentoring generations of engineers and scientists." },
    { title: "Concepts of Physics", description: "Author of the definitive two-volume textbook used by millions of students preparing for JEE and similar examinations." },
    { title: "Teaching Philosophy", description: "Believing that physics should be understood, not memorized—focusing on intuition and conceptual clarity." },
  ],
  quoteText: "Physics is not about memorizing formulas—it's about understanding the way the universe works.",
  quoteAuthor: "H.C. Verma",
};

export default function AboutPage() {
  const about = useContent("about", defaultAbout);
  const data = about && typeof about === "object" ? about : defaultAbout;
  const bioParagraphs = Array.isArray(data.bioParagraphs) ? data.bioParagraphs : defaultAbout.bioParagraphs;
  const achievements = Array.isArray(data.achievements) ? data.achievements : defaultAbout.achievements;

  return (
    <>
      <Section className="pt-8 relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-[2rem] bg-white/40 border border-white/60 shadow-glass flex items-center justify-center overflow-hidden relative group backdrop-blur-xl">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <span className="text-5xl text-accent font-heading font-black tracking-widest relative z-10">
                {data.imagePlaceholder || "HCV"}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                {data.name || "H.C. Verma"}
              </h1>
              <div className="space-y-6">
                {bioParagraphs.map((p: string, i: number) => (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    key={i}
                    className="text-foreground/70 text-lg leading-relaxed font-light"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section title="Key Achievements" subtitle="A career dedicated to structural physics education.">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((a: { title: string; description: string }, i: number) => (
            <motion.div key={i} variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
            }}>
              <Card className="h-full flex flex-col justify-center">
                <h3 className="font-heading text-xl font-bold text-accent mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                  {a.title}
                </h3>
                <p className="text-foreground/70 font-light leading-relaxed">{a.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card hover={false} className="max-w-4xl mx-auto text-center border-accent/20 bg-accent/5 py-12">
            <blockquote className="font-heading text-3xl md:text-4xl text-foreground font-medium leading-tight tracking-tight mb-8">
              &ldquo;{data.quoteText}&rdquo;
            </blockquote>
            <p className="mt-4 text-accent font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-accent/40"></span>
              {data.quoteAuthor}
              <span className="h-px w-12 bg-accent/40"></span>
            </p>
          </Card>
        </motion.div>
      </Section>
    </>
  );
}
