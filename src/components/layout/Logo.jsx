import { Link } from 'react-router'

import { profile } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export default function Logo({ className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${profile.name} — home`}
      className={cn('group flex items-center gap-2.5 font-display text-lg font-semibold', className)}
    >
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-purple-700 text-white shadow-[0_0_24px_-4px_rgb(168_85_247/0.8)] transition-transform duration-300 group-hover:rotate-[-8deg]">
        {profile.name.charAt(0)}
      </span>
      <span className="tracking-tight">
        {profile.name.toLowerCase()}
        <span className="text-primary">.dev</span>
      </span>
    </Link>
  )
}
