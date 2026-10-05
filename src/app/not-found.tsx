import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WindowChrome } from "@/components/window-chrome";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div aria-hidden="true" className="absolute inset-0 bg-dots mask-radial" />
      <WindowChrome title="zsh — 404" className="relative w-full max-w-xl" bodyClassName="p-6 font-mono text-sm">
        <p>
          <span className="text-primary">{profile.handle}@portfolio</span>:<span className="text-cyan">~</span>$ cd
          ./this-page
        </p>
        <p className="mt-1 text-destructive">cd: no such file or directory: ./this-page</p>
        <p className="mt-4 text-6xl font-bold tracking-tighter">
          404<span className="animate-blink text-primary">_</span>
        </p>
        <p className="mt-3 text-muted-foreground">
          <span className="text-syntax-comment">{"// "}</span>
          The page you&apos;re looking for was never committed — or got lost in a rebase.
        </p>
        <Button asChild className="mt-6 font-mono">
          <Link href="/">cd ~</Link>
        </Button>
      </WindowChrome>
    </section>
  );
}
