'use client'

import dynamic from 'next/dynamic'
import { type Channel } from '@/lib/mock-data'
import { Skeleton } from '@/components/ui/Skeleton'

const VideoPlayerCore = dynamic(
  () => import('./VideoPlayerCore').then((mod) => mod.VideoPlayerCore),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full bg-dark-elevated flex items-center justify-center rounded-xl">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    ),
  }
)

export function VideoPlayer({ channel }: { channel: Channel | undefined }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark">
      <VideoPlayerCore channel={channel} />
    </div>
  );
}
