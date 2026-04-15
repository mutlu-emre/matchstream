// ============================================
// TYPES
// ============================================

export interface Channel {
  id: string;
  name: string;
  quality: "SD" | "HD" | "FHD";
  streamUrl: string; // Gerçek uygulamada mpegts stream URL'i
}

export interface Team {
  name: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  leagueCountry: string;
  status: "live" | "upcoming" | "finished";
  startTime: string; // ISO string
  score?: { home: number; away: number };
  channels: Channel[];
}

// ============================================
// MOCK DATA
// ============================================

export const mockMatches: Match[] = [
  {
    id: "match-1",
    homeTeam: { name: "Galatasaray" },
    awayTeam: { name: "Fenerbahçe" },
    league: "Süper Lig",
    leagueCountry: "TR",
    status: "live",
    startTime: "2026-04-15T19:00:00Z",
    score: { home: 2, away: 1 },
    channels: [
      { id: "ch-1a", name: "beIN Sports 1 HD", quality: "HD", streamUrl: "" },
      { id: "ch-1b", name: "beIN Sports 1 FHD", quality: "FHD", streamUrl: "" },
      { id: "ch-1c", name: "beIN Sports 1", quality: "SD", streamUrl: "" },
    ],
  },
  {
    id: "match-2",
    homeTeam: { name: "Real Madrid" },
    awayTeam: { name: "Barcelona" },
    league: "La Liga",
    leagueCountry: "ES",
    status: "live",
    startTime: "2026-04-15T20:00:00Z",
    score: { home: 1, away: 1 },
    channels: [
      { id: "ch-2a", name: "S Sport HD", quality: "HD", streamUrl: "" },
      { id: "ch-2b", name: "S Sport FHD", quality: "FHD", streamUrl: "" },
    ],
  },
  {
    id: "match-3",
    homeTeam: { name: "Manchester City" },
    awayTeam: { name: "Liverpool" },
    league: "Premier League",
    leagueCountry: "GB",
    status: "live",
    startTime: "2026-04-15T18:30:00Z",
    score: { home: 0, away: 2 },
    channels: [
      { id: "ch-3a", name: "beIN Sports 2 HD", quality: "HD", streamUrl: "" },
      { id: "ch-3b", name: "beIN Sports 2 FHD", quality: "FHD", streamUrl: "" },
      { id: "ch-3c", name: "TRT Spor", quality: "SD", streamUrl: "" },
    ],
  },
  {
    id: "match-4",
    homeTeam: { name: "Bayern Münih" },
    awayTeam: { name: "Borussia Dortmund" },
    league: "Bundesliga",
    leagueCountry: "DE",
    status: "upcoming",
    startTime: "2026-04-15T21:30:00Z",
    channels: [
      { id: "ch-4a", name: "S Sport 2 HD", quality: "HD", streamUrl: "" },
      { id: "ch-4b", name: "S Sport 2 FHD", quality: "FHD", streamUrl: "" },
    ],
  },
  {
    id: "match-5",
    homeTeam: { name: "PSG" },
    awayTeam: { name: "Marsilya" },
    league: "Ligue 1",
    leagueCountry: "FR",
    status: "upcoming",
    startTime: "2026-04-15T22:00:00Z",
    channels: [
      { id: "ch-5a", name: "beIN Sports 3 HD", quality: "HD", streamUrl: "" },
    ],
  },
  {
    id: "match-6",
    homeTeam: { name: "Juventus" },
    awayTeam: { name: "Inter" },
    league: "Serie A",
    leagueCountry: "IT",
    status: "finished",
    startTime: "2026-04-15T16:00:00Z",
    score: { home: 3, away: 2 },
    channels: [
      { id: "ch-6a", name: "beIN Sports 4 HD", quality: "HD", streamUrl: "" },
      { id: "ch-6b", name: "beIN Sports 4 FHD", quality: "FHD", streamUrl: "" },
    ],
  },
  {
    id: "match-7",
    homeTeam: { name: "Beşiktaş" },
    awayTeam: { name: "Trabzonspor" },
    league: "Süper Lig",
    leagueCountry: "TR",
    status: "live",
    startTime: "2026-04-15T19:00:00Z",
    score: { home: 1, away: 0 },
    channels: [
      { id: "ch-7a", name: "beIN Sports Max 1 HD", quality: "HD", streamUrl: "" },
      { id: "ch-7b", name: "beIN Sports Max 1 FHD", quality: "FHD", streamUrl: "" },
    ],
  },
  {
    id: "match-8",
    homeTeam: { name: "Ajax" },
    awayTeam: { name: "PSV" },
    league: "Eredivisie",
    leagueCountry: "NL",
    status: "upcoming",
    startTime: "2026-04-15T20:45:00Z",
    channels: [
      { id: "ch-8a", name: "TV8,5 HD", quality: "HD", streamUrl: "" },
    ],
  },
];

// ============================================
// HELPERS
// ============================================

export function getAllMatches(): Match[] {
  return mockMatches;
}

export function getMatchById(id: string): Match | undefined {
  return mockMatches.find((m) => m.id === id);
}

export function getMatchesSorted(): Match[] {
  const order = { live: 0, upcoming: 1, finished: 2 };
  return [...mockMatches].sort((a, b) => order[a.status] - order[b.status]);
}
