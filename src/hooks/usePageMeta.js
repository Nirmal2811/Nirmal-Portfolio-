import { useEffect } from 'react'

import { profile } from '@/data/portfolio'

/**
 * Sets the document title for a page, and tells the boot loader in index.html
 * that the first page has rendered (so a refresh on a lazily loaded page keeps
 * the loader up until that page is actually on screen).
 */
export function usePageMeta(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`
    window.__bootDone?.()
  }, [title])
}
