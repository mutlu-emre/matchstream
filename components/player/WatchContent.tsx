'use client'

import { useState } from 'react'
import { Clock, Tv } from 'lucide-react'
import { type Channel, type Match } from '@/lib/mock-data'
import { formatTime } from '@/lib/utils'
import { VideoPlayer } from './VideoPlayer'
import { ChannelSelector } from './ChannelSelector'

interface WatchContentProps {
  channels: Channel[]
  status: Match['status']
  startTime: string
}

export function WatchContent({ channels, status, startTime }: WatchContentProps) {
  const [activeChannelId, setActiveChannelId] = useState<string>(channels[0]?.id ?? "")
  const activeChannel = channels.find((ch) => ch.id === activeChannelId) ?? channels[0]

  // Kanal yoksa: maç başlamadıysa "henüz başlamadı", aksi halde "yayın yok"
  if (channels.length === 0) {
    const notStarted = status === 'upcoming'
    return (
      <div className="aspect-video w-full flex flex-col items-center justify-center gap-4 rounded-xl border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface text-center px-6">
        {notStarted ? (
          <Clock className="h-10 w-10 text-primary" />
        ) : (
          <Tv className="h-10 w-10 text-text-muted" />
        )}
        <div className="space-y-1">
          <p className="text-base font-semibold text-text-inverse dark:text-text-primary">
            {notStarted ? 'Maç henüz başlamadı' : 'Bu maç için yayın bulunamadı'}
          </p>
          {notStarted && (
            <p className="text-sm text-text-muted">
              Başlangıç saati: {formatTime(startTime)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-3/4">
        <VideoPlayer channel={activeChannel} />
      </div>
      <div className="w-full lg:w-1/4 min-h-0">
        <ChannelSelector
          channels={channels}
          activeChannelId={activeChannelId}
          onChannelSelect={setActiveChannelId}
        />
      </div>
    </div>
  );
}
