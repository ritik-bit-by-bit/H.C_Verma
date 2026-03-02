"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";

const defaultContact = {
  title: "Get in Touch",
  subtitle: "For inquiries regarding lectures, collaborations, or the books.",
  institutionName: "IIT Kanpur",
  institutionDetails:
    "Department of Physics\nIndian Institute of Technology Kanpur\nKanpur, Uttar Pradesh, India",
};

export default function ContactPage() {
  const contactContent = useContent("contactContent", defaultContact);
  const content = contactContent && typeof contactContent === "object" ? contactContent : defaultContact;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section
      title={content.title}
      subtitle={content.subtitle}
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <Card hover={false}>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
            Contact Form
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground/80 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-background text-foreground focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/80 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-background text-foreground focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground/80 mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-background text-foreground focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
                placeholder="What is this regarding?"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground/80 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-background text-foreground focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none resize-none"
                placeholder="Your message..."
              />
            </div>
            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 text-sm">
                Message sent successfully. We&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                Something went wrong. Please try again or email directly.
              </p>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>

        <div>
          <Card hover={false}>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              Institution
            </h3>
            <p className="text-foreground/80 mb-2">
              <strong>{content.institutionName}</strong>
            </p>
            <p className="text-foreground/70 text-sm whitespace-pre-line">
              {content.institutionDetails}
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
