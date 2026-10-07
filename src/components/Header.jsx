import { motion } from 'framer-motion'
import { Mail, Music, Sparkle } from 'lucide-react'

export default function Header({ isPlaying, onToggleMusic, onOpenLetter }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-7 sm:px-8">
      <div className="flex items-center gap-3">
        <motion.span
          className="text-gold-300"
          animate={{
            opacity: [0.35, 1, 0.4],
            y: [0, -5, 0],
            rotate: [0, 16, -8, 0],
            scale: [0.9, 1.15, 0.95],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkle size={16} fill="currentColor" />
        </motion.span>
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-slate-300/80">
          Special Day
        </p>
        <motion.span
          className="hidden text-fuchsia-300 sm:inline"
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.2, 0.7], y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
        >
          <Sparkle size={12} fill="currentColor" />
        </motion.span>
        <motion.span
          className="hidden text-gold-100 md:inline"
          animate={{ opacity: [0.2, 1, 0.2], rotate: [0, 25, 0] }}
          transition={{ duration: 3.1, repeat: Infinity, delay: 1.1 }}
        >
          <Sparkle size={10} fill="currentColor" />
        </motion.span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenLetter}
          className="glass-inset flex h-11 w-11 items-center justify-center rounded-full text-gold-300 transition hover:border-gold-300/40 hover:text-gold-100"
          aria-label="Open the birthday letter"
        >
          <Mail size={18} />
        </button>
        <button
          type="button"
          onClick={onToggleMusic}
          className={`glass-inset flex h-11 w-11 items-center justify-center rounded-full transition ${
            isPlaying
              ? 'text-gold-100 shadow-gold ring-1 ring-gold-300/40'
              : 'text-slate-300 hover:text-gold-200'
          }`}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        >
          <Music size={18} />
        </button>
      </div>
    </header>
  )
}
