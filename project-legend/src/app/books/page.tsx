"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";
import { books as defaultBooks } from "@/data/books";

export default function BooksPage() {
  const books = useContent("books", defaultBooks);
  const list = Array.isArray(books) ? books : defaultBooks;

  return (
    <Section
      title="Publications"
      subtitle="The books that have shaped physics education for millions."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {list.map((book: { id: string; title: string; subtitle?: string; description: string; coverPlaceholder?: string; purchaseLink?: string }) => (
          <Card key={book.id} as="article">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-32 h-44 sm:w-40 sm:h-56 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-2xl font-heading font-bold text-slate-500 dark:text-slate-400">
                  {book.coverPlaceholder || "HCV"}
                </span>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {book.title}
                  {book.subtitle && (
                    <span className="text-amber-500"> — {book.subtitle}</span>
                  )}
                </h3>
                <p className="text-foreground/70 mt-2 flex-1">{book.description}</p>
                {book.purchaseLink && (
                  <a
                    href={book.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <Button variant="outline" size="sm">
                      Find on Amazon
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
