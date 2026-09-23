import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'

import { scrollToSection } from '@/hooks/useSectionNav'

/** Resets scroll on route change, or scrolls to a section requested via router state. */
export default function ScrollManager() {
  const { pathname, state } = useLocation()
  const lenis = useLenis()
  const section = state?.section

  useLayoutEffect(() => {
    if (!section) {
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true, force: true })
      return
    }

    // Let the new page lay out before measuring the target section.
    const timer = setTimeout(() => {
      lenis?.resize()
      scrollToSection(lenis, section)
    }, 80)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, section])

  return null
}
