export interface PhysicsConcept {
  id: string;
  title: string;
  category: string;
  description: string;
  bookPart?: 1 | 2;
  chapter?: number;
}

export const concepts: PhysicsConcept[] = [
  {
    id: "mechanics",
    title: "Mechanics",
    category: "Classical Physics",
    description:
      "Motion, forces, energy, momentum, rotational dynamics, and gravitation.",
    bookPart: 1,
    chapter: 3,
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    category: "Classical Physics",
    description:
      "Heat, temperature, laws of thermodynamics, kinetic theory of gases.",
    bookPart: 1,
    chapter: 12,
  },
  {
    id: "waves",
    title: "Waves",
    category: "Classical Physics",
    description: "Wave motion, sound, superposition, standing waves.",
    bookPart: 1,
    chapter: 15,
  },
  {
    id: "optics",
    title: "Optics",
    category: "Classical Physics",
    description: "Geometric optics, wave optics, interference, diffraction.",
    bookPart: 1,
    chapter: 18,
  },
  {
    id: "electricity",
    title: "Electricity",
    category: "Electromagnetism",
    description: "Electrostatics, current, circuits, capacitance.",
    bookPart: 2,
    chapter: 29,
  },
  {
    id: "magnetism",
    title: "Magnetism",
    category: "Electromagnetism",
    description: "Magnetic fields, electromagnetic induction, AC circuits.",
    bookPart: 2,
    chapter: 34,
  },
  {
    id: "modern-physics",
    title: "Modern Physics",
    category: "Quantum & Relativity",
    description: "Photoelectric effect, atoms, nuclei, special relativity.",
    bookPart: 2,
    chapter: 42,
  },
];

export const categories = Array.from(new Set(concepts.map((c) => c.category)));
