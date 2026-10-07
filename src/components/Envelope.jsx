import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { envelopePhoto, envelopePhotoFallback, letterBody } from '../data/content'

function Portrait({ className, alt = 'A portrait for Madam Jee' }) {
  return (
    <img
      src={envelopePhoto}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.dataset.fallback === '1') return
        event.currentTarget.dataset.fallback = '1'
        event.currentTarget.src = envelopePhotoFallback
      }}
    />
  )
}

export default function EnvelopeOverlay({ open, onOpened }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => onOpened(), 1150)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.05 } }}
        >
          <div className="pointer-events-none absolute inset-0">
            <Portrait className="h-full w-full scale-110 object-cover" />
            <div className="absolute inset-0 bg-night/55 backdrop-blur-[18px]" />
            <div className="envelope-stage-light" />
            <div className="envelope-stage-vignette" />
          </div>

          <p className="relative z-10 mb-6 text-center text-[11px] uppercase tracking-[0.4em] text-gold-300">
            A sealed surprise
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="relative z-10"
            aria-label="Open the envelope"
          >
            <div className="envelope-halo" />
            <motion.div
              className="envelope"
              whileHover={opening ? undefined : { scale: 1.03 }}
              style={{ perspective: 900 }}
            >
              <div className="envelope-pocket">
                <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                  <Portrait className="h-full w-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/85 via-[#2e1065]/25 to-transparent" />
                </div>

                <motion.div
                  className="envelope-letter flex flex-col items-center justify-start overflow-hidden px-3 pt-3 text-center"
                  animate={opening ? { y: -70, opacity: 1 } : { y: 18, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: opening ? 0.28 : 0 }}
                >
                  <div className="envelope-letter-photo">
                    <Portrait className="h-full w-full object-cover" />
                  </div>
                  <p className="font-display mt-2 text-base text-abyss/85">For my Madam Jee</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-abyss/50">
                    {opening ? 'Unfolding…' : 'Tap to open'}
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="envelope-flap"
                initial={{ rotateX: 0 }}
                animate={opening ? { rotateX: -168 } : { rotateX: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              />

              <div className="absolute left-1/2 top-[38%] z-[4] -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="envelope-portrait-medallion"
                  animate={opening ? { scale: 0.45, opacity: 0, y: -24 } : { scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <Portrait className="h-full w-full object-cover" />
                  <span className="envelope-portrait-shine" />
                </motion.div>
              </div>

              <motion.div
                className="absolute left-1/2 top-[58%] z-20 -translate-x-1/2"
                animate={opening ? { scale: 0, opacity: 0, y: -12 } : { scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="wax-seal flex items-center justify-center text-rose-100">
                  <Heart size={18} fill="currentColor" />
                </div>
              </motion.div>
            </motion.div>
          </button>

          <p className="relative z-10 mt-8 max-w-sm text-center text-sm text-slate-300/90">
            Something tender is waiting inside. Break the seal when you are ready.
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function LetterModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night/75 px-3 py-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            initial={{ y: 48, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="letter-sheet relative w-full max-w-xl overflow-hidden rounded-2xl sm:max-w-2xl"
            onClick={(event) => event.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #fbf6eb 0%, #f0e1c4 100%)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 27px, rgba(124, 45, 18, 0.08) 28px)',
                backgroundPosition: '0 72px',
              }}
            />
            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-rose-300/30 blur-2xl" />
            <div className="relative px-4 py-4 sm:px-10 sm:py-6">
              <div className="letter-portrait mx-auto mb-2.5 sm:mb-3">
                <Portrait className="h-full w-full object-cover" />
              </div>
              <p className="text-center text-[10px] uppercase tracking-[0.32em] text-rose-800/60">
                A private letter
              </p>
              <h2 className="font-display mt-1 text-center text-xl text-abyss sm:text-2xl">
                My dear Madam Jee,
              </h2>
              <div className="mt-3 space-y-2 text-[13px] leading-5 text-abyss/80 sm:space-y-2.5 sm:text-[15px] sm:leading-7">
                {letterBody.split('\n\n').map((paragraph) => (
                  <p key={paragraph.slice(0, 28)}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-full bg-abyss px-5 py-2 text-sm text-gold-100 transition hover:bg-night sm:mt-5"
              >
                Close the letter
              </button>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
