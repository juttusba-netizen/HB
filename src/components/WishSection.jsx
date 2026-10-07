import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { wishBackground, wishMessage } from '../data/content'
import BirthdayCake from './BirthdayCake'

export default function WishSection({ onCandleClick, onCelebrate }) {
  return (
    <motion.section
      key="wish"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative overflow-hidden px-5 pb-8 pt-4 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={wishBackground}
          alt=""
          className="h-full w-full scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/75 to-night/85" />
        <div className="absolute inset-0 bg-violet-950/25" />
      </div>

      <div className="relative z-10">
        <BirthdayCake onCandleClick={onCandleClick} />

        <h1 className="font-display mt-6 text-center text-3xl leading-tight text-luxury sm:text-4xl">
          Happy Birthday, Madam Jee!❤️
        </h1>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.32em] text-violet-200/70">
          A toast to your light
        </p>

        <div className="glass-inset mt-7 rounded-2xl px-5 py-6 sm:px-8">
          {wishMessage.split('\n\n').map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-4 text-[15px] leading-7 text-slate-200/85 last:mb-0 sm:text-base sm:leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCelebrate}
            className="btn-luxury inline-flex items-center gap-2"
          >
            <PartyPopper size={16} />
            Celebrate More!
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}
