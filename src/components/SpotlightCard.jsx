import { cn } from '@/lib/utils'

/** A card with a purple glow that follows the pointer. */
export default function SpotlightCard({ className, children, ...props }) {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35',
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
