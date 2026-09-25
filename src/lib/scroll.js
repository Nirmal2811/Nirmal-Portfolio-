export const NAV_OFFSET = -88

/** Smooth-scrolls to an element id on the current page ('top' scrolls to the top). */
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
