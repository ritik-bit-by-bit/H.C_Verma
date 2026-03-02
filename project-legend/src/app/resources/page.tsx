"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { useContent } from "@/lib/useContent";
import { resources as defaultResources } from "@/data/resources";

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  link?: string;
  category: string;
};

const downloads = (list: ResourceItem[]) =>
  list.filter((r) => r.category === "download");
const links = (list: ResourceItem[]) =>
  list.filter((r) => r.category === "link");

export default function ResourcesPage() {
  const resourcesData = useContent("resources", defaultResources);
  const resources = Array.isArray(resourcesData)
    ? (resourcesData as ResourceItem[])
    : (defaultResources as ResourceItem[]);
  const downloadsList = downloads(resources);
  const linksList = links(resources);

  return (
    <Section
      title="Resources"
      subtitle="Downloads and useful links for physics students."
    >
      {downloadsList.length > 0 && (
        <div className="mb-12">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
            Downloads
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {downloadsList.map((resource: { id: string; title: string; description: string; link?: string }) => (
              <Card key={resource.id} as="article">
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  {resource.title}
                </h4>
                <p className="text-foreground/70 mt-2">{resource.description}</p>
                {resource.link && (
                  <a
                    href={resource.link}
                    className="inline-flex items-center mt-4 text-amber-500 hover:text-amber-400 font-medium text-sm"
                  >
                    Download PDF →
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
          Useful Links
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {linksList.map((resource: { id: string; title: string; description: string; link?: string }) => (
            <Card key={resource.id} as="article">
              <h4 className="font-heading text-lg font-semibold text-foreground">
                {resource.title}
              </h4>
              <p className="text-foreground/70 mt-2">{resource.description}</p>
              {resource.link && (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-amber-500 hover:text-amber-400 font-medium text-sm"
                >
                  Visit site →
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
