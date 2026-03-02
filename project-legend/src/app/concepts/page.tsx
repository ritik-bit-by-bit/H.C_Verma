"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";
import { concepts as defaultConcepts } from "@/data/concepts";

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
    <Section
      title="Physics Concepts"
      subtitle="Browse topics covered in Concepts of Physics."
    >
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="search"
          placeholder="Search concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-background text-foreground focus:ring-2 focus:ring-amber-500/50 outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-amber-500 text-slate-900"
                : "bg-slate-200 dark:bg-slate-700 text-foreground/80 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-900"
                  : "bg-slate-200 dark:bg-slate-700 text-foreground/80 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredConcepts.map((concept: { id: string; category: string; title: string; description: string; bookPart?: number; chapter?: number }) => (
          <Card key={concept.id} as="article">
            <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
              {concept.category}
            </span>
            <h3 className="font-heading text-xl font-semibold text-foreground mt-2">
              {concept.title}
            </h3>
            <p className="text-foreground/70 mt-2">{concept.description}</p>
            {concept.bookPart && concept.chapter && (
              <p className="text-sm text-foreground/50 mt-4">
                Concepts of Physics Part {concept.bookPart}, Chapter {concept.chapter}
              </p>
            )}
          </Card>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <p className="text-center text-foreground/60 py-12">
          No concepts match your search.
        </p>
      )}
    </Section>
  );
}
