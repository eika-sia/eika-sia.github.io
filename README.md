# eikasia.net

**Personal Website + Interactive CV**
Built with [Astro](https://astro.build), styled with [Tailwind CSS](https://tailwindcss.com), and deployed via [GitHub Pages](https://pages.github.com).

---

## 🌐 Overview

Personal site + interactive CV. Focus areas:

-   Education timeline & progress
-   Neuroscience + hardware/software side projects
-   Current project tracking (progress bars)
-   Publications section
-   Blog & project detail pages

All content is Markdown (no CMS). Astro builds static pages using small, composable UI components with a single dark glass aesthetic.

---

## 🔧 Tech Stack

-   **Astro** for static site generation
-   **Tailwind CSS** for styling
-   **GitHub Pages** for deployment
-   **Cloudflare** for DNS (eikasia.net)
-   **Markdown** for content

No backend, no CMS. All content is edited directly in the repo.

---

## 📁 Folder Structure (simplified)

```
src/
    components/
    site/          # Core UI primitives (Card, SectionHeader, ProgressBar, etc.)
    projects/      # Project-related views (ProjectPage, lists)
        blog/          # BlogPost renderer
    layouts/         # BaseLayout wrapper
    pages/           # Astro routes (index, blog, projects, cv + dynamic [slug])
    content/         # Markdown collections (blog, projects)
    data/            # JSON data (education.json)
public/            # Static assets + CNAME
```

Removed legacy duplicate or deprecated components (old duplicates, unused ProjectHighlights, BlogList) to avoid ambiguity. Unified square card aesthetic site‑wide.

---

## 📌 Site Features & Functionality

### 🏠 Homepage (`/`)

-   Hero: name, tagline, contact links
-   Education progression
-   Current projects (with progress)
-   Selected publications

### 📄 CV Page (`/cv`)

-   Contact info
-   Full history (education + experience)
-   Downloadable CVs (PDFs in `/public`)

### 📚 Blog (`/blog` and `/blog/[slug]`)

-   Listing of Markdown-rendered posts with tags and previews
-   Full-page blog post rendering
-   Each blog card includes:

    -   Title
    -   Short description
    -   Tags
    -   Read time

### 🧪 Projects (`/projects` + dynamic pages)

-   Listing: title, description, tags, optional progress
-   Per-project detail pages via `[slug]`

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

Core (in `src/components/site`):

-   `Card.astro` – square glass card primitive (projects, publications, education)
-   `SectionHeader.astro` – terminal-inspired section heading (variants)
-   `CtaButton.astro` – unified call‑to‑action styling
-   `PublicationsList.astro` – maps publications JSON to cards
-   `FullHistory.astro` – CV experience, achievements, skills, interests
-   `BaseLayout.astro` (in `layouts/`) – global shell, SEO meta, nav accent

Design: single dark/glass aesthetic, subtle gradients, no theme toggle.

---

## 🚀 Deployment Instructions

-   Deploy via GitHub Pages using GitHub Actions
-   Use Cloudflare to point DNS from `eikasia.net`
-   Add `CNAME` in `public/` with:

```
eikasia.net
```

---

## 📦 Possible Future Enhancements

-   [x] RSS feed (implemented in `src/pages/rss.xml.ts`)
-   [x] Sitemap generation (`src/pages/sitemap.xml.ts`)
-   [ ] Tag filtering
-   [ ] Search (client-side fuzzy)
-   [ ] Project feed generation
-   [ ] Print/PDF CV stylesheet + auto export
-   [ ] Structured data for individual blog posts (Article schema)
-   [ ] Dynamic OG image generation

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
