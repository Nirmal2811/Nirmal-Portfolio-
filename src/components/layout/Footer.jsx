import { Link } from 'react-router'

import Logo from '@/components/layout/Logo'
import SocialLinks from '@/components/SocialLinks'
import { navLinks, profile } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border">
      <div aria-hidden className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.tagline}</p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/80 transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">Connect</p>
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
          <p className="font-mono">Built with React, Tailwind &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
