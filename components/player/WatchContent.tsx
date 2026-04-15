'use client'

import { useState } from 'react'
import { type Channel } from '@/lib/mock-data'
import { VideoPlayer } from './VideoPlayer'
import { ChannelSelector } from './ChannelSelector'

export function WatchContent({ channels }: { channels: Channel[] }) {
  const [activeChannelId, setActiveChannelId] = useState<string>(channels[0]?.id ?? "")
  const activeChannel = channels.find((ch) => ch.id === activeChannelId) ?? channels[0]

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
