import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concepts",
  description: "Browse physics concepts from mechanics to modern physics. Topics covered in Concepts of Physics.",
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
