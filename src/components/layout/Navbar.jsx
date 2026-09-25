import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import Logo from '@/components/layout/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/data/portfolio'
import { useBootReady } from '@/hooks/useBootReady'
import { cn } from '@/lib/utils'

const isActive = (pathname, to) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`))

export default function Navbar() {
  const { pathname } = useLocation()
  const bootReady = useBootReady()

  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))
  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={bootReady ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      {/* Fades scrolled content out behind the floating bar, so nothing peeks through the gap around it */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-background from-40% via-background/80 to-transparent transition-opacity duration-500',
          scrolled || open ? 'opacity-100' : 'opacity-0'
        )}
      />
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4',
          scrolled || open
            ? 'border-border bg-card/85 shadow-[0_8px_40px_-12px_var(--nav-shadow)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <Logo onClick={() => setOpen(false)} />

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-foreground/[0.02] p-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.to)
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative isolate block rounded-full px-4 py-1.5 text-sm transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/contact">Let&apos;s talk</Link>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="lg:hidden"
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
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-border bg-background/90 p-2 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.to)
                return (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-base transition-colors hover:bg-accent',
                        active ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                      {active && <span className="size-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
