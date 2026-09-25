import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'

/** Starts every page at the top when the route changes. */
export default function ScrollManager() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
