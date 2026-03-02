export interface Resource {
  id: string;
  title: string;
  description: string;
  link?: string;
  category: "download" | "link";
}

export const resources: Resource[] = [
  {
    id: "errata",
    title: "Concepts of Physics - Errata",
    description: "Corrections and updates for Concepts of Physics editions.",
    link: "#",
    category: "download",
  },
  {
    id: "iit-kanpur",
    title: "IIT Kanpur",
    description: "Department of Physics, IIT Kanpur official website.",
    link: "https://www.iitk.ac.in/physics",
    category: "link",
  },
  {
    id: "jee",
    title: "JEE Main",
    description: "Joint Entrance Examination - Main official website.",
    link: "https://jeemain.nta.ac.in",
    category: "link",
  },
];
