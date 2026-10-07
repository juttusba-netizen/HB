import { useCallback, useEffect, useRef, useState } from 'react'

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i += 1) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

function createAmbientWavUrl() {
  const sampleRate = 22050
  const seconds = 8
  const length = sampleRate * seconds
  const buffer = new ArrayBuffer(44 + length * 2)
  const view = new DataView(buffer)

  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + length * 2, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(view, 36, 'data')
  view.setUint32(40, length * 2, true)

  const freqs = [220, 277.18, 329.63, 440]
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate
    const fade = Math.min(1, t / 1.2) * Math.min(1, (seconds - t) / 1.2)
    let sample = 0
    freqs.forEach((freq, index) => {
      sample += Math.sin(2 * Math.PI * freq * t) * (index === 0 ? 0.18 : 0.08)
      sample += Math.sin(2 * Math.PI * (freq / 2) * t) * 0.05
    })
    sample *= fade * 0.55
    const clamped = Math.max(-1, Math.min(1, sample))
    view.setInt16(44 + i * 2, clamped * 0x7fff, true)
  }

  const blob = new Blob([buffer], { type: 'audio/wav' })
  return URL.createObjectURL(blob)
}

export function useAmbientAudio(src = '/audio/jo-tum-mere-ho.mp3') {
  const audioRef = useRef(null)
  const fallbackUrlRef = useRef('')
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.4
    audio.src = src
    audioRef.current = audio

    const applyFallback = () => {
      if (!fallbackUrlRef.current) {
        fallbackUrlRef.current = createAmbientWavUrl()
      }
      audio.src = fallbackUrlRef.current
      audio.load()
    }

    const onError = () => applyFallback()

    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('error', onError)
      audioRef.current = null
      if (fallbackUrlRef.current) {
        URL.revokeObjectURL(fallbackUrlRef.current)
        fallbackUrlRef.current = ''
      }
    }
  }, [src])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [isPlaying])

  return { isPlaying, toggle }
}
