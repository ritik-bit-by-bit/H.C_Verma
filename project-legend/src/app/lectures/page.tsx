"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";
import { lectures as defaultLectures } from "@/data/lectures";
import { motion } from "framer-motion";

export default function LecturesPage() {
  const lecturesData = useContent("lectures", defaultLectures);
  const lectures = Array.isArray(lecturesData) ? lecturesData : defaultLectures;
  const upcomingLectures = lectures.filter((l: { past?: boolean }) => !l.past);
  const pastLectures = lectures.filter((l: { past?: boolean }) => l.past);

  const container: any = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim: any = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  return (
    <Section title="Academic Sessions" subtitle="Interactive physics lectures and specialized workshops.">
      
      {upcomingLectures.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-heading text-2xl font-bold text-foreground">Active Term</h3>
            <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">Live</span>
          </div>
          
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {upcomingLectures.map((lecture: any) => (
              <motion.div key={lecture.id} variants={itemAnim}>
                <Card as="article" className="h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                  <h4 className="font-heading text-xl font-bold text-foreground pr-8">{lecture.title}</h4>
                  <p className="text-accent font-semibold text-sm mt-2">{lecture.venue}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-foreground/50 mt-1">{lecture.date}</p>
                  {lecture.topic && <p className="text-foreground/70 mt-4 font-light leading-relaxed">{lecture.topic}</p>}
                  {lecture.registrationLink && (
                    <div className="mt-6 pt-6 border-t border-white/40">
                      <Button href={lecture.registrationLink} variant="outline" size="sm" className="w-full">
                        Initialize Registration
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-heading text-2xl font-bold text-foreground">Archived Sessions</h3>
        </div>
        
        {pastLectures.length > 0 ? (
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastLectures.map((lecture: any) => (
              <motion.div key={lecture.id} variants={itemAnim}>
                <Card as="article" hover={false} className="h-full bg-white/20 border-white/40">
                  <h4 className="font-heading text-lg font-bold text-foreground">{lecture.title}</h4>
                  <p className="text-accent/80 font-medium text-sm mt-2">{lecture.venue}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mt-1">{lecture.date}</p>
                  {lecture.topic && <p className="text-foreground/60 mt-3 text-sm">{lecture.topic}</p>}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase text-center py-12">No archives available.</p>
        )}
      </div>
    </Section>
  );
}
