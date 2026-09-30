import { useScroll } from 'framer-motion'

import { useBootReady } from '@/hooks/useBootReady'
import { useSequenceCanvas } from '@/hooks/useSequenceCanvas'
import { cn } from '@/lib/utils'

/**
 * Full-screen video background for the home page, scrubbed by page scroll:
 * the top of the page shows the first frame, the bottom shows the last.
 * Frames come from public/sequence/backdrop (see scripts/make-sequence.py).
 */
export default function HomeBackdrop() {
  const { scrollYProgress } = useScroll()
  const bootReady = useBootReady()
  const { canvasRef, hasFrame } = useSequenceCanvas({ name: 'backdrop', progress: scrollYProgress, enabled: bootReady })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className={cn('size-full transition-opacity duration-1000', hasFrame ? 'opacity-100' : 'opacity-0')}
      />
      {/* Readability overlays: an even wash, extra weight behind the left-aligned text, and edge vignettes */}
      {/* Phones get a stronger wash: text spans the full width there, right across the face */}
      <div className="absolute inset-0 bg-background/70 md:bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-background/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] opacity-80" />
    </div>
  )
}
