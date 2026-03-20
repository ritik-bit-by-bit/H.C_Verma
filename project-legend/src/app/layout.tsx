import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { ScrollRocket } from "@/components/shared/ScrollRocket";
import { IntroAnimation } from "@/components/shared/IntroAnimation";

const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "H.C. Verma | Making Physics Accessible",
    template: "%s | H.C. Verma",
  },
  description:
    "Official website of physicist and author H.C. Verma. Concepts of Physics, lectures, and educational resources for JEE and competitive exams.",
  keywords: ["H.C. Verma", "Concepts of Physics", "physics", "JEE", "IIT Kanpur", "physics education"],
  authors: [{ name: "H.C. Verma" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "H.C. Verma",
    title: "H.C. Verma | Making Physics Accessible",
    description:
      "Official website of physicist and author H.C. Verma. Concepts of Physics, lectures, and educational resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "H.C. Verma | Making Physics Accessible",
    description:
      "Official website of physicist and author H.C. Verma. Concepts of Physics, lectures, and educational resources.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontSans.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
          <IntroAnimation />
          <ParticleBackground />
          <ScrollRocket />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
