import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const candles = [
  { id: 0, left: '32%' },
  { id: 1, left: '42%' },
  { id: 2, left: '50%' },
  { id: 3, left: '58%' },
  { id: 4, left: '68%' },
]

export default function BirthdayCake({ onCandleClick }) {
  const [lit, setLit] = useState(() => candles.map(() => true))
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleFlame = (event, index) => {
    event.stopPropagation()
    const next = [...lit]
    next[index] = !next[index]
    setLit(next)
    onCandleClick?.(event)
  }

  const relightAll = () => {
    setLit(candles.map(() => true))
  }

  return (
    <div className="relative mx-auto w-full max-w-xs">
      <motion.div
        className="cake-scene cursor-pointer"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const px = (event.clientX - rect.left) / rect.width - 0.5
          const py = (event.clientY - rect.top) / rect.height - 0.5
          setTilt({ x: py * -8, y: px * 10 })
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={(event) => {
          onCandleClick?.(event)
          relightAll()
        }}
        role="img"
        aria-label="Interactive birthday cake. Click a candle to celebrate."
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
        <div className="cake-plate" />
        <div className="cake-layer cake-bottom" />
        <div className="cake-layer cake-middle" />
        <div className="cake-layer cake-top">
          <span className="cake-drip absolute left-[18%] bg-violet-200" />
          <span className="cake-drip absolute left-[46%] h-12 bg-fuchsia-100" />
          <span className="cake-drip absolute left-[72%] bg-violet-200" />
        </div>

        {candles.map((candle) => (
          <button
            key={candle.id}
            type="button"
            className="candle"
            style={{ left: candle.left, marginLeft: '-3.5px' }}
            onClick={(event) => handleFlame(event, candle.id)}
            aria-label={lit[candle.id] ? 'Blow out candle' : 'Relight candle'}
          >
            <span className={`candle-flame ${lit[candle.id] ? '' : 'out'}`} />
          </button>
        ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lit.every((value) => !value) ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-center text-[11px] tracking-[0.2em] text-gold-300/80 uppercase"
          >
            Wish granted · tap cake to relight
          </motion.p>
        ) : (
          <p className="mt-1 text-center text-[11px] tracking-[0.18em] text-slate-400/80 uppercase">
            Tap a flame for confetti
          </p>
        )}
      </AnimatePresence>
    </div>
  )
}
