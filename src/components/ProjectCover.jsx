import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

/** Generated artwork used in place of a screenshot. Swap for an <img> once you have real shots. */
export default function ProjectCover({ project, className, large = false }) {
  const Icon = getIcon(project.icon)

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-gradient-to-br from-violet-950 via-[#120b22] to-black',
        className
      )}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70 mask-fade-y" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-3xl transition-transform duration-700 group-hover:scale-125"
      />
      <div
        aria-hidden
        className="absolute -right-10 -bottom-10 size-40 rounded-full bg-fuchsia-500/20 blur-2xl"
      />
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={cn(
            'grid place-items-center rounded-2xl border border-white/15 bg-white/[0.06] text-violet-100 shadow-[0_0_60px_-10px_rgb(168_85_247/0.9)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]',
            large ? 'size-24' : 'size-16'
          )}
        >
          <Icon className={large ? 'size-11' : 'size-7'} strokeWidth={1.5} />
        </div>
      </div>
      <span className="absolute top-4 left-4 font-mono text-[11px] tracking-widest text-violet-200/70 uppercase">
        {project.category}
      </span>
      <span className="absolute top-4 right-4 font-mono text-[11px] text-violet-200/70">{project.year}</span>
    </div>
  )
}
