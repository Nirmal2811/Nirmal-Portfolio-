import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, Sparkles } from 'lucide-react'

import SocialLinks from '@/components/SocialLinks'
import { easeOut } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/portfolio'
import { useSectionNav } from '@/hooks/useSectionNav'

const headline = [
  { text: 'I build' },
  { text: 'digital experiences', accent: true },
  { text: 'that feel effortless.' },
]

function AnimatedHeadline() {
  let wordIndex = 0

  return (
    <h1 className="text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.25rem]">
      {headline.map((line) => (
        <span key={line.text}>
          {line.text.split(' ').map((word) => {
            const i = wordIndex++
            return (
              <span key={word + i} className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  className={`inline-block ${line.accent ? 'text-gradient' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: easeOut }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

function CodeWindow() {
  const lines = [
    [['k', 'const '], ['v', 'developer'], ['p', ' = {']],
    [['key', '  name'], ['p', ': '], ['s', `'${profile.fullName}'`], ['p', ',']],
    [['key', '  role'], ['p', ': '], ['s', `'${profile.role}'`], ['p', ',']],
    [['key', '  stack'], ['p', ': ['], ['s', "'React'"], ['p', ', '], ['s', "'Node'"], ['p', ', '], ['s', "'SQL'"], ['p', '],']],
    [['key', '  loves'], ['p', ': '], ['s', "'clean, fast UIs'"], ['p', ',']],
    [['key', '  available'], ['p', ': '], ['k', String(profile.available)], ['p', ',']],
    [['p', '}']],
    [],
    [['k', 'export default '], ['v', 'developer']],
  ]

  const color = {
    k: 'text-fuchsia-400',
    v: 'text-violet-300',
    key: 'text-sky-300',
    s: 'text-emerald-300',
    p: 'text-foreground/70',
  }

  return (
    <div className="relative w-full max-w-md">
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-600/40 via-purple-700/20 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0913]/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]/90" />
          <span className="size-3 rounded-full bg-[#febc2e]/90" />
          <span className="size-3 rounded-full bg-[#28c840]/90" />
          <span className="ml-3 rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            developer.js
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
          {lines.map((tokens, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
              className="flex"
            >
              <span className="mr-5 w-4 text-right text-muted-foreground/40 select-none">{i + 1}</span>
              <code>
                {tokens.map(([type, text], j) => (
                  <span key={j} className={color[type]}>
                    {text}
                  </span>
                ))}
                {i === lines.length - 1 && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary" />
                )}
              </code>
            </motion.div>
          ))}
        </pre>
      </div>

      <motion.div
        className="absolute -top-5 -right-3 rounded-xl border border-white/10 bg-background/80 px-3 py-2 font-mono text-xs text-violet-200 shadow-xl backdrop-blur-md sm:-right-6"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⚡ 60fps
      </motion.div>
      <motion.div
        className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-xl border border-white/10 bg-background/80 px-3 py-2 text-xs shadow-xl backdrop-blur-md sm:-left-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="size-2 rounded-full bg-emerald-400" />
        Lighthouse 100
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const goTo = useSectionNav()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section ref={ref} id="top" className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16">
      {/* Background */}
      <motion.div aria-hidden style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 mask-fade-y" />
        <div className="animate-pulse-slow absolute top-[12%] left-[8%] size-72 rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="animate-pulse-slow absolute right-[6%] bottom-[10%] size-96 rounded-full bg-purple-700/25 blur-[120px] [animation-delay:2s]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 py-1 pr-4 pl-1.5 text-sm text-violet-200"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-primary/25 px-2.5 py-0.5 text-xs font-medium text-white">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-300 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-violet-200" />
              </span>
              {profile.available ? 'Available' : 'Busy'}
            </span>
            Hi, I&apos;m {profile.name}
            <span className="-ml-1 hidden sm:inline">— {profile.role}</span>
          </motion.div>

          <AnimatedHeadline />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: easeOut }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="group" onClick={() => goTo('work')}>
              <Sparkles />
              View my work
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.resumeUrl} download>
                <Download />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <dl className="flex gap-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-white">{s.value}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
            <span className="hidden h-10 w-px bg-white/10 sm:block" />
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="hidden justify-center lg:flex"
        >
          <CodeWindow />
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => goTo('about')}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-violet-200 md:flex"
      >
        <span className="font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown className="size-4" />
      </motion.button>
    </section>
  )
}
