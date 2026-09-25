# Nirmal — Developer Portfolio

A black-and-purple developer portfolio built with React, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, Lenis, React Router, Lucide, React Hook Form and Zod.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run mobile   # build + serve on your network, for testing on a phone
```

To test on a phone, use `npm run mobile` and open the "Network" URL it prints. The dev server (`npm run dev`) sends development builds that aren't minified, so pages load several times slower than the real site, especially over Wi-Fi.

## Make it yours

- **Content**: everything (name, bio, skills, projects, experience, socials) is in [`src/data/portfolio.js`](src/data/portfolio.js).
- **Icons**: projects and highlights reference Lucide icons by name. Register any new one in [`src/lib/icons.js`](src/lib/icons.js).
- **Resume**: put your CV at `public/resume.pdf` for the "Download CV" button.
- **Project images**: [`src/components/ProjectCover.jsx`](src/components/ProjectCover.jsx) generates artwork. Swap it for an `<img>` when you have screenshots.
- **Theme colors**: the CSS variables at the top of [`src/index.css`](src/index.css).

## Contact form

The form is validated with Zod through React Hook Form. To receive submissions, copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a service that accepts JSON POSTs, such as Formspree. If you don't set it, the form opens the visitor's email client with the message already filled in.

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, featured projects, contact prompt |
| `/about` | About |
| `/skills` | Skills |
| `/projects` | All projects, filterable by category |
| `/projects/:slug` | Project details |
| `/experience` | Experience timeline |
| `/contact` | Contact form |
| anything else | 404 |

Routes are defined in [`src/App.jsx`](src/App.jsx) and the navbar links in `navLinks` in [`src/data/portfolio.js`](src/data/portfolio.js). Every page except Home loads its code only when visited.

## Structure

```
src/
  components/
    layout/     Navbar, Footer, Layout, scroll progress, scroll reset, back-to-top
    sections/   Hero, About, Skills, Work, Experience, Contact, ContactCTA
    ui/         shadcn/ui components (button, card, badge, input, textarea, label, form)
    motion/     Reveal (scroll-triggered animation)
  data/         portfolio.js — all site content
  hooks/        usePageMeta (page title), useBootReady, useMediaQuery
  lib/          utils (cn), icons, scroll, contact schema + submit
  pages/        one file per route
```

## Deploying

This is a single-page app, so the host must send every route to `index.html`, or opening `/about` directly returns the host's 404. This is already set up for Vercel ([`vercel.json`](vercel.json)) and Netlify ([`public/_redirects`](public/_redirects)). Other hosts need an equivalent rewrite rule.
