import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Sparkle } from 'lucide-react'
import { useEffect, useState } from 'react'
import EnvelopeOverlay, { LetterModal } from './components/Envelope'
import Header from './components/Header'
import LockScreen from './components/LockScreen'
import MemoriesGallery from './components/MemoriesGallery'
import ParticleField from './components/ParticleField'
import WishSection from './components/WishSection'
import { useAmbientAudio } from './hooks/useAmbientAudio'
import { useConfetti } from './hooks/useConfetti'

const tabs = [
  { id: 'wish', label: 'The Wish' },
  { id: 'memories', label: 'Memories' },
]

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [tab, setTab] = useState('wish')
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [showLetter, setShowLetter] = useState(false)
  const { burst, candleBurst, fireworks } = useConfetti()
  const { isPlaying, toggle } = useAmbientAudio()

  useEffect(() => {
    if (!unlocked) return
    const timer = window.setTimeout(() => burst(), 600)
    return () => window.clearTimeout(timer)
  }, [burst, unlocked])

  const openFromEnvelope = () => {
    setShowEnvelope(false)
    setShowLetter(true)
    burst({ x: 0.5, y: 0.55 })
    if (!isPlaying) toggle()
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleField />

      <Header
        isPlaying={isPlaying}
        onToggleMusic={toggle}
        onOpenLetter={() => setShowLetter(true)}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-16 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass-panel relative w-full overflow-hidden rounded-[32px]"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-44 w-44 rounded-full bg-fuchsia-400/15 blur-3xl" />

          <div className="relative border-b border-white/10 px-4 pt-5 sm:px-6">
            <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-white/5 p-1">
              {tabs.map((item) => {
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`relative rounded-full px-5 py-2 text-sm tracking-wide transition ${
                      active ? 'text-night' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-100 via-gold-300 to-fuchsia-300"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'wish' ? (
              <WishSection
                key="wish"
                onCandleClick={(event) => candleBurst(event.clientX, event.clientY)}
                onCelebrate={() => fireworks()}
              />
            ) : (
              <MemoriesGallery key="memories" />
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-500">
          <Sparkle size={12} className="text-gold-300" />
          Made with
          <Heart size={12} className="text-rose-400" fill="currentColor" />
          for my Lovely Princess Ubba❤️
        </p>
      </main>

      <LockScreen open={!unlocked} onUnlock={() => setUnlocked(true)} />
      <EnvelopeOverlay open={unlocked && showEnvelope} onOpened={openFromEnvelope} />
      <LetterModal open={unlocked && showLetter} onClose={() => setShowLetter(false)} />
    </div>
  )
}
