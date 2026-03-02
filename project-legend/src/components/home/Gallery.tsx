"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { useContent } from "@/lib/useContent";

type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
};

const defaultGallery: GalleryItem[] = [
  {
    id: "concepts-physics-1",
    title: "Concepts of Physics – Part 1",
    description: "Cover artwork for the first volume.",
    imageUrl: "/Images/gallery/concepts-physics-1.jpg",
    category: "Books",
  },
  {
    id: "concepts-physics-2",
    title: "Concepts of Physics – Part 2",
    description: "Cover artwork for the second volume.",
    imageUrl: "/Images/gallery/concepts-physics-2.jpg",
    category: "Books",
  },
  {
    id: "lecture-hall",
    title: "Lecture Session",
    description: "Interactive physics lecture with students.",
    imageUrl: "/Images/gallery/lecture-hall.jpg",
    category: "Lectures",
  },
];

export function GallerySection() {
  const gallery = useContent<GalleryItem[]>("gallery", defaultGallery);
  const items = Array.isArray(gallery) ? gallery : defaultGallery;

  if (!items.length) return null;

  return (
    <Section
      id="gallery"
      title="Gallery"
      subtitle="Curated images from books, lectures, and events."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative w-full pt-[66%] bg-slate-100 dark:bg-slate-800">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                {item.category && (
                  <p className="text-xs uppercase tracking-wide text-amber-500 mb-1">
                    {item.category}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm text-foreground/70 flex-1">
                    {item.description}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

