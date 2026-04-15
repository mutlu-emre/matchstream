'use client'

import { Tv } from 'lucide-react'
import { type Channel } from '@/lib/mock-data'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface ChannelSelectorProps {
  channels: Channel[];
  activeChannelId: string;
  onChannelSelect: (channelId: string) => void;
}

export function ChannelSelector({ channels, activeChannelId, onChannelSelect }: ChannelSelectorProps) {
  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface p-4 h-full">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-text-inverse dark:text-text-primary mb-3">
        <Tv className="h-4 w-4" />
        Kanallar
      </h2>
      <div className="space-y-1">
        {channels.map((channel) => {
          const isActive = channel.id === activeChannelId;
          return (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:bg-light-elevated dark:hover:bg-dark-elevated hover:text-text-inverse dark:hover:text-text-primary"
              )}
            >
              <span className="flex items-center gap-2">
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                <span className="truncate">{channel.name}</span>
              </span>
              <Badge variant="quality">{channel.quality}</Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
