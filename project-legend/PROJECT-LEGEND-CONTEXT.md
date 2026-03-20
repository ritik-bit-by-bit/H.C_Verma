### Project Legend – Product & Content Overview

**Project Legend** is the official online presence for **Dr. H.C. Verma**, focused on making physics accessible for students preparing for JEE and other competitive exams. The workspace contains:

- **`project-legend`**: The main public-facing site for students, educators, and institutions.
- **`project-legend-admin`**: An internal **Site Content Console** for managing nearly all public-facing content via a MongoDB-backed store.

This document focuses on **product and content context**, not technical implementation.

---

### Main Site (`project-legend`)

#### Audience & Purpose

- **Primary audience**: Students (especially JEE/competitive exam aspirants), educators, and institutions interested in Dr. H.C. Verma’s work.
- **Purpose**:
  - Central, official hub for **H.C. Verma** and his physics teaching.
  - Present and promote his books, especially **“Concepts of Physics” Parts 1 & 2**.
  - Provide a structured index of **physics concepts** tied to the books.
  - Share information on **lectures** and **workshops**.
  - Offer **resources** like errata and useful external links.
  - Host a **blog** for editorial content related to physics and education.

---

### Key User Journeys / Sections

#### Home / Landing

- **Core message**: Physics should be **understood**, not memorized – aligning with H.C. Verma’s teaching philosophy.
- **Hero section**:
  - Introduces **H.C. Verma** and highlights *Concepts of Physics* as a cornerstone for JEE and other competitive exams.
  - Main CTAs typically direct users to:
    - **“Explore Books”** (books/publications page).
    - **“Physics Concepts”** (concepts directory).
- **Featured Publication**:
  - Prominent section highlighting one selected publication (e.g., a specific edition or key resource).
  - Content is curated and managed via the admin console / MongoDB.
- **Explore section**:
  - Feature cards that guide users toward:
    - **Concepts** (physics concepts index).
    - **Lectures** (events/workshops).
    - **Blog** (articles).
- **Gallery preview**:
  - Visual snippets from books, lectures, and events encouraging deeper exploration.

#### About

- Dedicated page to introduce **Dr. Harish Chandra Verma**:
  - Long-time faculty member in the **Department of Physics, IIT Kanpur**.
  - Author of **Concepts of Physics**, widely used for JEE preparation.
  - Emphasis on his philosophy that physics should **build intuition and conceptual clarity** rather than rely on rote formula memorization.
- **Content elements**:
  - Multiple **bio paragraphs** describing his background, teaching career, and impact.
  - **Achievements**:
    - Being a professor at **IIT Kanpur**.
    - Authoring **Concepts of Physics** (both parts).
    - His broader contributions to physics education.
  - **Quote section**:
    - Example: *“Physics is not about memorizing formulas—it’s about understanding the way the universe works.”* – H.C. Verma.

#### Books / Publications

- Page focused on books authored by **H.C. Verma**, primarily:
  - **Concepts of Physics – Part 1**
  - **Concepts of Physics – Part 2**
- **Per-book details**:
  - Title and optional **subtitle** (e.g., “Part 1”, “Part 2”).
  - Descriptive overview of **topics covered**:
    - Part 1: mechanics, thermodynamics, waves, optics, etc.
    - Part 2: electricity, magnetism, electromagnetic waves, modern physics, etc.
  - Visual placeholders for **book covers**.
  - External links such as **“Find on Amazon”** for purchasing.

#### Physics Concepts

- A **structured directory of physics concepts**, each mapped to the relevant parts/chapters of **Concepts of Physics**.
- **For each concept**:
  - **Title** (e.g., Mechanics, Thermodynamics, Waves, Optics, Electricity, Magnetism, Modern Physics).
  - **Category** (e.g., *Classical Physics*, *Electromagnetism*, *Quantum & Relativity*).
  - **Description** giving a short conceptual explanation.
  - **Book mapping**:
    - Which **part** of Concepts of Physics (Part 1 or Part 2).
    - Which **chapter** within that part.
- **User capabilities**:
  - Search concepts by text.
  - Filter by category using buttons (e.g., only show Electromagnetism topics).
  - Browse to quickly locate relevant theory for specific exam topics.

#### Lectures & Workshops

- Page listing **teaching events** conducted by H.C. Verma, separated into:
  - **Upcoming lectures/workshops**.
  - **Past lectures/workshops**.
- **Each lecture entry** typically includes:
  - **Title** (e.g., “Physics Workshop”, “IIT Kanpur Lecture Series”).
  - **Venue** (e.g., IIT Kanpur).
  - **Date** (e.g., specific year or “TBA”).
  - **Topic/description** (e.g., “Conceptual clarity in mechanics”, “Teaching physics with intuition”).
  - Optional **registration link** for upcoming events (button: “Register”).
- Purpose:
  - Promote live sessions and allow students/educators to sign up (for upcoming events).
  - Maintain a record of past educational outreach (for credibility and transparency).

#### Blog

- **Blog index page**:
  - Lists articles with:
    - Title.
    - Short description/excerpt.
    - Publication date (formatted in Indian locale).
    - Optional **read-time** estimate.
  - Each card includes a **“Read more →”** link to the full article.
  - Shows an empty state (e.g., “No posts yet”) if there are no posts.
- **Blog post detail page**:
  - Provides:
    - **Back link** to blog index (“← Back to Blog”).
    - Post title.
    - Date and read-time.
    - Full body content, written in markdown/MDX.
  - Bottom of page also includes a **back-to-blog** button.
- Content focus:
  - Physics education, conceptual explanations, exam preparation.
  - Commentary on teaching methods and perhaps reflections from H.C. Verma.

#### Resources

- Page providing **supporting materials** and trusted references.
- Two primary content types:
  - **Downloads**:
    - Example: “Concepts of Physics – Errata”.
    - Description explaining the purpose (e.g., corrections and clarifications for the book).
    - Likely delivered as PDFs or similar formats.
  - **Useful Links**:
    - Example links:
      - Official **IIT Kanpur Physics Department** site.
      - Official **JEE Main** exam website.
    - Each link includes title, short description, and a **“Visit site →”** link.
- This page aims to be a **trusted resource hub** around H.C. Verma’s ecosystem.

#### Contact

- **Contact form** intended for:
  - Lecture invitations.
  - Collaborations with institutions/teachers.
  - Book-related or general inquiries.
- Typical fields:
  - Name.
  - Email.
  - Subject.
  - Message.
- On submission:
  - Sends data to a backend endpoint (`/api/contact`).
  - Shows success or error feedback:
    - Success: confirms message was sent and that someone will respond.
    - Error: suggests something went wrong and recommends contacting via email.
- **Institution details** section:
  - Highlights the association with **IIT Kanpur**.
  - Provides multi-line address for **Department of Physics, IIT Kanpur**, reinforcing credibility and physical location.

#### Gallery

- Visual gallery titled something like **“Gallery”** with a subtitle such as:
  - “Curated images from books, lectures, and events.”
- **Gallery items** may include:
  - **Book covers**:
    - “Concepts of Physics – Part 1”.
    - “Concepts of Physics – Part 2”.
  - **Lecture photos**:
    - “Lecture Session” – images of interactive teaching with students.
  - Each gallery item carries:
    - Image (URL or placeholder).
    - Title.
    - Optional category (e.g., Books, Lectures).
    - Short description.
- Serves to **visually tell the story** of the books and lectures.

---

### Global Layout & Messaging

#### Header & Navigation

- **Site title**:
  - Typically “H.C. Verma” or similar, managed via content.
- **Navigation links** usually include:
  - Home.
  - About.
  - Books.
  - Concepts.
  - Lectures.
  - Blog.
  - Resources.
  - Contact.
- May include a **theme toggle** (e.g., light/dark) for user preference, but this is purely UX.

#### Footer

- **Tagline**:
  - “**Making Physics Accessible**” (central to the brand).
- **Quick links**:
  - About.
  - Books.
  - Contact.
  - Resources.
- **Copyright**
  - Uses the current year and something like:
    - “© {year} H.C. Verma. All rights reserved.”

#### Site Meta Positioning

- The site presents itself as:
  - The **official website of physicist and author H.C. Verma**.
  - A hub for:
    - *Concepts of Physics*.
    - Lectures and educational events.
    - Resources for **JEE and other competitive exams**.

---

### Admin App (`project-legend-admin`) – Site Content Console

#### Audience & Purpose

- **Intended users**:
  - Website owners.
  - Content editors.
  - Trusted admins.
- **Goal**:
  - Provide a **single dashboard** to manage almost all public-facing content of the main site.
  - Keep content in a **MongoDB store** so that:
    - Admins can edit without redeploying code.
    - The main site can read updated content dynamically via content APIs.

#### Overall Structure

- Main admin route:
  - Titled something like **“Project Legend – Site Content Console”**.
  - Subheading emphasizes:
    - Managing every section of the public website from one streamlined interface.
- Integrates with the main site via:
  - **Site URL & Site API URL** helpers:
    - A “View live site” button points to the public site.
    - Edit operations call JSON APIs such as:
      - `/api/content/{key}` for fetching a specific content block.
      - `/api/content` for updating content by key.
      - `/api/getFeaturedPublication` and `/api/featured-publication/...` for reading/writing the featured publication data.
- On load:
  - Fetches current content from MongoDB.
  - If that content is missing or fails to load, it falls back to **default content** baked into the main site and shows a **warning banner**:
    - Suggests checking that the main site and MongoDB are properly configured.

---

### Editable Content Sections (Admin → Main Site Mapping)

The admin app uses a set of **content keys**, each controlling a major section of the public site:

- `hero`
- `featureCards`
- `homeSections`
- `navLinks`
- `footer`
- `about`
- `books`
- `concepts`
- `resources`
- `lectures`
- `contactContent`
- `gallery`
- **Featured Publication** (managed through separate CRUD UI)

Below is how each section affects the public site.

#### Hero

- Controls the **home page hero section**, including:
  - Site name (header).
  - Main headline (e.g., about making physics accessible).
  - Subheadline.
  - Primary and secondary **CTA text and links**:
    - Example: “Explore Books” → `/books`.
    - Example: “Physics Concepts” → `/concepts`.
  - Hero image URL (background or side illustration).
- Admin flow:
  - Update hero fields in a form.
  - Click “Save Hero” (or equivalent) to persist via the content API.

#### Feature Cards (Explore Section)

- JSON array controlling **cards on the home page “Explore” section**.
- Each card structure:
  - `title` – e.g., “Concepts”.
  - `description` – short explanatory text.
  - `href` – link to the relevant section (`/concepts`, `/lectures`, `/blog`).
  - `icon` – visual/icon key used in UI.
- Purpose:
  - Drive users to key parts of the site through visually distinct cards on the homepage.

#### Home Sections

- High-level section headings on the home page, such as:
  - **“Featured Publication”** – plus subtitle summarizing the importance of the highlighted resource.
  - **“Explore”** – plus subtitle inviting users to navigate to concepts, lectures, and blog.
- Admins can adjust titles and subtitles to refine messaging without code changes.

#### Navigation Links (`navLinks`)

- JSON array representing the **top navigation menu**:
  - Each item:
    - `href` – path (e.g., `/about`, `/books`, `/contact`).
    - `label` – user-visible text (e.g., “About”, “Books”, “Contact”).
- This defines which pages appear in the header and in what order.

#### Footer

- Controls what appears in the **footer**:
  - Site name (e.g., “H.C. Verma”).
  - **Tagline** (e.g., “Making Physics Accessible”).
  - **Footer links**:
    - About, Books, Contact, Resources, etc.
  - Copyright:
    - Name to display after the © symbol.
- Allows editors to tweak brand copy and quick links site-wide.

#### About

- JSON object powering the **About page content**, including:
  - `name` – “H.C. Verma”.
  - `imagePlaceholder` – for profile image, if any.
  - `bioParagraphs` – multiple paragraphs describing:
    - Academic background.
    - Teaching experience at IIT Kanpur.
    - Impact on physics education and authorship.
  - `achievements` – list of notable achievements:
    - Positions held.
    - Publications (especially Concepts of Physics).
  - `quoteText` and `quoteAuthor` – the main quote shown on the page.
- Admins can refine the biography, add new achievements, or adjust the quote.

#### Books

- JSON array of **book entries** displayed on the books/publications page.
- Each book:
  - `id` – internal identifier.
  - `title` – e.g., “Concepts of Physics”.
  - `subtitle` – e.g., “Part 1” or “Part 2”.
  - `description` – summary of contents and who it’s for.
  - `coverPlaceholder` – placeholder text/image reference.
  - `purchaseLink` – external purchase URL (e.g., to Amazon).
- Admins can:
  - Add future books or editions.
  - Update descriptions and purchase links as needed.

#### Concepts

- JSON array powering the **Physics Concepts** directory.
- Each concept item:
  - `id`.
  - `title` – concept name (e.g., “Simple Harmonic Motion”).
  - `category` – grouping such as Classical Physics, Electromagnetism, Quantum & Relativity, etc.
  - `description` – brief conceptual explanation.
  - `bookPart` – “Part 1” or “Part 2”.
  - `chapter` – chapter number or name from the book.
- This mapping allows students to:
  - Link conceptual topics directly back to the relevant portion of **Concepts of Physics**.
- Admins can expand or refine the concept catalog over time.

#### Resources

- JSON array controlling the **Resources** page content:
  - Each resource:
    - `id`.
    - `title`.
    - `description`.
    - `link` (if applicable).
    - `category` – typically:
      - `"download"`: links to downloadable files such as **errata PDFs**.
      - `"link"`: external sites like official exam or institution pages.
- Editors can:
  - Add new downloads (e.g., additional errata, supplementary material).
  - Add or update external links (e.g., updated JEE site URLs).

#### Lectures

- JSON array determining the **Lectures & Workshops** page.
- Each lecture entry:
  - `id`.
  - `title` – e.g., “Physics Workshop”.
  - `date` – a date string, “TBA”, etc.
  - `venue` – e.g., IIT Kanpur or other institutions.
  - `topic` – optional description of the theme of the lecture.
  - `registrationLink` – optional URL if registration is open.
  - `past` – boolean flag to indicate if the event is past or upcoming.
- Frontend separates these into **upcoming** vs **past** lists:
  - Upcoming events emphasize registration opportunities.
  - Past events highlight historical teaching engagement.

#### Contact Content (`contactContent`)

- Object representing the **static text** around the contact form:
  - `title` and `subtitle` – heading and subheading on the contact page.
  - `institutionName` – e.g., Department of Physics, IIT Kanpur.
  - `institutionDetails` – multiline address / institution description.
- This does not change how the form works but controls the contextual text and institutional branding.

#### Gallery

- JSON array for **Gallery** items:
  - Each item:
    - `id`.
    - `title`.
    - `description`.
    - `imageUrl`.
    - `category` – e.g., “Books”, “Lectures”.
- Editors can:
  - Curate which images are displayed.
  - Organize them by category to tell different visual stories (book-related imagery vs lecture/event imagery).

#### Featured Publication

- Managed via a dedicated section in the admin UI.
- Capabilities:
  - **List** all current featured publication entries (from MongoDB).
  - **Edit** individual entries:
    - `title`.
    - `description`.
    - `image` (URL or reference).
    - `link` (e.g., purchase or detail page).
  - **Delete** entries.
  - **Add new** entries via a small add form.
- On the public site:
  - The **first featured publication** in this list is typically shown in the **Featured Publication** section on the home page.

---

### Shared Domain Concepts & Vocabulary

- **H.C. Verma**:
  - Indian physicist and educator.
  - Long-tenured professor at **IIT Kanpur**.
  - Widely known for the **Concepts of Physics** books.
- **Concepts of Physics (Part 1 & Part 2)**:
  - Two-volume flagship textbook used across India for **JEE and other competitive exam preparation**.
  - Part 1: typically covers mechanics, thermodynamics, waves, optics, etc.
  - Part 2: covers electricity, magnetism, electromagnetic waves, modern physics, etc.
- **Project Legend**:
  - The overarching name for this digital project.
  - Combines:
    - The **public website** for learners and educators.
    - The **admin console** for content editors.
- **Making Physics Accessible**:
  - Core tagline and philosophy.
  - Emphasizes conceptual understanding over rote learning.
- **Physics Concepts**:
  - Structured entities representing topics like mechanics, waves, electromagnetism, etc.
  - Each is linked directly to the corresponding part and chapter of Concepts of Physics.
- **Lectures & Workshops**:
  - In-person or online teaching events featuring H.C. Verma.
  - Used to showcase expertise, provide learning opportunities, and build community.
- **Resources**:
  - Supporting materials around his work:
    - **Errata** for the books (ensuring accurate study).
    - Official links (e.g., IIT Kanpur Physics Dept, JEE Main site).
- **Gallery**:
  - Visual collection framing the project’s story:
    - Book covers.
    - Photos from lectures and academic events.
- **Site Content Console**:
  - Internal term for the admin app.
  - Encapsulates the idea that nearly every public-facing text, navigation link, and key block of content is centrally editable and stored in MongoDB.

---

### How to Use This Document

- Use this file as a **product and content reference** when:
  - Writing or editing copy for any page.
  - Deciding how to structure new sections or flows.
  - Onboarding collaborators to understand what the site offers and how content is organized.
- It intentionally avoids low-level technical details so you can focus on **what** the system communicates and **to whom**, rather than how it is implemented.

