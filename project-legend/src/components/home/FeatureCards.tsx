"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";

const defaultFeatures = [
  {
    title: "Concepts",
    description: "Browse physics topics from mechanics to modern physics.",
    href: "/concepts",
    icon: "◉",
  },
  {
    title: "Lectures",
    description: "Upcoming workshops and IIT lecture sessions.",
    href: "/lectures",
    icon: "◈",
  },
  {
    title: "Blog",
    description: "Insights on teaching, physics, and education.",
    href: "/blog",
    icon: "◇",
  },
];

export function FeatureCards() {
  const features = useContent("featureCards", defaultFeatures);
  const list = Array.isArray(features) ? features : defaultFeatures;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {list.map((feature, i) => (
        <motion.div
          key={feature.href + i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={feature.href || "#"}>
            <Card className="h-full flex flex-col group">
              <span className="text-2xl text-amber-500 mb-4">{feature.icon || "◉"}</span>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/70 flex-1">{feature.description}</p>
              <span className="inline-flex items-center mt-4 text-amber-500 text-sm font-medium group-hover:underline">
                Learn more →
              </span>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
