import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMatchById } from "@/lib/mock-data";
import { LiveBadge } from "@/components/matches/LiveBadge";
import { WatchContent } from "@/components/player/WatchContent";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = getMatchById(matchId);

  if (!match) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Üst bar — SSR shell */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          {match.status === "live" && <LiveBadge />}
          <h1 className="text-lg font-semibold text-text-inverse dark:text-text-primary">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </h1>
          <span className="text-sm text-text-muted">{match.league}</span>
        </div>
      </div>

      {/* Client: Player + Kanal Seçici */}
      <WatchContent channels={match.channels} />
    </div>
  );
}
