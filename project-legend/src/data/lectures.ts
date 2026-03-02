export interface Lecture {
  id: string;
  title: string;
  date: string;
  venue: string;
  topic?: string;
  registrationLink?: string;
  past?: boolean;
}

export const lectures: Lecture[] = [
  {
    id: "upcoming-1",
    title: "Physics Workshop",
    date: "TBA",
    venue: "IIT Kanpur",
    topic: "Conceptual clarity in mechanics",
    past: false,
  },
  {
    id: "past-1",
    title: "IIT Kanpur Lecture Series",
    date: "2024",
    venue: "IIT Kanpur",
    topic: "Teaching physics with intuition",
    past: true,
  },
];
