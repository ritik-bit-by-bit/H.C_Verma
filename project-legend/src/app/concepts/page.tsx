"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";
import { concepts as defaultConcepts } from "@/data/concepts";
import { motion, AnimatePresence } from "framer-motion";

export default function ConceptsPage() {
  const conceptsData = useContent("concepts", defaultConcepts);
  const concepts = Array.isArray(conceptsData) ? conceptsData : defaultConcepts;
  const categories = useMemo(
    () => Array.from(new Set(concepts.map((c: { category: string }) => c.category))),
    [concepts]
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredConcepts = concepts.filter((c: { category: string; title: string; description: string }) => {
    const matchCategory = !selectedCategory || c.category === selectedCategory;
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Section title="Physics Concepts" subtitle="Browse topics structured by mathematical laws and physical rules.">
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
        <div className="relative w-full md:flex-1">
          <input
            type="search"
            placeholder="Search database..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-white/60 bg-white/50 backdrop-blur-md text-foreground focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none shadow-sm transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all border ${
              !selectedCategory
                ? "bg-accent/10 border-accent/40 text-accent shadow-glow"
                : "bg-white/40 border-white/60 text-foreground/70 hover:bg-white/60 hover:text-foreground"
            }`}
          >
            ALL_MODULES
          </button>
          {categories.map((cat) => (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all border ${
                selectedCategory === cat
                  ? "bg-accent/10 border-accent/40 text-accent shadow-glow"
                  : "bg-white/40 border-white/60 text-foreground/70 hover:bg-white/60 hover:text-foreground"
              }`}
            >
              {typeof cat === 'string' ? cat.toUpperCase().replace(/\s+/g, '_') : String(cat)}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid xl:grid-cols-2 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredConcepts.map((concept: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
              key={concept.id}
            >
              <Card as="article" className="h-full flex flex-col group">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-black tracking-widest uppercase rounded-full w-max mb-3 border border-accent/20">
                  {concept.category}
                </span>
                <h3 className="font-heading text-2xl font-bold text-foreground mt-2 tracking-tight group-hover:text-accent transition-colors">
                  {concept.title}
                </h3>
                <p className="text-foreground/70 mt-3 font-light leading-relaxed flex-1">
                  {concept.description}
                </p>
                {concept.bookPart && concept.chapter && (
                  <div className="mt-6 pt-4 border-t border-white/40 flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
                      Concepts of Physics
                    </p>
                    <p className="text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-md">
                      P{concept.bookPart} | CH{concept.chapter}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredConcepts.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-accent/60 py-20 font-mono tracking-widest uppercase text-sm"
        >
          &lt; ERROR: No matching concepts found in database /&gt;
        </motion.p>
      )}
    </Section>
  );
}
