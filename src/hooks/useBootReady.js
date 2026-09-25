import { useSyncExternalStore } from 'react'

// The terminal boot loader in index.html sets window.__booted and fires 'boot:done'
// when it fades out. Entrance animations wait for this so they aren't hidden behind it.
const subscribe = (onChange) => {
  window.addEventListener('boot:done', onChange)
  return () => window.removeEventListener('boot:done', onChange)
}

export function useBootReady() {
  return useSyncExternalStore(
    subscribe,
    () => window.__booted !== false,
    () => true
  )
}
