import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Lock } from 'lucide-react'
import { useState } from 'react'
import { unlockCode } from '../data/content'

export default function LockScreen({ open, onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    const entered = value.trim()
    if (entered.toLowerCase() === String(unlockCode).trim().toLowerCase()) {
      setError(false)
      onUnlock()
      return
    }
    setError(true)
    setValue('')
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-night" />
          <div className="pointer-events-none absolute inset-0">
            <div className="orb left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 bg-violet-600/30 animate-glow-pulse" />
            <div className="orb bottom-10 right-10 h-56 w-56 bg-fuchsia-500/20 animate-glow-pulse [animation-delay:1s]" />
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            className="glass-panel relative w-full max-w-sm rounded-3xl px-6 py-8 text-center sm:px-8"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gold-300 ring-1 ring-gold-300/30">
              <Lock size={22} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-gold-300">Private access</p>
            <h1 className="font-display mt-2 text-2xl text-luxury">Enter the secret code</h1>
            <p className="mt-2 text-sm text-slate-400">Only the right key opens this day.</p>

            <motion.div
              animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="password"
                autoFocus
                autoComplete="off"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  if (error) setError(false)
                }}
                placeholder="Enter code"
                className="mt-6 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center tracking-[0.28em] text-gold-100 outline-none placeholder:tracking-normal placeholder:text-slate-500 focus:border-gold-300/50 focus:ring-1 focus:ring-gold-300/30"
                aria-label="Secret code"
              />
            </motion.div>

            {error ? (
              <p className="mt-3 text-sm text-rose-300">Wrong code. Try again, cutie.</p>
            ) : (
              <p className="mt-3 text-sm text-transparent">.</p>
            )}

            <button type="submit" className="btn-luxury mt-2 inline-flex items-center gap-2">
              <Heart size={14} fill="currentColor" />
              Unlock
            </button>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
