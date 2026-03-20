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

const defaultGallery: GalleryItem[] = [];

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export function GallerySection() {
  const gallery = useContent<GalleryItem[]>("gallery", defaultGallery);
  const items = Array.isArray(gallery) && gallery.length > 0 ? gallery : [];

  if (!items.length) return null;

  return (
    <Section
      id="gallery"
      title="Visual Analytics"
      subtitle="Curated structural diagrams and event documentation."
    >
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-8 md:grid-cols-3"
      >
        {items.map((item, index) => (
          <motion.div key={item.id || index} variants={itemVariants} className="h-full">
            <Card hover={true} className="overflow-hidden h-full flex flex-col p-2 group bg-white/30">
              <div className="relative w-full pt-[75%] rounded-xl overflow-hidden bg-accent/5 backdrop-blur-md">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-accent/50 text-sm font-semibold tracking-widest uppercase">
                    Data Missing
                  </div>
                )}
                {/* Tech overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col relative z-10 -mt-8">
                {item.category && (
                  <span className="inline-block px-3 py-1 mb-3 rounded-full bg-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase w-max backdrop-blur-md border border-accent/20">
                    {item.category}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 tracking-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm font-light text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
