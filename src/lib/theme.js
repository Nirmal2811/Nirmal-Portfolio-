import { useSyncExternalStore } from 'react'

// The initial theme is applied by an inline script in index.html (before first paint).
// This module keeps React in sync and persists the visitor's choice.

const STORAGE_KEY = 'theme'
const THEME_COLORS = { dark: '#07060b', light: '#f7f5fc' }
const listeners = new Set()

export function getTheme() {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function setTheme(theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  listeners.forEach((notify) => notify())
}

function subscribe(notify) {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark')
}
