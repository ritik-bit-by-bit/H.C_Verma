"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";

export function FeaturedBook() {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [link, setLink] = useState<string>("/books");

  useEffect(() => {
    const loadData = async () => {
      const result = await fetch("/api/getFeaturedPublication");
      const data = await result.json();
      const first = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (first) {
        setTitle(first.title);
        setDescription(first.description);
        setImage(first.image);
        setLink(first.link || "/books");
      }
    };
    loadData();
  }, []);

  if (!title && !description) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card hover={false} className="overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
              <span className="text-6xl text-slate-400 dark:text-slate-500 font-heading font-bold">
                HCV
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-foreground/60">No featured publication set. Add one from the admin site.</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card hover={false} className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
            <span className="text-6xl text-slate-400 dark:text-slate-500 font-heading font-bold">
              {image || "HCV"}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-foreground/70 mb-4">
              {description}
            </p>
            <Button href={link} variant="primary">
              View All Publications
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
