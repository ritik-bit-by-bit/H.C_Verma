"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";
import { motion } from "framer-motion";

const defaultContact = {
  title: "Get in Touch",
  subtitle: "For inquiries regarding lectures, collaborations, or the books.",
  institutionName: "IIT Kanpur",
  institutionDetails:
    "Department of Physics\nIndian Institute of Technology Kanpur\nKanpur, Uttar Pradesh, India",
};

const inputClass = "w-full px-5 py-3 rounded-xl border border-white/60 bg-white/50 backdrop-blur-md text-foreground focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all shadow-sm";

export default function ContactPage() {
  const contactContent = useContent("contactContent", defaultContact);
  const content = contactContent && typeof contactContent === "object" ? contactContent : defaultContact;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section title={content.title} subtitle={content.subtitle}>
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card hover={false} className="p-8 md:p-10">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              Secure Form Interface
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold tracking-widest text-foreground/50 uppercase mb-2">Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    className={inputClass} placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold tracking-widest text-foreground/50 uppercase mb-2">Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className={inputClass} placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-bold tracking-widest text-foreground/50 uppercase mb-2">Subject</label>
                <input
                  id="subject" name="subject" type="text" required
                  value={formData.subject} onChange={handleChange}
                  className={inputClass} placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold tracking-widest text-foreground/50 uppercase mb-2">Message</label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  className={`${inputClass} resize-none`} placeholder="Transmitting data..."
                />
              </div>
              
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto px-10">
                  {status === "loading" ? "Transmitting..." : "Initialize Transfer"}
                </Button>
                
                {status === "success" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-medium text-sm">
                    Transmission successful.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-medium text-sm">
                    Connection failed. Retry.
                  </motion.p>
                )}
              </div>
            </form>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card hover={false} className="h-full flex flex-col">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 tracking-tight">
              Operations Center
            </h3>
            <div className="flex-1 bg-white/30 border border-white/50 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
              </div>
              <p className="text-accent text-sm font-black uppercase tracking-widest mb-3">
                {content.institutionName}
              </p>
              <p className="text-foreground/70 text-sm font-medium leading-loose whitespace-pre-line relative z-10">
                {content.institutionDetails}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/40">
              <p className="text-xs font-bold tracking-widest uppercase text-foreground/40 text-center">
                COMMUNICATIONS ENCRYPTED
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
