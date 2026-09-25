import Reveal from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export default function SectionHeading({ index, eyebrow, title, description, align = 'left', className }) {
  return (
    <div className={cn('mb-12 max-w-2xl md:mb-16', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-brand uppercase',
            align === 'center' && 'justify-center'
          )}
        >
          {index && <span className="text-primary">{index}</span>}
          <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-semibold text-balance sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
