# Developer Portfolio

A developer-themed portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, **Framer Motion**, **Lenis**, **Lucide React**, **next/font** and **next-themes**.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Make it yours

All content lives in [`src/lib/data.ts`](src/lib/data.ts): name, roles, bio, stats, skills, experience, projects, socials and the hero code snippet. You shouldn't need to touch any component.

Colours are design tokens in [`src/app/globals.css`](src/app/globals.css). There's a `:root` (light "paper terminal") palette and a `.dark` ("midnight editor") palette, including the `--syntax-*` colours used for code highlighting.

## Pages

| Route | Content |
| --- | --- |
| `/` | Single page with every section; the navbar smooth-scrolls between them |
| `/projects/<slug>` | Detail page for each project in `projects` (`src/lib/data.ts`), statically generated |

`/projects` redirects to `/#projects`. From a project page, navbar links go back to the home page and land on the chosen section.

## What's inside

| Feature | Where |
| --- | --- |
| Linux-style boot loader on every load / refresh, press any key to skip | `components/boot-screen.tsx` |
| Floating `cd ~` scroll-to-top button with scroll-progress ring | `components/scroll-to-top.tsx` |
| Name "decrypt" scramble, role typewriter, live-typed code editor that "compiles" | `components/effects/*`, `sections/hero.tsx` |
| Cursor spotlight grid + drifting code glyphs, 3D tilt editor | `effects/hero-background.tsx` |
| IDE file-tab navbar with scroll-spy and animated active tab | `components/navbar.tsx` |
| ⌘K / Ctrl+K command palette (shadcn `Command`) | `components/command-menu.tsx` |
| Theme switch with circular View Transition reveal | `components/theme-toggle.tsx` |
| README card, count-up stats, animated contribution heatmap | `sections/about.tsx` |
| `npm ls`-style ASCII progress bars and tech marquee | `sections/stack.tsx` |
| `git log` commit graph that draws as you scroll, diff-style highlights | `sections/experience.tsx` |
| Filterable project cards with spotlight borders | `sections/projects.tsx` |
| Interactive shell: `help`, `neofetch`, `cat`, `cd`, `theme`, history, Tab-completion | `sections/terminal.tsx` |
| Contact form styled as an HTTP request (hands off to `mailto:`) | `sections/contact.tsx` |
| VS Code-style status bar | `components/status-bar.tsx` |

All animations respect `prefers-reduced-motion`. Lenis is disabled, and the boot screen and typing effects are skipped.

## Real form submissions

The contact form currently opens the visitor's mail client. To send messages server-side, add a route handler such as `src/app/api/contact/route.ts` (Resend, Formspree, etc.) and `fetch` it in `onSubmit` in `sections/contact.tsx`.
