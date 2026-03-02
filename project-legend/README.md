# H.C. Verma Physics Website

A modern website for physicist and author H.C. Verma, showcasing his work in physics education.

## Features

- **Home** – Hero, featured publications, quick links
- **About** – Bio, achievements, teaching philosophy
- **Books** – Concepts of Physics and publications
- **Concepts** – Browseable physics topics with search and filters
- **Lectures** – Upcoming and past workshops
- **Blog** – MDX-based articles
- **Resources** – Downloads and useful links
- **Contact** – Form and institution details

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes (dark/light mode)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/           # Pages and routes
├── components/    # UI components
├── data/          # Static data (books, concepts, etc.)
├── lib/           # Utilities (MDX parsing)
content/
└── blog/          # Blog posts (.mdx)
```

## Adding Blog Posts

Create `.mdx` files in `content/blog/` with frontmatter:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-15"
readTime: "5 min read"
---

Your content here...
```

## Contact Form

The contact form submits to `/api/contact`. Integrate with Resend, Formspree, or your email service by editing `src/app/api/contact/route.ts`.
