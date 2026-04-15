import { type Match } from "@/lib/mock-data";
import { MatchCard } from "./MatchCard";

export function MatchList({ matches }: { matches: Match[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-inverse dark:text-text-primary">
          Canlı Maçlar
        </h1>
        <span className="text-sm text-text-muted">Son güncelleme: 19:05</span>
      </div>
      {matches.length === 0 ? (
        <p className="text-center text-text-muted py-12">
          Şu anda yayında maç bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </section>
  );
}
