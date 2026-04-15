'use client'

import { useState } from 'react'
import { Play, Volume2, VolumeX, Maximize } from 'lucide-react'
import { type Channel } from '@/lib/mock-data'

export function VideoPlayerCore({ channel }: { channel: Channel | undefined }) {
  const [isMuted, setIsMuted] = useState(true)

  if (!channel) {
    return (
      <div className="aspect-video w-full bg-black flex items-center justify-center">
        <p className="text-text-muted text-sm">Kanal seçilmedi</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-black group">
      {/* Placeholder içerik */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <Play className="h-8 w-8 text-white ml-1" />
        </div>
        <p className="text-sm text-text-secondary">{channel.name}</p>
        <p className="text-xs text-text-muted">Yayın bağlantısı bekleniyor...</p>
      </div>

      {/* Kontrol çubuğu — hover'da görünür */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-primary transition-colors"
              aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <span className="text-xs text-text-secondary">{channel.name}</span>
          </div>
          <button className="text-white hover:text-primary transition-colors" aria-label="Tam ekran">
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
