import { useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight, Headphones } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { showreel } from '@/data/portfolio'
import { useBootReady } from '@/hooks/useBootReady'
import { useSequenceCanvas } from '@/hooks/useSequenceCanvas'

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`

/** Music-player style readout driven by scroll progress (kept separate so only it re-renders). */
function Player({ progress, loaded, count }) {
  const [seconds, setSeconds] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setSeconds(Math.round(p * showreel.duration)))
  const buffering = loaded < count

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-800 text-white">
          <Headphones className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm">{showreel.track}</p>
          <p className="truncate text-xs text-muted-foreground">{showreel.artist}</p>
        </div>
        {/* Equalizer */}
        <span aria-hidden className="flex h-5 items-end gap-[3px]">
          {[0, 0.2, 0.45, 0.1].map((delay) => (
            <span key={delay} className="animate-eq h-full w-[3px] origin-bottom rounded-full bg-primary" style={{ animationDelay: `${delay}s` }} />
          ))}
        </span>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-foreground/10">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-400" />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
        <span>{formatTime(seconds)}</span>
        {buffering ? <span className="text-brand">buffering {Math.round((loaded / count) * 100)}%</span> : null}
        <span>{formatTime(showreel.duration)}</span>
      </div>
    </div>
  )
}

export default function Showreel() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const bootReady = useBootReady()
  // Start downloading frames once the page has loaded and the section is within a screen or so.
  const near = useInView(sectionRef, { once: true, margin: '100% 0px 100% 0px' })

  // 0 → 1 while the section is pinned, and 0 → 1 while it scrolls into view.
  const { scrollYProgress: progress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const { scrollYProgress: enter } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] })

  const { canvasRef, count, loaded } = useSequenceCanvas({ name: 'showreel', progress, enabled: bootReady && near })

  const [step, setStep] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => {
    setStep(Math.min(showreel.steps.length - 1, Math.floor(p * showreel.steps.length)))
  })

  // --- 3D motion: tilts back as it arrives, then slowly turns while pinned ---
  const rotateX = useTransform(enter, [0, 1], reduceMotion ? [0, 0] : [30, 0])
  const rotateY = useTransform([enter, progress], ([e, p]) => (reduceMotion ? 0 : -24 + e * 16 + p * 16))
  const scale = useTransform(enter, [0, 1], reduceMotion ? [1, 1] : [0.8, 1])
  const glow = useTransform(progress, [0, 0.5, 1], [0.55, 0.9, 0.55])

  const current = showreel.steps[step]

  return (
    <section id="showreel" ref={sectionRef} aria-label="Showreel" className="relative h-[300vh] md:h-[340vh]">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[140px] lg:left-[68%]"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 pt-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-20 lg:pt-0">
          {/* 3D card with the image sequence */}
          <div className="flex justify-center lg:order-2" style={{ perspective: 1400 }}>
            <motion.div
              style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
              className="relative aspect-[9/16] h-[50dvh] sm:h-[58dvh] lg:h-[74dvh] lg:max-h-[760px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-[#6a4ea2] to-[#180c20] shadow-[0_40px_120px_-30px_rgb(88_28_135/0.9)]">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="A developer in purple headphones nodding along to music"
                  className="size-full"
                />
                {/* Glass sheen + bottom fade for depth */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating chips at different depths, so they drift as the card turns */}
              <motion.span
                style={{ z: 70 }}
                className="dark absolute top-[12%] -left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-background/80 px-3 py-2 font-mono text-xs shadow-xl backdrop-blur-md sm:-left-10"
              >
                <span className="text-fuchsia-400">♪</span> lo-fi.beats
              </motion.span>
              <motion.span
                style={{ z: 110 }}
                className="dark absolute top-[46%] -right-6 rounded-xl border border-white/10 bg-background/80 px-3 py-2 font-mono text-xs shadow-xl backdrop-blur-md sm:-right-12"
              >
                <span className="text-sky-300">focus</span>: <span className="text-emerald-300">100%</span>
              </motion.span>
              <motion.span
                style={{ z: 50 }}
                className="dark absolute bottom-[10%] -left-4 rounded-xl border border-white/10 bg-background/80 px-3 py-2 font-mono text-xs text-violet-200 shadow-xl backdrop-blur-md sm:-left-8"
              >
                BPM 92 · in the zone
              </motion.span>
            </motion.div>
          </div>

          {/* Captions that change as you scroll */}
          <div className="text-center lg:order-1 lg:text-left">
            <div className="mb-4 flex justify-center gap-1.5 lg:justify-start" aria-hidden>
              {showreel.steps.map((s, i) => (
                <span key={s.title} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-primary' : 'w-3 bg-foreground/15'}`} />
              ))}
            </div>
            <div className="min-h-[9.5rem] sm:min-h-[11rem] lg:min-h-[15rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
                    <span className="text-emerald-600 dark:text-emerald-400">▶</span> {current.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl lg:text-6xl">
                    <span className="text-gradient">{current.title}</span>
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground sm:text-lg lg:mx-0">{current.text}</p>
                  {current.cta && (
                    <Button asChild size="lg" className="group mt-6 hidden sm:inline-flex">
                      <Link to={current.cta.to}>
                        {current.cta.label}
                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden max-w-md lg:block">
              <Player progress={progress} loaded={loaded} count={count} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
