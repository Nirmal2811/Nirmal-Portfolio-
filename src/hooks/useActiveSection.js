import { useEffect, useState } from 'react'

/** Tracks which section id is currently in the middle band of the viewport. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
