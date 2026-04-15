import { getMatchesSorted } from "@/lib/mock-data";
import { MatchList } from "@/components/matches/MatchList";

export default function Home() {
  const matches = getMatchesSorted();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <MatchList matches={matches} />
    </div>
  );
}
