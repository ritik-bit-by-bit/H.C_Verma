"use client";

import { useState, useEffect } from "react";
import { getSiteApiUrl, getSiteUrl } from "@/lib/site-api";

const CONTENT_KEYS = [
  "hero",
  "featureCards",
  "homeSections",
  "navLinks",
  "footer",
  "about",
  "books",
  "concepts",
  "resources",
  "lectures",
  "contactContent",
  "gallery",
];

const DEFAULT_HERO = {
  siteName: "H.C. Verma",
  headline: "Making Physics Accessible",
  subheadline:
    "Renowned physicist and author of Concepts of Physics. Empowering students to understand the beauty and logic of the physical world.",
  heroImageUrl: "/Images/hc.jpg",
  primaryCtaText: "Explore Books",
  primaryCtaHref: "/books",
  secondaryCtaText: "Physics Concepts",
  secondaryCtaHref: "/concepts",
};

const DEFAULT_FEATURE_CARDS = [
  { title: "Concepts", description: "Browse physics topics from mechanics to modern physics.", href: "/concepts", icon: "◉" },
  { title: "Lectures", description: "Upcoming workshops and IIT lecture sessions.", href: "/lectures", icon: "◈" },
  { title: "Blog", description: "Insights on teaching, physics, and education.", href: "/blog", icon: "◇" },
];

const DEFAULT_HOME_SECTIONS = {
  featuredPublicationTitle: "Featured Publication",
  featuredPublicationSubtitle: "The books that have shaped physics education for millions of students.",
  exploreTitle: "Explore",
  exploreSubtitle: "Dive deeper into physics concepts, lectures, and insights.",
};

const DEFAULT_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/concepts", label: "Concepts" },
  { href: "/lectures", label: "Lectures" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const DEFAULT_FOOTER = {
  siteName: "H.C. Verma",
  tagline: "Making Physics Accessible",
  links: [
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/contact", label: "Contact" },
    { href: "/resources", label: "Resources" },
  ],
  copyrightName: "H.C. Verma",
};

const DEFAULT_ABOUT = {
  name: "H.C. Verma",
  imagePlaceholder: "HCV",
  bioParagraphs: [
    "Dr. Harish Chandra Verma is a distinguished Indian physicist and educator. He served as a professor in the Department of Physics at IIT Kanpur, where he dedicated decades to teaching and inspiring countless students.",
    "His most notable contribution is the two-volume textbook Concepts of Physics, which has become the cornerstone of physics education for JEE and other competitive examinations in India. The books are celebrated for their clarity, conceptual depth, and carefully crafted problem sets.",
  ],
  achievements: [
    { title: "IIT Kanpur", description: "Long-standing faculty member in the Department of Physics, mentoring generations of engineers and scientists." },
    { title: "Concepts of Physics", description: "Author of the definitive two-volume textbook used by millions of students preparing for JEE and similar examinations." },
    { title: "Teaching Philosophy", description: "Believing that physics should be understood, not memorized—focusing on intuition and conceptual clarity." },
  ],
  quoteText: "Physics is not about memorizing formulas—it's about understanding the way the universe works.",
  quoteAuthor: "H.C. Verma",
};

const DEFAULT_BOOKS = [
  { id: "concepts-1", title: "Concepts of Physics", subtitle: "Part 1", description: "Covers introduction to physics, mechanics, thermodynamics, waves, and optics. Ideal for building strong foundational concepts.", coverPlaceholder: "CP1", purchaseLink: "https://www.amazon.in/dp/8177091875" },
  { id: "concepts-2", title: "Concepts of Physics", subtitle: "Part 2", description: "Covers electricity, magnetism, electromagnetic waves, optics (continued), and modern physics including quantum mechanics.", coverPlaceholder: "CP2", purchaseLink: "https://www.amazon.in/dp/8177092324" },
];

const DEFAULT_CONCEPTS = [
  { id: "mechanics", title: "Mechanics", category: "Classical Physics", description: "Motion, forces, energy, momentum, rotational dynamics, and gravitation.", bookPart: 1, chapter: 3 },
  { id: "thermodynamics", title: "Thermodynamics", category: "Classical Physics", description: "Heat, temperature, laws of thermodynamics, kinetic theory of gases.", bookPart: 1, chapter: 12 },
];

const DEFAULT_RESOURCES = [
  { id: "errata", title: "Concepts of Physics - Errata", description: "Corrections and updates for Concepts of Physics editions.", link: "#", category: "download" },
  { id: "iit-kanpur", title: "IIT Kanpur", description: "Department of Physics, IIT Kanpur official website.", link: "https://www.iitk.ac.in/physics", category: "link" },
];

const DEFAULT_LECTURES = [
  { id: "upcoming-1", title: "Physics Workshop", date: "TBA", venue: "IIT Kanpur", topic: "Conceptual clarity in mechanics", past: false },
  { id: "past-1", title: "IIT Kanpur Lecture Series", date: "2024", venue: "IIT Kanpur", topic: "Teaching physics with intuition", past: true },
];

const DEFAULT_CONTACT = {
  title: "Get in Touch",
  subtitle: "For inquiries regarding lectures, collaborations, or the books.",
  institutionName: "IIT Kanpur",
  institutionDetails: "Department of Physics\nIndian Institute of Technology Kanpur\nKanpur, Uttar Pradesh, India",
};

const DEFAULT_GALLERY = [
  {
    id: "concepts-physics-1",
    title: "Concepts of Physics – Part 1",
    description: "Cover artwork for the first volume.",
    imageUrl: "/Images/gallery/concepts-physics-1.jpg",
    category: "Books",
  },
  {
    id: "concepts-physics-2",
    title: "Concepts of Physics – Part 2",
    description: "Cover artwork for the second volume.",
    imageUrl: "/Images/gallery/concepts-physics-2.jpg",
    category: "Books",
  },
  {
    id: "lecture-hall",
    title: "Lecture Session",
    description: "Interactive physics lecture with students.",
    imageUrl: "/Images/gallery/lecture-hall.jpg",
    category: "Lectures",
  },
];

const DEFAULTS = {
  hero: DEFAULT_HERO,
  featureCards: DEFAULT_FEATURE_CARDS,
  homeSections: DEFAULT_HOME_SECTIONS,
  navLinks: DEFAULT_NAV_LINKS,
  footer: DEFAULT_FOOTER,
  about: DEFAULT_ABOUT,
  books: DEFAULT_BOOKS,
  concepts: DEFAULT_CONCEPTS,
  resources: DEFAULT_RESOURCES,
  lectures: DEFAULT_LECTURES,
  contactContent: DEFAULT_CONTACT,
  gallery: DEFAULT_GALLERY,
};

function AdminSection({ title, children, id }) {
  return (
    <section
      id={id}
      className="mb-8 rounded-2xl border border-white/60 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition hover:border-amber-200/80 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
      <div className="text-slate-900">{children}</div>
    </section>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState(() => ({ ...DEFAULTS }));
  const [featuredPubs, setFeaturedPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [loadError, setLoadError] = useState(null);
  const apiBase = getSiteApiUrl();

  useEffect(() => {
    async function load() {
      const results = { ...DEFAULTS };
      try {
        for (const key of CONTENT_KEYS) {
          try {
            const res = await fetch(`${apiBase}/api/content/${key}`);
            if (res.ok) {
              const data = await res.json();
              if (data !== null && data !== undefined) results[key] = data;
            }
          } catch {
            // keep default
          }
        }
        setContent(results);
        try {
          const fpRes = await fetch(`${apiBase}/api/getFeaturedPublication`);
          if (fpRes.ok) {
            const fp = await fpRes.json();
            setFeaturedPubs(Array.isArray(fp) ? fp : []);
          }
        } catch {
          // leave []
        }
        setLoadError(null);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Failed to load");
        setContent({ ...DEFAULTS });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [apiBase]);

  const saveContent = async (key, value) => {
    setSaving(key);
    try {
      const res = await fetch(`${apiBase}/api/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) setContent((prev) => ({ ...prev, [key]: value }));
      else {
        const err = await res.json().catch(() => ({}));
        alert((err && err.error) || "Failed to save");
      }
    } finally {
      setSaving(null);
    }
  };

  const saveFeaturedPub = async (body) => {
    setSaving("featuredPublication");
    try {
      const res = await fetch(`${apiBase}/api/setFeaturedPublication`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const created = await res.json();
        setFeaturedPubs((prev) => [...prev, created]);
      } else alert("Failed to add");
    } finally {
      setSaving(null);
    }
  };

  const updateFeaturedPub = async (id, body) => {
    setSaving("featuredPublication");
    try {
      const res = await fetch(`${apiBase}/api/featured-publication/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated = await res.json();
        setFeaturedPubs((prev) => prev.map((p) => (p._id === id ? updated : p)));
      }
    } finally {
      setSaving(null);
    }
  };

  const deleteFeaturedPub = async (id) => {
    if (!confirm("Delete this featured publication?")) return;
    try {
      const res = await fetch(`${apiBase}/api/featured-publication/${id}`, { method: "DELETE" });
      if (res.ok) setFeaturedPubs((prev) => prev.filter((p) => p._id !== id));
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl bg-white/50 min-h-[60vh] backdrop-blur-sm">
        <p className="text-slate-600">Loading admin...</p>
      </div>
    );
  }

  const hero = content.hero || DEFAULTS.hero;
  const featureCards = content.featureCards || DEFAULTS.featureCards;
  const homeSections = content.homeSections || DEFAULT_HOME_SECTIONS;
  const navLinks = content.navLinks || DEFAULT_NAV_LINKS;
  const footer = content.footer || DEFAULT_FOOTER;
  const about = content.about || DEFAULT_ABOUT;
  const books = content.books || DEFAULT_BOOKS;
  const concepts = content.concepts || DEFAULT_CONCEPTS;
  const resources = content.resources || DEFAULT_RESOURCES;
  const lectures = content.lectures || DEFAULT_LECTURES;
  const contactContent = content.contactContent || DEFAULT_CONTACT;
  const gallery = content.gallery || DEFAULT_GALLERY;

  const updateFeatureCardField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.featureCards) ? prev.featureCards : DEFAULT_FEATURE_CARDS;
      const next = existing.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      );
      return { ...prev, featureCards: next };
    });
  };

  const addFeatureCard = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.featureCards) ? prev.featureCards : DEFAULT_FEATURE_CARDS;
      const next = [
        ...existing,
        { title: "", description: "", href: "", icon: "" },
      ];
      return { ...prev, featureCards: next };
    });
  };

  const removeFeatureCard = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.featureCards) ? prev.featureCards : DEFAULT_FEATURE_CARDS;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, featureCards: next };
    });
  };

  const updateNavLinkField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.navLinks) ? prev.navLinks : DEFAULT_NAV_LINKS;
      const next = existing.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      );
      return { ...prev, navLinks: next };
    });
  };

  const addNavLink = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.navLinks) ? prev.navLinks : DEFAULT_NAV_LINKS;
      const next = [
        ...existing,
        { href: "", label: "" },
      ];
      return { ...prev, navLinks: next };
    });
  };

  const removeNavLink = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.navLinks) ? prev.navLinks : DEFAULT_NAV_LINKS;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, navLinks: next };
    });
  };

  const updateFooterLinkField = (index, field, value) => {
    setContent((prev) => {
      const existingFooter = prev.footer || DEFAULT_FOOTER;
      const existingLinks = Array.isArray(existingFooter.links) ? existingFooter.links : DEFAULT_FOOTER.links;
      const nextLinks = existingLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      );
      return { ...prev, footer: { ...existingFooter, links: nextLinks } };
    });
  };

  const addFooterLink = () => {
    setContent((prev) => {
      const existingFooter = prev.footer || DEFAULT_FOOTER;
      const existingLinks = Array.isArray(existingFooter.links) ? existingFooter.links : DEFAULT_FOOTER.links;
      const nextLinks = [...existingLinks, { href: "", label: "" }];
      return { ...prev, footer: { ...existingFooter, links: nextLinks } };
    });
  };

  const removeFooterLink = (index) => {
    setContent((prev) => {
      const existingFooter = prev.footer || DEFAULT_FOOTER;
      const existingLinks = Array.isArray(existingFooter.links) ? existingFooter.links : DEFAULT_FOOTER.links;
      const nextLinks = existingLinks.filter((_, i) => i !== index);
      return { ...prev, footer: { ...existingFooter, links: nextLinks } };
    });
  };

  const updateAboutField = (field, value) => {
    setContent((prev) => {
      const existing = prev.about || DEFAULT_ABOUT;
      return { ...prev, about: { ...existing, [field]: value } };
    });
  };

  const updateAboutBio = (value) => {
    const paragraphs = value.split("\n").map((p) => p.trim()).filter(Boolean);
    setContent((prev) => {
      const existing = prev.about || DEFAULT_ABOUT;
      return { ...prev, about: { ...existing, bioParagraphs: paragraphs } };
    });
  };

  const updateAboutAchievementField = (index, field, value) => {
    setContent((prev) => {
      const existing = prev.about || DEFAULT_ABOUT;
      const achievements = Array.isArray(existing.achievements)
        ? existing.achievements
        : DEFAULT_ABOUT.achievements;
      const next = achievements.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      );
      return { ...prev, about: { ...existing, achievements: next } };
    });
  };

  const addAboutAchievement = () => {
    setContent((prev) => {
      const existing = prev.about || DEFAULT_ABOUT;
      const achievements = Array.isArray(existing.achievements)
        ? existing.achievements
        : DEFAULT_ABOUT.achievements;
      const next = [...achievements, { title: "", description: "" }];
      return { ...prev, about: { ...existing, achievements: next } };
    });
  };

  const removeAboutAchievement = (index) => {
    setContent((prev) => {
      const existing = prev.about || DEFAULT_ABOUT;
      const achievements = Array.isArray(existing.achievements)
        ? existing.achievements
        : DEFAULT_ABOUT.achievements;
      const next = achievements.filter((_, i) => i !== index);
      return { ...prev, about: { ...existing, achievements: next } };
    });
  };

  const updateConceptField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.concepts) ? prev.concepts : DEFAULT_CONCEPTS;
      const next = existing.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      );
      return { ...prev, concepts: next };
    });
  };

  const addConcept = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.concepts) ? prev.concepts : DEFAULT_CONCEPTS;
      const next = [
        ...existing,
        { id: `concept-${existing.length + 1}`, title: "", category: "", description: "", bookPart: "", chapter: "" },
      ];
      return { ...prev, concepts: next };
    });
  };

  const removeConcept = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.concepts) ? prev.concepts : DEFAULT_CONCEPTS;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, concepts: next };
    });
  };

  const updateResourceField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.resources) ? prev.resources : DEFAULT_RESOURCES;
      const next = existing.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      );
      return { ...prev, resources: next };
    });
  };

  const addResource = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.resources) ? prev.resources : DEFAULT_RESOURCES;
      const next = [
        ...existing,
        { id: `resource-${existing.length + 1}`, title: "", description: "", link: "", category: "link" },
      ];
      return { ...prev, resources: next };
    });
  };

  const removeResource = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.resources) ? prev.resources : DEFAULT_RESOURCES;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, resources: next };
    });
  };

  const updateLectureField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.lectures) ? prev.lectures : DEFAULT_LECTURES;
      const next = existing.map((l, i) =>
        i === index ? { ...l, [field]: value } : l
      );
      return { ...prev, lectures: next };
    });
  };

  const addLecture = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.lectures) ? prev.lectures : DEFAULT_LECTURES;
      const next = [
        ...existing,
        { id: `lecture-${existing.length + 1}`, title: "", date: "", venue: "", topic: "", registrationLink: "", past: false },
      ];
      return { ...prev, lectures: next };
    });
  };

  const removeLecture = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.lectures) ? prev.lectures : DEFAULT_LECTURES;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, lectures: next };
    });
  };

  const updateGalleryField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.gallery) ? prev.gallery : DEFAULT_GALLERY;
      const next = existing.map((g, i) =>
        i === index ? { ...g, [field]: value } : g
      );
      return { ...prev, gallery: next };
    });
  };

  const addGalleryItem = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.gallery) ? prev.gallery : DEFAULT_GALLERY;
      const next = [
        ...existing,
        { id: `gallery-${existing.length + 1}`, title: "", description: "", imageUrl: "", category: "" },
      ];
      return { ...prev, gallery: next };
    });
  };

  const removeGalleryItem = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.gallery) ? prev.gallery : DEFAULT_GALLERY;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, gallery: next };
    });
  };

  const updateBookField = (index, field, value) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.books) ? prev.books : DEFAULT_BOOKS;
      const next = existing.map((b, i) =>
        i === index ? { ...b, [field]: value } : b
      );
      return { ...prev, books: next };
    });
  };

  const addEmptyBook = () => {
    setContent((prev) => {
      const existing = Array.isArray(prev.books) ? prev.books : DEFAULT_BOOKS;
      const next = [
        ...existing,
        {
          id: `book-${existing.length + 1}`,
          title: "",
          subtitle: "",
          description: "",
          coverPlaceholder: "",
          purchaseLink: "",
        },
      ];
      return { ...prev, books: next };
    });
  };

  const removeBook = (index) => {
    setContent((prev) => {
      const existing = Array.isArray(prev.books) ? prev.books : DEFAULT_BOOKS;
      const next = existing.filter((_, i) => i !== index);
      return { ...prev, books: next };
    });
  };

  const inputClass =
    "w-full px-3 py-2 rounded-xl border border-slate-100 bg-white/90 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/60";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-amber-50/40 text-slate-900">
      <div className="mx-auto flex h-screen max-h-screen max-w-6xl flex-col gap-4 px-4 py-6">
        <header className="rounded-3xl border border-white/60 bg-white/70 px-6 py-5 shadow-sm backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                Project Legend
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                Site Content Console
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage every section of the public website from a single, streamlined dashboard.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 text-xs">
              <a
                href={getSiteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[11px] font-medium text-slate-800 hover:border-amber-300 hover:bg-amber-50/80 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
                View live site
              </a>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-[11px] font-medium text-slate-500 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Linked to MongoDB content store
              </span>
            </div>
          </div>
        </header>

        {loadError && (
          <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            <span className="font-semibold">Heads up:</span> {loadError}. Using defaults.
            Ensure the main Project Legend site is running and MongoDB is configured for persistence.
          </div>
        )}

        <div className="mt-4 flex flex-1 gap-6 overflow-hidden">
          <aside className="hidden h-full w-60 flex-shrink-0 rounded-2xl border border-white/60 bg-white/60 p-3 shadow-sm backdrop-blur-xl md:block">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Sections
            </p>
            <nav className="flex h-full flex-col gap-1.5 overflow-y-auto pr-1">
              {[
              { id: "hero", label: "Hero" },
              { id: "feature-cards", label: "Feature Cards" },
              { id: "home-sections", label: "Home Sections" },
              { id: "nav", label: "Navigation" },
              { id: "footer", label: "Footer" },
              { id: "about", label: "About" },
              { id: "books", label: "Books" },
              { id: "concepts", label: "Concepts" },
              { id: "resources", label: "Resources" },
              { id: "lectures", label: "Lectures" },
              { id: "contact", label: "Contact" },
              { id: "gallery", label: "Gallery" },
              { id: "featured-publication", label: "Featured Publication" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-medium transition ${
                  activeSection === id
                    ? "bg-amber-100 text-amber-800 shadow-[0_0_0_1px_rgba(251,191,36,0.6)]"
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                }`}
              >
                <span>{label}</span>
                {activeSection === id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 space-y-5 overflow-y-auto pr-1 pb-4">
          {activeSection === "hero" && (
          <AdminSection title="Hero" id="hero">
            <div className="space-y-4">
              <div><label className={labelClass}>Site name (header)</label><input className={inputClass} value={hero.siteName} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, siteName: e.target.value } }))} /></div>
              <div><label className={labelClass}>Headline</label><input className={inputClass} value={hero.headline} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, headline: e.target.value } }))} /></div>
              <div><label className={labelClass}>Subheadline</label><textarea className={inputClass} rows={3} value={hero.subheadline} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, subheadline: e.target.value } }))} /></div>
              <div><label className={labelClass}>Hero image URL</label><input className={inputClass} value={hero.heroImageUrl} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, heroImageUrl: e.target.value } }))} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Primary button text</label><input className={inputClass} value={hero.primaryCtaText} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, primaryCtaText: e.target.value } }))} /></div>
                <div><label className={labelClass}>Primary button link</label><input className={inputClass} value={hero.primaryCtaHref} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, primaryCtaHref: e.target.value } }))} /></div>
                <div><label className={labelClass}>Secondary button text</label><input className={inputClass} value={hero.secondaryCtaText} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, secondaryCtaText: e.target.value } }))} /></div>
                <div><label className={labelClass}>Secondary button link</label><input className={inputClass} value={hero.secondaryCtaHref} onChange={(e) => setContent((c) => ({ ...c, hero: { ...hero, secondaryCtaHref: e.target.value } }))} /></div>
              </div>
              <button onClick={() => saveContent("hero", hero)} disabled={saving === "hero"} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"> {saving === "hero" ? "Saving..." : "Save Hero"} </button>
            </div>
          </AdminSection>
          )}

          {activeSection === "feature-cards" && (
          <AdminSection title="Feature Cards (Explore section)" id="feature-cards">
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Manage the cards shown in the home “Explore” section.
              </p>
              <div className="space-y-3">
                {(Array.isArray(featureCards) ? featureCards : []).map((card, index) => (
                  <div
                    key={card.title || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Card {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFeatureCard(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={card.title || ""}
                          onChange={(e) =>
                            updateFeatureCardField(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Icon (optional)</label>
                        <input
                          className={inputClass}
                          value={card.icon || ""}
                          onChange={(e) =>
                            updateFeatureCardField(index, "icon", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={card.description || ""}
                        onChange={(e) =>
                          updateFeatureCardField(index, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Link (href)</label>
                      <input
                        className={inputClass}
                        value={card.href || ""}
                        onChange={(e) =>
                          updateFeatureCardField(index, "href", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addFeatureCard}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Card
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("featureCards", featureCards)}
                  disabled={saving === "featureCards"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "featureCards" ? "Saving..." : "Save Feature Cards"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "home-sections" && (
          <AdminSection title="Home page section titles" id="home-sections">
            <div className="space-y-4">
              <div><label className={labelClass}>Featured Publication title</label><input className={inputClass} value={homeSections.featuredPublicationTitle} onChange={(e) => setContent((c) => ({ ...c, homeSections: { ...homeSections, featuredPublicationTitle: e.target.value } }))} /></div>
              <div><label className={labelClass}>Featured Publication subtitle</label><input className={inputClass} value={homeSections.featuredPublicationSubtitle} onChange={(e) => setContent((c) => ({ ...c, homeSections: { ...homeSections, featuredPublicationSubtitle: e.target.value } }))} /></div>
              <div><label className={labelClass}>Explore section title</label><input className={inputClass} value={homeSections.exploreTitle} onChange={(e) => setContent((c) => ({ ...c, homeSections: { ...homeSections, exploreTitle: e.target.value } }))} /></div>
              <div><label className={labelClass}>Explore section subtitle</label><input className={inputClass} value={homeSections.exploreSubtitle} onChange={(e) => setContent((c) => ({ ...c, homeSections: { ...homeSections, exploreSubtitle: e.target.value } }))} /></div>
              <button onClick={() => saveContent("homeSections", homeSections)} disabled={saving === "homeSections"} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"> {saving === "homeSections" ? "Saving..." : "Save Section Titles"} </button>
            </div>
          </AdminSection>
          )}

          {activeSection === "nav" && (
          <AdminSection title="Nav links" id="nav">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-1">
                Edit the navigation items shown in the header.
              </p>
              <div className="space-y-3">
                {(Array.isArray(navLinks) ? navLinks : []).map((link, index) => (
                  <div
                    key={`${link.href || "nav"}-${index}`}
                    className="flex flex-col gap-2 rounded-xl border border-white/50 bg-white/50 p-3 text-sm shadow-sm backdrop-blur-md md:flex-row md:items-center"
                  >
                    <div className="flex-1">
                      <label className={labelClass}>Label</label>
                      <input
                        className={inputClass}
                        value={link.label || ""}
                        onChange={(e) =>
                          updateNavLinkField(index, "label", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Href</label>
                      <input
                        className={inputClass}
                        value={link.href || ""}
                        onChange={(e) =>
                          updateNavLinkField(index, "href", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeNavLink(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addNavLink}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Nav Item
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("navLinks", navLinks)}
                  disabled={saving === "navLinks"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "navLinks" ? "Saving..." : "Save Nav Links"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "footer" && (
          <AdminSection title="Footer" id="footer">
            <div className="space-y-4">
              <div><label className={labelClass}>Site name</label><input className={inputClass} value={footer.siteName} onChange={(e) => setContent((c) => ({ ...c, footer: { ...footer, siteName: e.target.value } }))} /></div>
              <div><label className={labelClass}>Tagline</label><input className={inputClass} value={footer.tagline} onChange={(e) => setContent((c) => ({ ...c, footer: { ...footer, tagline: e.target.value } }))} /></div>
              <div><label className={labelClass}>Copyright name</label><input className={inputClass} value={footer.copyrightName} onChange={(e) => setContent((c) => ({ ...c, footer: { ...footer, copyrightName: e.target.value } }))} /></div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Footer links
                </p>
                <div className="space-y-2">
                  {(Array.isArray(footer.links) ? footer.links : []).map((link, index) => (
                    <div
                      key={`${link.href || "footer"}-${index}`}
                      className="flex flex-col gap-2 rounded-xl border border-white/50 bg-white/50 p-3 text-sm shadow-sm backdrop-blur-md md:flex-row md:items-center"
                    >
                      <div className="flex-1">
                        <label className={labelClass}>Label</label>
                        <input
                          className={inputClass}
                          value={link.label || ""}
                          onChange={(e) =>
                            updateFooterLinkField(index, "label", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <label className={labelClass}>Href</label>
                        <input
                          className={inputClass}
                          value={link.href || ""}
                          onChange={(e) =>
                            updateFooterLinkField(index, "href", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeFooterLink(index)}
                          className="text-xs font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFooterLink}
                  className="mt-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white/80 text-xs font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Footer Link
                </button>
              </div>

              <button onClick={() => saveContent("footer", footer)} disabled={saving === "footer"} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"> {saving === "footer" ? "Saving..." : "Save Footer"} </button>
            </div>
          </AdminSection>
          )}

          {activeSection === "about" && (
          <AdminSection title="About page" id="about">
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Edit the biography and achievements for the About page.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Name</label>
                  <input
                    className={inputClass}
                    value={about.name || ""}
                    onChange={(e) => updateAboutField("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Image placeholder</label>
                  <input
                    className={inputClass}
                    value={about.imagePlaceholder || ""}
                    onChange={(e) => updateAboutField("imagePlaceholder", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Biography paragraphs (one per line)</label>
                <textarea
                  className={inputClass}
                  rows={5}
                  value={(Array.isArray(about.bioParagraphs) ? about.bioParagraphs : []).join("\n")}
                  onChange={(e) => updateAboutBio(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p className={labelClass}>Achievements</p>
                <div className="space-y-2">
                  {(Array.isArray(about.achievements) ? about.achievements : []).map(
                    (ach, index) => (
                      <div
                        key={`${ach.title || "ach"}-${index}`}
                        className="rounded-xl border border-white/50 bg-white/50 p-3 shadow-sm backdrop-blur-md"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Achievement {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeAboutAchievement(index)}
                            className="text-xs font-medium text-red-600 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className={labelClass}>Title</label>
                            <input
                              className={inputClass}
                              value={ach.title || ""}
                              onChange={(e) =>
                                updateAboutAchievementField(index, "title", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                              className={inputClass}
                              rows={2}
                              value={ach.description || ""}
                              onChange={(e) =>
                                updateAboutAchievementField(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={addAboutAchievement}
                  className="mt-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white/80 text-xs font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Achievement
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Quote text</label>
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={about.quoteText || ""}
                    onChange={(e) => updateAboutField("quoteText", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Quote author</label>
                  <input
                    className={inputClass}
                    value={about.quoteAuthor || ""}
                    onChange={(e) => updateAboutField("quoteAuthor", e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => saveContent("about", about)}
                disabled={saving === "about"}
                className="mt-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"
              >
                {saving === "about" ? "Saving..." : "Save About"}
              </button>
            </div>
          </AdminSection>
          )}

          {activeSection === "books" && (
          <AdminSection title="Books" id="books">
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Manage each book with form fields. Click "Add Book" to create a new entry.
              </p>
              <div className="space-y-3">
                {(Array.isArray(books) ? books : []).map((book, index) => (
                  <div
                    key={book.id || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Book {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBook(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>ID</label>
                        <input
                          className={inputClass}
                          value={book.id || ""}
                          onChange={(e) => updateBookField(index, "id", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={book.title || ""}
                          onChange={(e) => updateBookField(index, "title", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Subtitle</label>
                        <input
                          className={inputClass}
                          value={book.subtitle || ""}
                          onChange={(e) => updateBookField(index, "subtitle", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Cover placeholder</label>
                        <input
                          className={inputClass}
                          value={book.coverPlaceholder || ""}
                          onChange={(e) =>
                            updateBookField(index, "coverPlaceholder", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={3}
                        value={book.description || ""}
                        onChange={(e) =>
                          updateBookField(index, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Purchase link</label>
                      <input
                        className={inputClass}
                        value={book.purchaseLink || ""}
                        onChange={(e) =>
                          updateBookField(index, "purchaseLink", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addEmptyBook}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Book
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("books", books)}
                  disabled={saving === "books"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "books" ? "Saving..." : "Save Books"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "concepts" && (
          <AdminSection title="Concepts" id="concepts">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-1">
                Physics concepts and their mapping to book parts/chapters.
              </p>
              <div className="space-y-3">
                {(Array.isArray(concepts) ? concepts : []).map((concept, index) => (
                  <div
                    key={concept.id || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Concept {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeConcept(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>ID</label>
                        <input
                          className={inputClass}
                          value={concept.id || ""}
                          onChange={(e) =>
                            updateConceptField(index, "id", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={concept.title || ""}
                          onChange={(e) =>
                            updateConceptField(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <input
                          className={inputClass}
                          value={concept.category || ""}
                          onChange={(e) =>
                            updateConceptField(index, "category", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Book part (e.g., 1 or 2)</label>
                        <input
                          className={inputClass}
                          value={concept.bookPart || ""}
                          onChange={(e) =>
                            updateConceptField(index, "bookPart", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Chapter</label>
                        <input
                          className={inputClass}
                          value={concept.chapter || ""}
                          onChange={(e) =>
                            updateConceptField(index, "chapter", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={concept.description || ""}
                        onChange={(e) =>
                          updateConceptField(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addConcept}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Concept
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("concepts", concepts)}
                  disabled={saving === "concepts"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "concepts" ? "Saving..." : "Save Concepts"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "resources" && (
          <AdminSection title="Resources" id="resources">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-1">
                Downloads and external links.
              </p>
              <div className="space-y-3">
                {(Array.isArray(resources) ? resources : []).map((resource, index) => (
                  <div
                    key={resource.id || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Resource {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeResource(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>ID</label>
                        <input
                          className={inputClass}
                          value={resource.id || ""}
                          onChange={(e) =>
                            updateResourceField(index, "id", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={resource.title || ""}
                          onChange={(e) =>
                            updateResourceField(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <select
                          className={inputClass}
                          value={resource.category || "link"}
                          onChange={(e) =>
                            updateResourceField(index, "category", e.target.value)
                          }
                        >
                          <option value="download">Download</option>
                          <option value="link">Link</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Link (for downloads or external sites)</label>
                        <input
                          className={inputClass}
                          value={resource.link || ""}
                          onChange={(e) =>
                            updateResourceField(index, "link", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={resource.description || ""}
                        onChange={(e) =>
                          updateResourceField(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addResource}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Resource
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("resources", resources)}
                  disabled={saving === "resources"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "resources" ? "Saving..." : "Save Resources"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "lectures" && (
          <AdminSection title="Lectures" id="lectures">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-1">
                Upcoming and past lectures/workshops.
              </p>
              <div className="space-y-3">
                {(Array.isArray(lectures) ? lectures : []).map((lecture, index) => (
                  <div
                    key={lecture.id || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Lecture {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLecture(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>ID</label>
                        <input
                          className={inputClass}
                          value={lecture.id || ""}
                          onChange={(e) =>
                            updateLectureField(index, "id", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={lecture.title || ""}
                          onChange={(e) =>
                            updateLectureField(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Date</label>
                        <input
                          className={inputClass}
                          value={lecture.date || ""}
                          onChange={(e) =>
                            updateLectureField(index, "date", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Venue</label>
                        <input
                          className={inputClass}
                          value={lecture.venue || ""}
                          onChange={(e) =>
                            updateLectureField(index, "venue", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Topic</label>
                        <input
                          className={inputClass}
                          value={lecture.topic || ""}
                          onChange={(e) =>
                            updateLectureField(index, "topic", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Registration link</label>
                        <input
                          className={inputClass}
                          value={lecture.registrationLink || ""}
                          onChange={(e) =>
                            updateLectureField(
                              index,
                              "registrationLink",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        id={`past-${index}`}
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded border-slate-200 text-amber-500 focus:ring-amber-400"
                        checked={!!lecture.past}
                        onChange={(e) =>
                          updateLectureField(index, "past", e.target.checked)
                        }
                      />
                      <label
                        htmlFor={`past-${index}`}
                        className="text-xs text-slate-600"
                      >
                        Past event
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addLecture}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Lecture
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("lectures", lectures)}
                  disabled={saving === "lectures"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "lectures" ? "Saving..." : "Save Lectures"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "contact" && (
          <AdminSection title="Contact page" id="contact">
            <div className="space-y-4">
              <div><label className={labelClass}>Title</label><input className={inputClass} value={contactContent.title} onChange={(e) => setContent((c) => ({ ...c, contactContent: { ...contactContent, title: e.target.value } }))} /></div>
              <div><label className={labelClass}>Subtitle</label><input className={inputClass} value={contactContent.subtitle} onChange={(e) => setContent((c) => ({ ...c, contactContent: { ...contactContent, subtitle: e.target.value } }))} /></div>
              <div><label className={labelClass}>Institution name</label><input className={inputClass} value={contactContent.institutionName} onChange={(e) => setContent((c) => ({ ...c, contactContent: { ...contactContent, institutionName: e.target.value } }))} /></div>
              <div><label className={labelClass}>Institution details (multiline)</label><textarea className={inputClass} rows={4} value={contactContent.institutionDetails} onChange={(e) => setContent((c) => ({ ...c, contactContent: { ...contactContent, institutionDetails: e.target.value } }))} /></div>
              <button onClick={() => saveContent("contactContent", contactContent)} disabled={saving === "contactContent"} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"> {saving === "contactContent" ? "Saving..." : "Save Contact"} </button>
            </div>
          </AdminSection>
          )}

          {activeSection === "gallery" && (
          <AdminSection title="Gallery" id="gallery">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-1">
                Images shown in the gallery section.
              </p>
              <div className="space-y-3">
                {(Array.isArray(gallery) ? gallery : []).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="rounded-xl border border-white/50 bg-white/50 p-4 shadow-sm backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Image {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(index)}
                        className="text-xs font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>ID</label>
                        <input
                          className={inputClass}
                          value={item.id || ""}
                          onChange={(e) =>
                            updateGalleryField(index, "id", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={item.title || ""}
                          onChange={(e) =>
                            updateGalleryField(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <input
                          className={inputClass}
                          value={item.category || ""}
                          onChange={(e) =>
                            updateGalleryField(index, "category", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Image URL</label>
                        <input
                          className={inputClass}
                          value={item.imageUrl || ""}
                          onChange={(e) =>
                            updateGalleryField(index, "imageUrl", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={item.description || ""}
                        onChange={(e) =>
                          updateGalleryField(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 text-sm font-medium text-slate-800 hover:bg-white hover:border-amber-200 backdrop-blur-sm"
                >
                  Add Image
                </button>
                <button
                  type="button"
                  onClick={() => saveContent("gallery", gallery)}
                  disabled={saving === "gallery"}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving === "gallery" ? "Saving..." : "Save Gallery"}
                </button>
              </div>
            </div>
          </AdminSection>
          )}

          {activeSection === "featured-publication" && (
          <AdminSection title="Featured Publication (home page)" id="featured-publication">
            <p className="text-sm text-slate-500 mb-4">Add new or edit/delete existing. The first item is shown on the home page.</p>
            {featuredPubs.map((pub) => (
              <div key={pub._id} className="border border-white/50 rounded-lg p-4 mb-4 flex flex-col gap-2 bg-white/50 backdrop-blur-md">
                <input className={inputClass} placeholder="Title" value={pub.title} onChange={(e) => setFeaturedPubs((prev) => prev.map((p) => (p._id === pub._id ? { ...p, title: e.target.value } : p))) } />
                <input className={inputClass} placeholder="Description" value={pub.description} onChange={(e) => setFeaturedPubs((prev) => prev.map((p) => (p._id === pub._id ? { ...p, description: e.target.value } : p))) } />
                <input className={inputClass} placeholder="Image (URL or placeholder)" value={pub.image} onChange={(e) => setFeaturedPubs((prev) => prev.map((p) => (p._id === pub._id ? { ...p, image: e.target.value } : p))) } />
                <input className={inputClass} placeholder="Link" value={pub.link} onChange={(e) => setFeaturedPubs((prev) => prev.map((p) => (p._id === pub._id ? { ...p, link: e.target.value } : p))) } />
                <div className="flex gap-2">
                  <button onClick={() => updateFeaturedPub(pub._id, { title: pub.title, description: pub.description, image: pub.image, link: pub.link })} disabled={saving === "featuredPublication"} className="px-3 py-1 rounded bg-amber-500 text-slate-900 text-sm font-medium">Update</button>
                  <button onClick={() => deleteFeaturedPub(pub._id)} className="px-3 py-1 rounded bg-red-500/80 text-white text-sm font-medium">Delete</button>
                </div>
              </div>
            ))}
            <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-white/40 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-700 mb-2">Add new</p>
              <AddFeaturedPubForm onAdd={saveFeaturedPub} saving={saving === "featuredPublication"} />
            </div>
          </AdminSection>
          )}
        </main>
      </div>
    </div>
  </div>
  );
}

function AddFeaturedPubForm({ onAdd, saving }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/90 text-slate-900 mb-2";
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, image, link });
    setTitle(""); setDescription(""); setImage(""); setLink("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input className={inputClass} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className={inputClass} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input className={inputClass} placeholder="Image URL or placeholder" value={image} onChange={(e) => setImage(e.target.value)} required />
      <input className={inputClass} placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} required />
      <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 disabled:opacity-50"> {saving ? "Adding..." : "Add Featured Publication"} </button>
    </form>
  );
}
