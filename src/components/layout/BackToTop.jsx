import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ArrowUp } from 'lucide-react'

import { scrollToSection } from '@/hooks/useSectionNav'

/** Back-to-top control styled as a tiny terminal running `cd /top`. */
export default function BackToTop() {
  const lenis = useLenis()
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  const [percent, setPercent] = useState(0)
  const [running, setRunning] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const show = y > 900
    setVisible(show)
    if (!show) setRunning(false)
  })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setPercent(Math.round(p * 100)))

  const handleClick = () => {
    setRunning(true)
    scrollToSection(lenis, 'top')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="group fixed right-4 bottom-4 z-40 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0b0913]/90 text-left font-mono shadow-[0_12px_40px_-12px_rgb(139_92_246/0.7)] backdrop-blur-md transition-colors hover:border-primary/50 sm:right-6 sm:bottom-6 sm:w-52"
        >
          {/* Title bar */}
          <span
            aria-hidden
            className="hidden items-center gap-1.5 border-b border-white/[0.06] px-3 py-1.5 sm:flex"
          >
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="ml-2 text-[10px] text-muted-foreground">scroll.sh</span>
            <span className="ml-auto text-[10px] text-violet-300 tabular-nums">{percent}%</span>
          </span>

          {/* Prompt line */}
          <span aria-hidden className="flex items-center gap-1.5 px-3 py-2.5 text-xs">
            <span className="text-emerald-400">~</span>
            <span className="text-fuchsia-400">$</span>
            <span className="text-foreground/90">{running ? 'scrolling…' : 'cd /top'}</span>
            <span className="h-3.5 w-1.5 animate-pulse bg-primary" />
            <span className="ml-auto grid size-5 place-items-center rounded border border-white/15 bg-white/[0.04] text-violet-200 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white max-sm:ml-2">
              <ArrowUp className="size-3 transition-transform group-hover:-translate-y-px" />
            </span>
          </span>

          {/* Scroll progress */}
          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-400"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
