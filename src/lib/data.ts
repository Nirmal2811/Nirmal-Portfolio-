/**
 * Every piece of personal content lives here.
 * Edit this file to make the portfolio yours — no component changes needed.
 */

export const profile = {
  name: "Nirmal K M",
  handle: "nirmalkm",
  initials: "NK",
  role: "Front-End Developer",
  roles: [
    "Front-End Developer",
    "React.js Developer",
    "WordPress + ACF Developer",
    "Tailwind CSS Enthusiast",
  ],
  location: "Coimbatore, India · UTC+5:30",
  email: "nirmalkm2811@gmail.com",
  phone: "+91 84897 98440",
  available: true,
  tagline:
    "I build fast, responsive web interfaces with React.js and Tailwind CSS — from reusable component systems and API-driven dashboards to custom WordPress themes.",
  /** Your deployed portfolio URL — update once the site is live. */
  url: "https://nirmalkm.vercel.app",
};

export type SocialName = "GitHub" | "LinkedIn" | "X";

/** Add `{ name: "GitHub", href: "https://github.com/<you>", handle: "@<you>" }` here to show GitHub. */
export const socials: { name: SocialName; href: string; handle: string }[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nirmalkm2811", handle: "in/nirmalkm2811" },
];

/** Sections of the home page. Each renders as an editor tab in the navbar; `id` must match a section id. */
export const sections = [
  { id: "home", file: "index.tsx", label: "Home" },
  { id: "about", file: "about.md", label: "About" },
  { id: "stack", file: "stack.json", label: "Stack" },
  { id: "experience", file: "career.log", label: "Experience" },
  { id: "projects", file: "projects.ts", label: "Projects" },
  { id: "terminal", file: "shell.sh", label: "Terminal" },
  { id: "contact", file: "contact.tsx", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const about = {
  paragraphs: [
    "I'm a front-end developer from Coimbatore with 1+ year of professional experience building modern web applications with React.js, JavaScript (ES6+), HTML5 and CSS3.",
    "At Inngress Techsolutions-LLP I've shipped hospital and non-profit websites, a ticketing & attendance system and an ecommerce management platform — building reusable components, mobile-first layouts and REST API integrations with proper loading states and error handling.",
    "I'm passionate about clean, optimized code and front-end performance. I made the switch into development through a year-long, project-based MERN stack program — and I haven't looked back since.",
  ],
  facts: [
    { key: "location", value: "Coimbatore, Tamil Nadu" },
    { key: "focus", value: "React, Tailwind, REST APIs" },
    { key: "currently", value: "Frontend Dev @ Inngress Techsolutions-LLP" },
    { key: "degree", value: "Bachelor of IT · SRIT, 2022" },
  ],
  stats: [
    { label: "year building UIs", value: 1, suffix: "+" },
    { label: "production projects", value: 4, suffix: "" },
    { label: "UI components & dashboards", value: 35, suffix: "+" },
    { label: "faster page loads", value: 25, suffix: "%" },
  ],
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: { name: string; version: string; level: number }[];
};

/** `level` drives the progress bars — adjust to reflect your own confidence in each skill. */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "languages",
    skills: [
      { name: "html", version: "5", level: 92 },
      { name: "css", version: "3", level: 90 },
      { name: "javascript", version: "es6+", level: 85 },
      { name: "php", version: "wp-themes", level: 60 },
      { name: "sql", version: "postgres", level: 58 },
    ],
  },
  {
    id: "frontend",
    label: "frontend",
    skills: [
      { name: "react", version: "js", level: 85 },
      { name: "tailwindcss", version: "utility-first", level: 88 },
      { name: "bootstrap", version: "5", level: 85 },
      { name: "framer-motion", version: "animations", level: 72 },
      { name: "vite", version: "build", level: 80 },
    ],
  },
  {
    id: "backend",
    label: "cms-and-apis",
    skills: [
      { name: "wordpress", version: "custom-themes", level: 82 },
      { name: "acf", version: "dynamic-content", level: 85 },
      { name: "rest-api", version: "integration", level: 84 },
      { name: "razorpay", version: "payments", level: 70 },
      { name: "flask", version: "python", level: 55 },
      { name: "postgresql", version: "queries", level: 60 },
    ],
  },
  {
    id: "tooling",
    label: "tooling",
    skills: [
      { name: "git", version: "vcs", level: 82 },
      { name: "github", version: "collab", level: 80 },
      { name: "figma", version: "design-handoff", level: 70 },
      { name: "chrome-devtools", version: "debugging", level: 78 },
    ],
  },
];

export const marquee = [
  "React.js",
  "JavaScript ES6+",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Framer Motion",
  "Vite",
  "WordPress",
  "ACF",
  "REST APIs",
  "Razorpay",
  "PostgreSQL",
  "Python Flask",
  "Git",
  "GitHub",
  "Figma",
  "Responsive Design",
];

export type Experience = {
  hash: string;
  role: string;
  company: string;
  period: string;
  ref?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    hash: "a3f9c21",
    role: "Frontend Developer",
    company: "Inngress Techsolutions-LLP",
    period: "Dec 2024 — Present",
    ref: "HEAD -> main",
    summary:
      "Building client websites and internal web applications with React.js, Vite, Tailwind CSS and WordPress in Coimbatore.",
    highlights: [
      "Built the complete React frontend for a ticketing & attendance system, reducing page load time by ~25%.",
      "Delivered 20+ responsive components and dashboards for an ecommerce management platform (admin + customer).",
      "Developed a custom WordPress theme with 15+ ACF content sections and Razorpay donations for HeartLink India.",
      "Patched Python Flask APIs and PostgreSQL queries to support new frontend features.",
    ],
    stack: ["React.js", "Vite", "Tailwind CSS", "WordPress", "Flask", "PostgreSQL"],
  },
  {
    hash: "7be04d8",
    role: "MERN Stack Training",
    company: "Qtree Technologies",
    period: "Jul 2023 — Jul 2024",
    ref: "tag: career-switch",
    summary: "A year-long, project-based program covering the full MERN stack — where I moved into development.",
    highlights: ["Completed project-based training across MongoDB, Express, React and Node.js."],
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    hash: "1c58e9f",
    role: "AR Caller",
    company: "RND Softech Pvt Ltd",
    period: "May 2022 — May 2023",
    summary: "A process-driven, client-facing role that sharpened my communication and attention to detail.",
    highlights: [
      "Handled client communication and provided documentation support.",
      "Maintained data accuracy and compliance with organizational reporting standards.",
    ],
    stack: [],
  },
  {
    hash: "5d2a7b3",
    role: "Bachelor of Information Technology",
    company: "Sri Ramakrishna Institute of Technology (SRIT)",
    period: "Aug 2018 — Jun 2022",
    ref: "tag: graduated",
    summary: "Undergraduate degree in Information Technology — where the first `git init` happened.",
    highlights: ["Graduated with a CGPA of 7.35."],
    stack: [],
  },
  {
    hash: "2f81c0e",
    role: "Higher Secondary School",
    company: "CMS Vidya Mandir Matriculation Higher Secondary School",
    period: "May 2017 — Apr 2018",
    summary: "Completed higher secondary education.",
    highlights: ["Scored 81%."],
    stack: [],
  },
  {
    hash: "0000001",
    role: "Secondary School",
    company: "CMS Vidya Mandir Matriculation Higher Secondary School",
    period: "May 2015 — Apr 2016",
    ref: "initial commit",
    summary: "Completed secondary education.",
    highlights: ["Scored 92%."],
    stack: [],
  },
];

export type Project = {
  slug: string;
  title: string;
  file: string;
  description: string;
  category: "web-app" | "website";
  client: string;
  role: string;
  /** One measurable outcome, shown in the card footer. */
  impact: string;
  /** Shown on the project's detail page (/projects/<slug>). */
  responsibilities: string[];
  stack: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
  snippet: string;
};

export const projects: Project[] = [
  {
    slug: "ticketing-attendance",
    title: "Ticketing & Attendance System",
    file: "ticketing/src/Dashboard.jsx",
    description:
      "Complete frontend for an internal ticketing and attendance platform — customers, contracts, categories, SLA management, attendance tracking and user administration.",
    category: "web-app",
    client: "In-house",
    role: "Frontend Developer",
    impact: "~25% faster page loads",
    responsibilities: [
      "Developed the complete frontend of a ticketing and attendance management system using React.js and Vite, improving UI responsiveness and reducing page load time by approximately 25%.",
      "Built 15+ responsive UI components and dashboards for modules including Customers, Contracts, Categories, SLA management, Attendance tracking and User administration.",
      "Integrated frontend components with backend REST APIs to enable ticket creation, status tracking, attendance logging and report generation.",
      "Patched and enhanced existing Python Flask APIs and PostgreSQL queries to support new frontend features and improve system functionality.",
    ],
    stack: ["React.js", "Vite", "Bootstrap", "Flask", "PostgreSQL"],
    featured: true,
    snippet: `const { data, loading, error } = useFetch(
  "/api/tickets?status=open&sla=breached"
);
if (error) return <ErrorState retry={refetch} />;`,
  },
  {
    slug: "ecommerce-management",
    title: "Ecommerce Management System",
    file: "arogya/src/Orders.jsx",
    description:
      "Admin and customer-facing interfaces for vendors, product categories, materials, inventory and order management, backed by Flask REST APIs.",
    category: "web-app",
    client: "Arogya",
    role: "Frontend Developer",
    impact: "20+ components & dashboards",
    responsibilities: [
      "Developed the frontend for an ecommerce management system using React.js and Vite, supporting both admin and customer-facing interfaces.",
      "Built 20+ responsive UI components and dashboards for modules including Customer, Vendor, Product Category, Material, Inventory and Order Management.",
      "Integrated the React frontend with Python Flask REST APIs and a PostgreSQL database for product data retrieval, inventory tracking and order processing.",
      "Implemented role-based features including admin management dashboards and customer-facing pages for product browsing and order interactions.",
    ],
    stack: ["React.js", "Vite", "Bootstrap", "Flask", "PostgreSQL"],
    featured: true,
    snippet: `await api.post("/orders", {
  customerId,
  items: cart.map(toLineItem),
});`,
  },
  {
    slug: "kerala-ayurveda",
    title: "Kerala Ayurveda Hospital",
    file: "kerala-ayurveda/src/App.jsx",
    description:
      "A modern, mobile-first hospital website presenting services, treatments and contact information with reusable Tailwind components and smooth motion.",
    category: "website",
    client: "Kerala Ayurveda Hospital",
    role: "Frontend Developer",
    impact: "Mobile-first, all devices",
    responsibilities: [
      "Developed a React.js-based hospital website delivering a modern and responsive user interface.",
      "Created reusable UI components using Tailwind CSS to maintain consistent design across pages.",
      "Applied mobile-first responsive design to ensure compatibility across mobile, tablet and desktop devices.",
      "Structured dynamic content sections to present hospital services, treatments and contact information effectively.",
      "Optimized page performance and navigation using React component architecture and Vite build tooling.",
    ],
    stack: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    snippet: `<motion.section
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
/>`,
  },
  {
    slug: "heartlink-india",
    title: "HeartLink India",
    file: "heartlink/functions.php",
    description:
      "Custom, performance-optimized WordPress theme for a non-profit, with admin-editable ACF sections and secure online donations via Razorpay.",
    category: "website",
    client: "HeartLink India",
    role: "WordPress Developer",
    impact: "15+ ACF content sections",
    responsibilities: [
      "Developed a custom WordPress theme to build a responsive and performance-optimized website for HeartLink India.",
      "Implemented 15+ dynamic content sections using Advanced Custom Fields (ACF), enabling administrators to easily manage website content.",
      "Integrated the Razorpay payment gateway to support secure online donations and digital payment processing.",
    ],
    stack: ["WordPress", "ACF", "PHP", "Razorpay", "CSS"],
    snippet: `$order = $api->order->create([
  'amount'   => $donation * 100,
  'currency' => 'INR',
]);`,
  },
];

/** The hero IDE types `typed`, then offers `suggestion` as AI ghost text and accepts it. */
export const heroCode = {
  file: "developer.js",
  path: ["src", "core"],
  typed: `const developer = {
  name: "${profile.name}",
  role: "${profile.role}",
  stack: ["React", "Tailwind", "JavaScript"],
  based: "Coimbatore, IN",
  available: ${profile.available},
};

// turns designs into responsive interfaces
function build(design) {
  `,
  suggestion: `return ship(responsive(design));
}`,
  pullRequest: { number: 128 },
};
