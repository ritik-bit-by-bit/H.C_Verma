export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverPlaceholder?: string;
  purchaseLink?: string;
}

export const books: Book[] = [
  {
    id: "concepts-1",
    title: "Concepts of Physics",
    subtitle: "Part 1",
    description:
      "Covers introduction to physics, mechanics, thermodynamics, waves, and optics. Ideal for building strong foundational concepts.",
    coverPlaceholder: "CP1",
    purchaseLink: "https://www.amazon.in/dp/8177091875",
  },
  {
    id: "concepts-2",
    title: "Concepts of Physics",
    subtitle: "Part 2",
    description:
      "Covers electricity, magnetism, electromagnetic waves, optics (continued), and modern physics including quantum mechanics.",
    coverPlaceholder: "CP2",
    purchaseLink: "https://www.amazon.in/dp/8177092324",
  },
];
