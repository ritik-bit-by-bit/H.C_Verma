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
      try {
        const result = await fetch("/api/getFeaturedPublication");
        const data = await result.json();
        const first = Array.isArray(data) && data.length > 0 ? data[0] : null;
        if (first) {
          setTitle(first.title);
          setDescription(first.description);
          setImage(first.image);
          setLink(first.link || "/books");
        }
      } catch {
        // Fallback default if needed
      }
    };
    loadData();
  }, []);

  if (!title && !description) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Card hover={false} className="group relative">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-xl bg-white/30 border border-white/50 shadow-glass flex items-center justify-center overflow-hidden relative">
              <span className="text-6xl text-foreground/20 font-heading font-black tracking-widest">
                HCV
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-foreground/50 tracking-wide">Initializing publication module...</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card hover={true} className="group relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10 group-hover:bg-accent/20 transition-all duration-700" />
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 shadow-glass flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.03] group-hover:shadow-glow">
            <span className="text-6xl text-foreground/40 font-heading font-bold shadow-sm">
              {image || "HCV"}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left z-10">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">
              {title}
            </h3>
            <p className="text-foreground/70 mb-8 leading-relaxed font-light text-lg">
              {description}
            </p>
            <Button href={link} variant="primary" className="shadow-lg">
              View All Publications
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
