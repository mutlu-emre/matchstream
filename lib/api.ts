import { type Match } from "@/lib/mock-data";

/**
 * Backend (matchstream-api) veri katmanı.
 * Sunucu bileşenlerinden çağrılır; BE kapalı/hatalıysa sayfa PATLAMAZ
 * (getMatches boş liste, getMatchById null döner).
 */

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface MatchesResponse {
  success: boolean;
  data: Match[];
  meta: { total: number; lastUpdated: string | null };
}

interface MatchResponse {
  success: boolean;
  data: Match;
}

/**
 * GET /api/matches → maç listesi + son güncelleme.
 * Next 16: fetch varsayılan cache'siz; 60 sn revalidate ile ISR benzeri davranış.
 */
export async function getMatches(): Promise<{
  matches: Match[];
  lastUpdated: string | null;
}> {
  try {
    const res = await fetch(`${API}/api/matches`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { matches: [], lastUpdated: null };

    const json = (await res.json()) as MatchesResponse;
    if (!json.success) return { matches: [], lastUpdated: null };

    return {
      matches: json.data ?? [],
      lastUpdated: json.meta?.lastUpdated ?? null,
    };
  } catch {
    // BE kapalı / ağ hatası → boş liste, sayfa render olmaya devam eder
    return { matches: [], lastUpdated: null };
  }
}

/**
 * GET /api/matches/:matchId → tek maç.
 * Bulunamazsa (404) veya hata → null (watch sayfası notFound() çağırır).
 */
export async function getMatchById(id: string): Promise<Match | null> {
  try {
    const res = await fetch(`${API}/api/matches/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as MatchResponse;
    if (!json.success || !json.data) return null;

    return json.data;
  } catch {
    return null;
  }
}

/** Maçları durumlarına göre sırala: live → upcoming → finished */
export function sortMatches(matches: Match[]): Match[] {
  const order = { live: 0, upcoming: 1, finished: 2 } as const;
  return [...matches].sort((a, b) => order[a.status] - order[b.status]);
}
