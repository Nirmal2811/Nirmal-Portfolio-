import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import Logo from '@/components/layout/Logo'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/data/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useSectionNav } from '@/hooks/useSectionNav'
import { cn } from '@/lib/utils'

const sectionIds = navLinks.map((l) => l.id)

export default function Navbar() {
  const { pathname } = useLocation()
  const goTo = useSectionNav()
  const isHome = pathname === '/'
  const activeSection = useActiveSection(sectionIds, isHome)
  const active = isHome ? activeSection : pathname.startsWith('/projects') ? 'work' : null

  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))
  useEffect(() => setOpen(false), [pathname])

  const handleNav = (id) => {
    setOpen(false)
    goTo(id)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4',
          scrolled || open
            ? 'border-white/10 bg-background/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <Logo onClick={() => setOpen(false)} />

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNav(link.id)}
                className={cn(
                  'relative isolate cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors',
                  active === link.id ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => handleNav('contact')}>
            Let&apos;s talk
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-background/90 p-2 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <button
                    type="button"
                    onClick={() => handleNav(link.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-base transition-colors hover:bg-accent',
                      active === link.id ? 'text-white' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                    {active === link.id && <span className="size-1.5 rounded-full bg-primary" />}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
