import Link from "next/link";
import { type Match } from "@/lib/mock-data";
import { LiveBadge } from "./LiveBadge";
import { Badge } from "@/components/ui/Badge";
import { formatTime } from "@/lib/utils";

export function MatchCard({ match }: { match: Match }) {
  const channelNames = match.channels.map((ch) => ch.name).join(" · ");

  return (
    <div className={`rounded-xl border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-200 flex flex-col gap-4 ${match.status === "finished" ? "opacity-60" : ""}`}>
      {/* Üst: badge + lig */}
      <div className="flex items-center justify-between">
        {match.status === "live" && <LiveBadge />}
        {match.status === "upcoming" && <Badge variant="upcoming">Yaklaşıyor</Badge>}
        {match.status === "finished" && <Badge variant="finished">Bitti</Badge>}
        <span className="text-xs text-text-muted">{match.league}</span>
      </div>

      {/* Orta: takımlar + skor/saat */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-semibold text-text-inverse dark:text-text-primary truncate flex-1 text-left">
          {match.homeTeam.name}
        </span>
        <span className="text-lg font-bold text-text-inverse dark:text-text-primary shrink-0 px-2">
          {match.score
            ? `${match.score.home} - ${match.score.away}`
            : match.status === "upcoming"
            ? formatTime(match.startTime)
            : "vs"}
        </span>
        <span className="text-base font-semibold text-text-inverse dark:text-text-primary truncate flex-1 text-right">
          {match.awayTeam.name}
        </span>
      </div>

      {/* Alt: kanallar + izle butonu */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted truncate flex-1">{channelNames}</span>
        {match.status !== "finished" && (
          <Link
            href={`/watch/${match.id}`}
            className="shrink-0 rounded-lg bg-primary hover:bg-primary-hover text-white px-4 py-2 text-sm font-medium transition-colors"
          >
            İzle →
          </Link>
        )}
      </div>
    </div>
  );
}
