import { Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/BrandIcons'
import { profile } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const items = [
  { label: 'GitHub', href: profile.socials.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: 'X (Twitter)', href: profile.socials.x, Icon: XIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
]

export default function SocialLinks({ className }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/15 hover:text-violet-200"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
