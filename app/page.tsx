import { getMatches, sortMatches } from "@/lib/api";
import { MatchList } from "@/components/matches/MatchList";

export default async function Home() {
  const { matches, lastUpdated } = await getMatches();
  const sorted = sortMatches(matches);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <MatchList matches={sorted} lastUpdated={lastUpdated} />
    </div>
  );
}
