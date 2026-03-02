"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedBook } from "@/components/home/FeaturedBook";
import { FeatureCards } from "@/components/home/FeatureCards";
import { GallerySection } from "@/components/home/Gallery";
import { Section } from "@/components/ui/Section";
import { useContent } from "@/lib/useContent";

const defaultHomeSections = {
  featuredPublicationTitle: "Featured Publication",
  featuredPublicationSubtitle:
    "The books that have shaped physics education for millions of students.",
  exploreTitle: "Explore",
  exploreSubtitle:
    "Dive deeper into physics concepts, lectures, and insights.",
};

export default function HomePage() {
  const homeSections = useContent("homeSections", defaultHomeSections);
  const sections =
    homeSections && typeof homeSections === "object"
      ? homeSections
      : defaultHomeSections;

  return (
    <>
      <Hero />
      <Section
        title={sections.featuredPublicationTitle}
        subtitle={sections.featuredPublicationSubtitle}
      >
        <FeaturedBook />
      </Section>
      <Section
        title={sections.exploreTitle}
        subtitle={sections.exploreSubtitle}
      >
        <FeatureCards />
      </Section>
      <GallerySection />
    </>
  );
}

