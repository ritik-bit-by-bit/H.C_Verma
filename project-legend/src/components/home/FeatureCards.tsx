"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";

const defaultFeatures = [
  {
    title: "Concepts",
    description: "Browse physics topics from classical mechanics to modern physics.",
    href: "/concepts",
    icon: "◐",
  },
  {
    title: "Lectures",
    description: "Upcoming workshops and academic lecture sessions.",
    href: "/lectures",
    icon: "◈",
  },
  {
    title: "Blog",
    description: "Insights on analytical teaching, physics, and education.",
    href: "/blog",
    icon: "◇",
  },
];

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function FeatureCards() {
  const features = useContent("featureCards", defaultFeatures);
  const list = Array.isArray(features) ? features : defaultFeatures;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-3 gap-8"
    >
      {list.map((feature, i) => (
        <motion.div key={feature.href + i} variants={itemVariants} className="h-full">
          <Link href={feature.href || "#"} className="block h-full">
            <Card className="h-full flex flex-col group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-colors duration-500" />
              
              <div className="h-12 w-12 rounded-xl bg-white/60 border border-white shadow-sm flex items-center justify-center mb-6 overflow-hidden relative">
                <span className="text-2xl text-accent relative z-10 group-hover:scale-110 transition-transform">
                  {feature.icon || "◉"}
                </span>
              </div>
              
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-foreground/70 flex-1 font-light leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-6 flex items-center text-accent text-sm font-semibold tracking-wide uppercase transition-all">
                <span className="relative">
                  System Access
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
