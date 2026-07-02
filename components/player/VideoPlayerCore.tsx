'use client'

import { useEffect, useRef, useState } from 'react'
import mpegts from 'mpegts.js'
import { Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react'
import { type Channel } from '@/lib/mock-data'
import { getStreamUrl } from '@/lib/api'
import { PlayerError } from './PlayerError'

type PlayerState = 'loading' | 'playing' | 'error'

interface VideoPlayerCoreProps {
  matchId: string
  channel: Channel | undefined
}

export function VideoPlayerCore({ matchId, channel }: VideoPlayerCoreProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReturnType<typeof mpegts.createPlayer> | null>(null)
  const [state, setState] = useState<PlayerState>('loading')
  const [isMuted, setIsMuted] = useState(true)
  const [attempt, setAttempt] = useState(0) // retry tetikleyici

  // Kanal veya retry değişince: eski player'ı yık → stream URL çek → yeni player kur
  useEffect(() => {
    if (!channel) return
    let cancelled = false

    function teardown() {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }

    async function setup() {
      setState('loading')
      teardown()

      const url = await getStreamUrl(matchId, channel!.id)
      if (cancelled) return

      const video = videoRef.current
      if (!url || !video) {
        setState('error')
        return
      }
      // Tarayıcı MSE ile canlı MPEG-TS oynatabiliyor mu?
      if (!mpegts.getFeatureList().mseLivePlayback) {
        setState('error')
        return
      }

      const player = mpegts.createPlayer({ type: 'mpegts', isLive: true, url })
      playerRef.current = player
      player.attachMediaElement(video)
      player.on(mpegts.Events.ERROR, () => {
        if (!cancelled) setState('error')
      })

      video.muted = true // autoplay politikası: sessiz başla
      player.load()
      // play() bazı tarayıcılarda void, bazılarında Promise döner → normalize et
      Promise.resolve(player.play())
        .then(() => {
          if (!cancelled) setState('playing')
        })
        .catch(() => {
          // Autoplay engellenirse yayın yüklüdür; kullanıcı etkileşimiyle oynar
          if (!cancelled) setState('playing')
        })
    }

    setup()

    return () => {
      cancelled = true
      teardown() // sayfa değişince stream'i durdur (memory leak / arka planda çalma)
    }
  }, [matchId, channel?.id, attempt]) // eslint-disable-line react-hooks/exhaustive-deps

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function toggleFullscreen() {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen?.()
    }
  }

  if (!channel) {
    return (
      <div className="aspect-video w-full bg-black flex items-center justify-center">
        <p className="text-text-muted text-sm">Kanal seçilmedi</p>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <PlayerError
        message="Yayın açılamadı. Kanal aktif olmayabilir."
        onRetry={() => setAttempt((a) => a + 1)}
      />
    )
  }

  return (
    <div ref={containerRef} className="relative aspect-video w-full bg-black group">
      <video ref={videoRef} className="h-full w-full" playsInline muted />

      {/* Yükleniyor katmanı */}
      {state === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-text-secondary">{channel.name}</p>
          <p className="text-xs text-text-muted">Yayın bağlanıyor...</p>
        </div>
      )}

      {/* Kontrol çubuğu — hover'da görünür */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-white hover:text-primary transition-colors"
              aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <span className="text-xs text-text-secondary">{channel.name}</span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors"
            aria-label="Tam ekran"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
