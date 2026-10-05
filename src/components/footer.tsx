"use client";

import { ArrowUp } from "lucide-react";

import { brandIcons } from "@/components/brand-icons";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { profile, socials } from "@/lib/data";

export function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t md:pb-7">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 font-mono text-xs text-muted-foreground">
          <p>
            <span className="text-syntax-comment">{"/* "}</span>© {year} {profile.name}
            <span className="text-syntax-comment">{" */"}</span>
          </p>
          {/* <p>
            Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion —{" "}
            <span className="text-foreground">and way too much coffee.</span>
          </p> */}
        </div>
        <div className="flex items-center gap-1">
          {socials.map((s) => {
            const Icon = brandIcons[s.name];
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
          {/* <button
            onClick={() => scrollTo("home")}
            className="group ml-2 flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            cd ~
          </button> */}
        </div>
      </div>
    </footer>
  );
}
