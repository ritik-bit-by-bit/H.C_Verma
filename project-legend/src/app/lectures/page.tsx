"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";
import { lectures as defaultLectures } from "@/data/lectures";

export default function LecturesPage() {
  const lecturesData = useContent("lectures", defaultLectures);
  const lectures = Array.isArray(lecturesData) ? lecturesData : defaultLectures;
  const upcomingLectures = lectures.filter((l: { past?: boolean }) => !l.past);
  const pastLectures = lectures.filter((l: { past?: boolean }) => l.past);

  return (
    <Section
      title="Lectures & Workshops"
      subtitle="Teaching sessions and physics workshops."
    >
      {upcomingLectures.length > 0 && (
        <div className="mb-12">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
            Upcoming
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingLectures.map((lecture: { id: string; title: string; venue: string; date: string; topic?: string; registrationLink?: string }) => (
              <Card key={lecture.id} as="article">
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  {lecture.title}
                </h4>
                <p className="text-foreground/70 mt-1">{lecture.venue}</p>
                <p className="text-sm text-foreground/60 mt-2">{lecture.date}</p>
                {lecture.topic && (
                  <p className="text-foreground/80 mt-2">{lecture.topic}</p>
                )}
                {lecture.registrationLink && (
                  <a
                    href={lecture.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block"
                  >
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
          Past Lectures
        </h3>
        {pastLectures.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {pastLectures.map((lecture: { id: string; title: string; venue: string; date: string; topic?: string }) => (
              <Card key={lecture.id} as="article" hover={false}>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  {lecture.title}
                </h4>
                <p className="text-foreground/70 mt-1">{lecture.venue}</p>
                <p className="text-sm text-foreground/60 mt-2">{lecture.date}</p>
                {lecture.topic && (
                  <p className="text-foreground/80 mt-2">{lecture.topic}</p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-foreground/60">No past lectures recorded yet.</p>
        )}
      </div>
    </Section>
  );
}
