import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useLenis } from 'lenis/react'

export const NAV_OFFSET = -88

export function scrollToSection(lenis, id, { immediate = false } = {}) {
  const el = id === 'top' ? null : document.getElementById(id)
  if (id !== 'top' && !el) return

  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: el ? NAV_OFFSET : 0, immediate, duration: 1.2 })
  } else if (el) {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}

/**
 * Returns a function that smooth-scrolls to a home-page section.
 * From any other route it navigates home first; ScrollManager finishes the scroll.
 */
export function useSectionNav() {
  const lenis = useLenis()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id) => {
      if (pathname === '/') {
        scrollToSection(lenis, id)
      } else {
        navigate('/', { state: { section: id } })
      }
    },
    [lenis, navigate, pathname]
  )
}
