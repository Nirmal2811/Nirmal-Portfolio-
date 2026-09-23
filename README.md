# Nirmal — Developer Portfolio

A black-and-purple developer portfolio built with React, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, Lenis, React Router, Lucide, React Hook Form and Zod.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Make it yours

- **Content**: everything (name, bio, skills, projects, experience, socials) is in [`src/data/portfolio.js`](src/data/portfolio.js).
- **Icons**: projects and highlights reference Lucide icons by name. Register any new one in [`src/lib/icons.js`](src/lib/icons.js).
- **Resume**: put your CV at `public/resume.pdf` for the "Download CV" button.
- **Project images**: [`src/components/ProjectCover.jsx`](src/components/ProjectCover.jsx) generates artwork. Swap it for an `<img>` when you have screenshots.
- **Theme colors**: the CSS variables at the top of [`src/index.css`](src/index.css).

## Contact form

The form is validated with Zod through React Hook Form. To receive submissions, copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a service that accepts JSON POSTs, such as Formspree. If you don't set it, the form opens the visitor's email client with the message already filled in.

## Structure

```
src/
  components/
    layout/     Navbar, Footer, Layout, scroll progress, scroll manager
    sections/   Hero, About, Skills, Work, Experience, Contact
    ui/         shadcn/ui components (button, card, badge, input, textarea, label, form)
    motion/     Reveal (scroll-triggered animation)
  data/         portfolio.js — all site content
  hooks/        useSectionNav (Lenis smooth scroll), useActiveSection
  lib/          utils (cn), icons, contact schema + submit
  pages/        Home, ProjectsPage, ProjectDetail, NotFound
```

## Deploying

This is a single-page app, so the host must send every route to `index.html`. On Vercel and Netlify, add a rewrite from `/*` to `/index.html` so links like `/projects/pulse-ui` work when opened directly.
