import { Heart, Sparkle, Star } from 'lucide-react'
import { useMemo } from 'react'

const ICONS = [Heart, Sparkle, Star]

function seeded(index) {
  const x = Math.sin(index * 999) * 10000
  return x - Math.floor(x)
}

export default function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const Icon = ICONS[i % ICONS.length]
        return {
          id: i,
          Icon,
          left: `${seeded(i + 1) * 100}%`,
          delay: `${seeded(i + 7) * 12}s`,
          duration: `${14 + seeded(i + 13) * 12}s`,
          size: 10 + Math.floor(seeded(i + 19) * 10),
          opacity: 0.18 + seeded(i + 23) * 0.4,
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="orb -left-24 top-10 h-72 w-72 bg-violet-600/30 animate-glow-pulse" />
      <div className="orb right-[-80px] top-32 h-80 w-80 bg-fuchsia-500/20 animate-glow-pulse [animation-delay:1.2s]" />
      <div className="orb bottom-[-60px] left-1/3 h-64 w-64 bg-sky-500/15 animate-glow-pulse [animation-delay:2s]" />
      <div className="orb bottom-20 right-1/4 h-52 w-52 bg-gold-400/10 animate-glow-pulse [animation-delay:0.6s]" />

      {particles.map(({ id, Icon, left, delay, duration, size, opacity }) => (
        <span
          key={id}
          className="absolute bottom-[-24px] text-gold-100"
          style={{
            left,
            animation: `drift ${duration} linear infinite`,
            animationDelay: delay,
            opacity,
          }}
        >
          <Icon size={size} strokeWidth={1.4} fill="currentColor" />
        </span>
      ))}
    </div>
  )
}
