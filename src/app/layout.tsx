import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";

import { BootScreen } from "@/components/boot-screen";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers/providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StatusBar } from "@/components/status-bar";
import { profile } from "@/lib/data";

import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "front-end developer",
    "React.js developer",
    "WordPress developer",
    "Tailwind CSS",
    "Coimbatore",
    "portfolio",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.url }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url: profile.url,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[200] -translate-y-20 rounded-md bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <BootScreen />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <ScrollToTop />
          <StatusBar />
        </Providers>
      </body>
    </html>
  );
}
