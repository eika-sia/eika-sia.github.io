# eikasia.net

**Personal Website + Interactive CV**
Built with [Astro](https://astro.build), styled with [Tailwind CSS](https://tailwindcss.com), and deployed via [GitHub Pages](https://pages.github.com).

---

## 🌐 Overview

This is the personal website of Eika, featuring:

-   Formal & informal education timeline
-   Passion projects (neuroscience, CTFs, music)
-   Current project tracking with progress bars
-   Highlighted blog & project previews
-   A downloadable CV and detailed profile

Content is handled entirely via Markdown files. Astro dynamically renders content into clean, modular components styled with Tailwind.

---

## 🔧 Tech Stack

-   **Astro** for static site generation
-   **Tailwind CSS** for styling
-   **GitHub Pages** for deployment
-   **Cloudflare** for DNS (eikasia.net)
-   **Markdown** for content

No backend, no CMS. All content is edited directly in the repo.

---

## 📁 Folder Structure

```
eikasia/
├── public/                  # Static assets (e.g. favicon, images)
├── src/
│   ├── components/          # UI Components (Card.astro, ProgressBar.astro, etc.)
│   ├── layouts/             # Layout wrappers (e.g., BaseLayout.astro)
│   ├── pages/               # Pages and routes
│   │   ├── index.astro      # Homepage
│   │   ├── blog/[slug].astro
│   │   ├── projects/[slug].astro
│   │   ├── blog.astro       # Blog listing
│   │   ├── projects.astro   # Project listing
│   │   └── cv.astro         # Full CV
│   ├── content/
│   │   ├── blog/*.md
│   │   └── projects/*.md
│   └── data/
│       └── education.json   # For ECTS or phase data
├── tailwind.config.mjs
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 📌 Site Features & Functionality

### 🏠 Homepage (`/`)

-   Hero section: name, tagline, contact links (email, GitHub, etc.)
-   **Formal education**: Timeline or progress bar using `education.json` (ECTS or phases)
-   **Informal learning**:

    -   Projects in neuroscience, reverse engineering, CTFs
    -   Music and fun art

-   **Current Projects**: 2-sentence summary + progress bar (defined in frontmatter)
-   **Highlights**: 3 blog cards + 3 project cards

### 📄 Detailed CV Page (`/cv`)

-   Contact info
-   Full academic and professional history
-   Downloadable CVs (PDF format, in `/public`)

### 📚 Blog (`/blog` and `/blog/[slug]`)

-   Listing of Markdown-rendered posts with tags and previews
-   Full-page blog post rendering
-   Each blog card includes:

    -   Title
    -   Short description
    -   Tags
    -   Read time

### 🧪 Projects (`/projects` and `/projects/[slug]`)

-   Cards showing:

    -   Title
    -   Short description
    -   Tags
    -   Progress bar (optional)

-   Full page per project

### 🔍 Markdown Frontmatter Example

For `content/projects/neuro-sim.md`:

```md
---
title: "Neural Simulation"
date: 2025-07-24
description: "Simulating basic neural dynamics using spiking models."
slug: "neuro-sim"
tags: ["neuro", "simulation"]
progress: 0.6
---

# Neural Simulation

This project explores basic spiking neuron behavior using Hodgkin-Huxley models...
```

---

## 🧩 UI Components

Modular and styled with Tailwind:

-   `Card.astro` - used for blog/project previews
-   `ProgressBar.astro` - used in project summaries and current progress section
-   `SectionHeader.astro` - reusable title/heading block
-   `Layout.astro` - base layout
-   Mobile-first design
-   Soft shadows, big font, minimalist structure

---

## 🚀 Deployment Instructions

-   Deploy via GitHub Pages using GitHub Actions
-   Use Cloudflare to point DNS from `eikasia.net`
-   Add `CNAME` in `public/` with:

```
eikasia.net
```

---

## 📦 Future Functionality Ideas (Optional Enhancements)

-   [ ] Add RSS feed from blog posts
-   [ ] Add theme toggle (light/dark mode)
-   [ ] Search bar for blog/projects
-   [ ] Timeline component for education
-   [ ] Basic tagging system and filter view

---

## 🧠 Notes for Copilot Agent Mode

You understand this project as:

-   A clean, minimal Astro site
-   Styling is driven via Tailwind utility classes
-   Markdown is the core content layer
-   Layout is modular: cards, progress bars, sections
-   All data is static and handled in `*.md` or `*.json`
-   Focus on clarity, whitespace, semantic HTML

You will:

-   Create layout and UI components as described
-   Parse frontmatter from Markdown
-   Sort blog/project lists by `date`
-   Style to match modern, minimalist sites (like antony.wiki)

---

**Website:** [https://eikasia.net](https://eikasia.net)
**License:** MIT
**Author:** Eika
