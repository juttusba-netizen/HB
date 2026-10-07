import { AnimatePresence, motion } from 'framer-motion'
import { Image, Play, Video, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { memories, memoriesBackground } from '../data/content'

const filters = [
  { id: 'image', label: 'Images', Icon: Image },
  { id: 'video', label: 'Videos', Icon: Video },
]

function VideoThumb({ src, className }) {
  const videoRef = useRef(null)

  const showStartFrame = () => {
    const video = videoRef.current
    if (!video) return
    const jump = () => {
      try {
        video.currentTime = 0.08
      } catch {
        /* some browsers throw if seek is too early */
      }
    }
    jump()
    video.pause()
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={showStartFrame}
      onLoadedData={showStartFrame}
      onSeeked={() => videoRef.current?.pause()}
      className={className}
    />
  )
}

function MemoryMedia({ memory, className, playing = false }) {
  if (memory.type === 'video') {
    if (!playing) {
      return <VideoThumb src={memory.src} className={className} />
    }

    return (
      <video
        src={memory.src}
        muted={false}
        playsInline
        controls
        autoPlay
        preload="metadata"
        className={className}
      />
    )
  }

  return (
    <img
      src={memory.src}
      alt={memory.alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display = 'none'
        event.currentTarget.parentElement.style.background =
          'linear-gradient(160deg, #4c1d95, #9d174d 55%, #1e1b4b)'
      }}
    />
  )
}

export default function MemoriesGallery() {
  const [filter, setFilter] = useState('image')
  const [active, setActive] = useState(null)
  const previewRef = useRef(null)

  const visible = useMemo(
    () => memories.filter((memory) => memory.type === filter),
    [filter],
  )

  const playPreview = (event) => {
    const video = event.currentTarget.querySelector('video')
    if (!video) return
    previewRef.current = video
    video.play().catch(() => {})
  }

  const stopPreview = () => {
    const video = previewRef.current
    if (!video) return
    video.pause()
    try {
      video.currentTime = 0.08
    } catch {
      video.currentTime = 0
    }
    previewRef.current = null
  }

  return (
    <motion.section
      key="memories"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative px-5 pb-8 pt-2 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={memoriesBackground}
          alt=""
          className="h-full w-full scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/75 to-night/85" />
        <div className="absolute inset-0 bg-violet-950/25" />
      </div>

      <div className="relative z-10">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-violet-200/70">
        Little frames of us
      </p>

      <div className="mx-auto mb-5 flex w-fit items-center gap-1 rounded-full bg-white/5 p-1">
        {filters.map(({ id, label, Icon }) => {
          const selected = filter === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`relative rounded-full px-4 py-1.5 text-sm tracking-wide transition sm:px-5 ${
                selected ? 'text-night' : 'text-slate-300 hover:text-white'
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="memory-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-100 via-gold-300 to-fuchsia-300"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                <Icon size={14} />
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {visible.map((memory, index) => (
            <motion.button
              key={memory.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => {
                stopPreview()
                setActive(memory)
              }}
              onMouseEnter={playPreview}
              onMouseLeave={stopPreview}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 text-left shadow-glass"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-abyss sm:aspect-square">
                <MemoryMedia
                  memory={memory}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-80" />
                {memory.type === 'video' ? (
                  <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-night/55 text-gold-100 ring-1 ring-white/30 backdrop-blur-sm">
                    <Play size={16} fill="currentColor" />
                  </span>
                ) : null}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night/70 px-3 py-4 backdrop-blur-md sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-3xl p-3 sm:max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-night/60 text-white"
                aria-label="Close memory"
              >
                <X size={16} />
              </button>
              <MemoryMedia
                memory={active}
                playing={active.type === 'video'}
                className="max-h-[82vh] w-full rounded-2xl bg-black object-contain"
              />
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  )
}
