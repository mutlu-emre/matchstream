'use client'

import { AlertTriangle } from 'lucide-react'

interface PlayerErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function PlayerError({ message = "Yayın yüklenirken bir hata oluştu.", onRetry }: PlayerErrorProps) {
  return (
    <div className="aspect-video w-full bg-black flex flex-col items-center justify-center gap-4 rounded-xl">
      <AlertTriangle className="h-10 w-10 text-live" />
      <p className="text-sm text-text-secondary">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-primary hover:bg-primary-hover text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          Tekrar Dene
        </button>
      )}
    </div>
  );
}
