import { useEffect, useState } from 'react'

/**
 * Types each word out, holds it, deletes it, then moves to the next — forever.
 * Returns the text to show right now. Does nothing until `enabled` is true.
 */
export function useTypewriter(words, { enabled = true, typeMs = 70, deleteMs = 35, holdMs = 1900, gapMs = 350 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const word = words[index]
    let delay
    let step

    if (!deleting && text === word) {
      delay = holdMs
      step = () => setDeleting(true)
    } else if (!deleting) {
      delay = typeMs
      step = () => setText(word.slice(0, text.length + 1))
    } else if (text === '') {
      delay = gapMs
      step = () => {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }
    } else {
      delay = deleteMs
      step = () => setText(text.slice(0, -1))
    }

    const timer = setTimeout(step, delay)
    return () => clearTimeout(timer)
  }, [enabled, words, index, text, deleting, typeMs, deleteMs, holdMs, gapMs])

  return text
}
