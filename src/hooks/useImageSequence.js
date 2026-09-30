import { useEffect, useRef, useState } from 'react'

/**
 * Order to fetch frames in: first frame, then every 16th, 8th, 4th, 2nd, then the rest.
 * Scrubbing works almost immediately at low "frame rate" and gets smoother as more arrive.
 */
function loadOrder(count) {
  const order = []
  const seen = new Set()
  for (const stride of [count, 16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
    }
  }
  return order
}

/**
 * Loads an image sequence (`urlFor(i)` for i = 0..count-1) once `enabled` is true.
 * Returns a ref to the array of loaded images (null until loaded), the number loaded,
 * and subscribes `onFrame(index)` to each frame as it finishes decoding.
 */
export function useImageSequence({ count, urlFor, enabled, concurrency = 6, onFrame }) {
  const framesRef = useRef([])
  const onFrameRef = useRef(onFrame)
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    onFrameRef.current = onFrame
  }, [onFrame])

  useEffect(() => {
    if (!enabled || !count) return
    let cancelled = false
    framesRef.current = new Array(count).fill(null)
    const queue = loadOrder(count)
    let done = 0

    const next = () => {
      if (cancelled || queue.length === 0) return
      const index = queue.shift()
      const img = new Image()
      img.decoding = 'async'
      img.src = urlFor(index)
      img
        .decode()
        .then(() => {
          if (cancelled) return
          framesRef.current[index] = img
          done += 1
          // Batch state updates; the canvas is redrawn through onFrame, not React.
          if (done % 8 === 0 || done === count) setLoaded(done)
          onFrameRef.current?.(index)
        })
        .catch(() => {})
        .finally(next)
    }

    for (let i = 0; i < concurrency; i++) next()
    return () => {
      cancelled = true
    }
  }, [enabled, count, urlFor, concurrency])

  return { framesRef, loaded }
}
