import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

const palette = ['#c4b5fd', '#f0abfc', '#fde68a', '#fda4af', '#a5b4fc', '#f8e7c9', '#67e8f9']

export function useConfetti() {
  const fireworksRef = useRef(null)

  const burst = useCallback((origin = { x: 0.5, y: 0.38 }) => {
    confetti({
      particleCount: 90,
      spread: 76,
      startVelocity: 42,
      origin,
      colors: palette,
      ticks: 220,
      gravity: 0.9,
      scalar: 0.95,
    })
    confetti({
      particleCount: 40,
      spread: 110,
      startVelocity: 28,
      origin,
      colors: palette,
      shapes: ['circle'],
      scalar: 0.7,
    })
  }, [])

  const candleBurst = useCallback((clientX, clientY) => {
    const x = clientX / window.innerWidth
    const y = clientY / window.innerHeight
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { x, y },
      colors: palette,
      startVelocity: 34,
    })
  }, [])

  const fireworks = useCallback((duration = 4200) => {
    if (fireworksRef.current) {
      window.clearInterval(fireworksRef.current)
    }

    const end = Date.now() + duration
    fireworksRef.current = window.setInterval(() => {
      if (Date.now() > end) {
        window.clearInterval(fireworksRef.current)
        fireworksRef.current = null
        return
      }

      confetti({
        particleCount: 4,
        angle: 60,
        spread: 58,
        origin: { x: 0, y: 0.7 },
        colors: palette,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 58,
        origin: { x: 1, y: 0.7 },
        colors: palette,
      })
      confetti({
        particleCount: 3,
        spread: 360,
        startVelocity: 18,
        origin: { x: Math.random(), y: Math.random() * 0.35 },
        colors: palette,
        scalar: 0.8,
      })
    }, 220)
  }, [])

  const stopFireworks = useCallback(() => {
    if (fireworksRef.current) {
      window.clearInterval(fireworksRef.current)
      fireworksRef.current = null
    }
  }, [])

  return { burst, candleBurst, fireworks, stopFireworks }
}
