"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";
import { books as defaultBooks } from "@/data/books";
import { motion } from "framer-motion";

export default function BooksPage() {
  const books = useContent("books", defaultBooks);
  const list = Array.isArray(books) ? books : defaultBooks;

  const container: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemAnim: any = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <Section title="Publications Archive" subtitle="The definitive texts that shaped modern physics education.">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-10"
      >
        {list.map((book: any, idx: number) => (
          <motion.div key={book.id || idx} variants={itemAnim} className="h-full">
            <Card as="article" className="h-full group hover:-translate-y-2 transition-transform duration-500">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 w-32 h-44 sm:w-40 sm:h-56 rounded-xl bg-white/50 border border-white/60 shadow-glass flex items-center justify-center overflow-hidden relative group-hover:shadow-glow transition-all">
                  <div className="absolute inset-0 bg-accent/5" />
                  <span className="text-3xl font-heading font-black text-accent/30 tracking-widest relative z-10 group-hover:scale-110 transition-transform">
                    {book.coverPlaceholder || "HCV"}
                  </span>
                </div>
                <div className="flex-1 flex flex-col pt-2">
                  <h3 className="font-heading text-2xl font-bold text-foreground tracking-tight leading-tight">
                    {book.title}
                    {book.subtitle && (
                      <span className="block text-accent text-sm mt-1 uppercase tracking-widest font-semibold">
                        {book.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-foreground/70 mt-4 font-light leading-relaxed flex-1">
                    {book.description}
                  </p>
                  {book.purchaseLink && (
                    <div className="mt-6">
                      <Button href={book.purchaseLink} variant="outline" size="sm" className="w-full sm:w-auto shadow-sm">
                        Acquire Texts
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
