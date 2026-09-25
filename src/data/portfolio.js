// All portfolio content lives here — edit this file to make the site yours.
// Everything below is sample content; replace it with your real details.

export const profile = {
  name: 'Nirmal',
  fullName: 'Nirmal Kumar',
  role: 'Full-Stack Software Developer',
  location: 'India · Open to remote',
  email: 'hello@nirmal.dev',
  available: true,
  tagline:
    'I design and build fast, accessible web products — from pixel-perfect interfaces to the APIs that power them.',
  resumeUrl: '/resume.pdf', // drop your CV into /public/resume.pdf
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    x: 'https://x.com/',
  },
  stats: [
    { value: '4+', label: 'Years building' },
    { value: '30+', label: 'Projects shipped' },
    { value: '15+', label: 'Happy clients' },
  ],
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Work' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    "I'm a software developer who cares about the details that make products feel effortless — smooth interactions, sensible architecture, and code that the next person enjoys reading.",
    'Most of my work sits at the intersection of frontend engineering and product thinking. I like owning features end to end: sketching the flow, building the UI, wiring up the API, and measuring what happens after launch.',
  ],
  highlights: [
    {
      icon: 'Rocket',
      title: 'Ship with intent',
      text: 'Small, reviewable increments that reach users early and often.',
    },
    {
      icon: 'Palette',
      title: 'Design-minded',
      text: 'Comfortable in Figma, fluent in motion, strict about accessibility.',
    },
    {
      icon: 'Layers',
      title: 'Full-stack depth',
      text: 'From React components to Node services and Postgres schemas.',
    },
  ],
}

// Home page "What I do" section
export const services = [
  {
    icon: 'MonitorSmartphone',
    title: 'Web applications',
    text: 'Responsive, production-ready apps built with React and a clean, scalable architecture.',
    points: ['SPAs & dashboards', 'Auth, forms & state', 'Mobile-first layouts'],
  },
  {
    icon: 'Server',
    title: 'APIs & backend',
    text: 'Reliable Node.js services and data models that are easy to extend and simple to operate.',
    points: ['REST & GraphQL APIs', 'PostgreSQL & MongoDB', 'Auth & payments'],
  },
  {
    icon: 'Blocks',
    title: 'Design systems',
    text: 'Reusable, accessible component libraries that keep large products consistent.',
    points: ['Component libraries', 'Theme tokens', 'Docs & Storybook'],
  },
  {
    icon: 'Gauge',
    title: 'Performance & a11y',
    text: 'Audits and fixes that make existing products faster and usable by everyone.',
    points: ['Core Web Vitals', 'Bundle optimisation', 'WCAG accessibility'],
  },
]

export const process = [
  { icon: 'Search', command: 'discover', text: 'Understand the goals, users and constraints.' },
  { icon: 'PenTool', command: 'design', text: 'Map the flows and agree on the plan.' },
  { icon: 'Hammer', command: 'build', text: 'Ship in small, reviewable increments.' },
  { icon: 'Rocket', command: 'launch', text: 'Deploy, measure and keep improving.' },
]

export const skillGroups = [
  {
    icon: 'CodeXml',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux', 'HTML & CSS'],
  },
  {
    icon: 'Server',
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Prisma', 'Redis'],
  },
  {
    icon: 'Wrench',
    title: 'Tooling & Cloud',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Vite', 'Jest', 'Playwright'],
  },
]

export const marquee = [
  'React', 'Vite', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Framer Motion',
  'Next.js', 'Docker', 'GraphQL', 'AWS', 'MongoDB', 'Figma', 'Redis',
]

export const projectCategories = ['All', 'Web App', 'SaaS', 'Open Source', 'Mobile']

export const projects = [
  {
    slug: 'nebula-analytics',
    title: 'Nebula Analytics',
    category: 'SaaS',
    year: '2025',
    featured: true,
    icon: 'ChartNoAxesCombined',
    summary: 'Real-time product analytics dashboard with custom event pipelines and shareable reports.',
    description:
      'Nebula gives product teams a live view of how users move through their app. Events stream in over WebSockets, are aggregated in Postgres, and render as interactive charts that can be sliced by any property.',
    role: 'Lead frontend engineer',
    highlights: [
      'Rendered 100k+ data points smoothly with virtualised tables and canvas charts',
      'Designed a composable filter builder used across every report',
      'Cut dashboard load time by 60% with query batching and edge caching',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    links: { live: '#', github: '#' },
  },
  {
    slug: 'orbit-commerce',
    title: 'Orbit Commerce',
    category: 'Web App',
    year: '2025',
    featured: true,
    icon: 'ShoppingBag',
    summary: 'Headless storefront with lightning-fast search, cart animations and a Stripe checkout.',
    description:
      'A headless e-commerce storefront focused on speed and delight. Product pages are statically generated, search runs instantly on the client, and the checkout flow is fully keyboard accessible.',
    role: 'Full-stack developer',
    highlights: [
      'Lighthouse performance score of 98 on mobile',
      'Instant faceted search across 5,000 products',
      'Stripe checkout with webhooks for order fulfilment',
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
    links: { live: '#', github: '#' },
  },
  {
    slug: 'pulse-ui',
    title: 'Pulse UI',
    category: 'Open Source',
    year: '2024',
    featured: true,
    icon: 'Component',
    summary: 'An accessible React component library with motion presets and theme tokens.',
    description:
      'Pulse UI is a set of unstyled-first React primitives with a polished default theme. Every component ships with keyboard support, ARIA semantics and optional motion presets.',
    role: 'Creator & maintainer',
    highlights: [
      '40+ components with full keyboard and screen-reader support',
      'Token-based theming that works with Tailwind or plain CSS',
      'Documented with interactive examples and visual regression tests',
    ],
    tags: ['React', 'Radix', 'Storybook', 'Vitest'],
    links: { live: '#', github: '#' },
  },
  {
    slug: 'taskflow',
    title: 'Taskflow',
    category: 'SaaS',
    year: '2024',
    featured: false,
    icon: 'SquareKanban',
    summary: 'Collaborative kanban board with real-time presence and offline support.',
    description:
      'Taskflow keeps small teams in sync with boards that update live for everyone. Changes made offline are queued locally and reconciled when the connection returns.',
    role: 'Full-stack developer',
    highlights: [
      'Conflict-free syncing with CRDTs',
      'Drag and drop that works on touch and keyboard',
      'Optimistic UI with automatic rollback on failure',
    ],
    tags: ['React', 'Express', 'MongoDB', 'Socket.io'],
    links: { live: '#', github: '#' },
  },
  {
    slug: 'fitlog',
    title: 'FitLog',
    category: 'Mobile',
    year: '2023',
    featured: false,
    icon: 'Dumbbell',
    summary: 'Workout tracker with progressive-overload suggestions and progress charts.',
    description:
      'FitLog helps lifters plan sessions and track progress over time. It suggests the next weight and rep target based on recent performance and visualises trends per exercise.',
    role: 'Solo developer',
    highlights: [
      'Installable PWA that works fully offline',
      'Smart suggestions based on the last six sessions',
      'Exportable history as CSV',
    ],
    tags: ['React Native', 'Expo', 'SQLite'],
    links: { live: '#', github: '#' },
  },
  {
    slug: 'devnotes-cli',
    title: 'DevNotes CLI',
    category: 'Open Source',
    year: '2023',
    featured: false,
    icon: 'SquareTerminal',
    summary: 'A tiny command-line tool for capturing and searching developer notes in Markdown.',
    description:
      'DevNotes lets you jot down commands, snippets and ideas without leaving the terminal. Notes are plain Markdown files, searchable with fuzzy matching and taggable for later.',
    role: 'Creator',
    highlights: [
      'Fuzzy search over thousands of notes in milliseconds',
      'Git-friendly plain-text storage',
      'Published on npm with zero runtime dependencies',
    ],
    tags: ['Node.js', 'CLI', 'npm'],
    links: { github: '#' },
  },
]

export const experience = [
  {
    role: 'Senior Frontend Developer',
    company: 'Acme Labs',
    period: '2024 — Present',
    location: 'Remote',
    points: [
      'Lead the frontend for a data-heavy SaaS platform used by 200+ teams.',
      'Introduced a shared design system that halved UI bug reports.',
      'Mentor three developers through code review and pairing.',
    ],
    tags: ['React', 'TypeScript', 'GraphQL'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Brightwave Studio',
    period: '2022 — 2024',
    location: 'Bengaluru',
    points: [
      'Built and launched 12 client projects from discovery to production.',
      'Set up CI/CD pipelines and preview deployments for every pull request.',
      'Designed REST APIs and Postgres schemas for booking and payments.',
    ],
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    role: 'Junior Web Developer',
    company: 'Pixelcraft',
    period: '2021 — 2022',
    location: 'Chennai',
    points: [
      'Turned Figma designs into responsive, accessible pages.',
      'Improved Core Web Vitals across the marketing site.',
    ],
    tags: ['JavaScript', 'Sass', 'WordPress'],
  },
]
