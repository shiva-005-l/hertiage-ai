import { heritageSites, type HeritageSite } from "@/lib/mock-data";

export type RecognitionSource = "gemini" | "visual" | "filename" | "none";

export type MonumentRecognitionResult = {
  recognized: boolean;
  siteId: string | null;
  name: string | null;
  historicalEra: string | null;
  architectureStyle: string | null;
  location: string | null;
  confidence: string;
  confidenceScore: number;
  uploadedFile: string;
  source: RecognitionSource;
  note: string;
};

export const monumentAliases: Record<string, string[]> = {
  site_1: ["charminar", "char minar", "chaarminar"],
  site_2: ["golconda", "golkonda", "golconda fort", "golkonda fort"],
  site_3: ["chowmahalla", "chowmahalla palace", "chow mahalla", "chowmohalla"],
  site_4: ["qutb shahi tombs", "qutub shahi tombs", "qutb tombs", "qutub tombs"],
  site_5: ["salar jung", "salar jung museum", "salarjung"],
  site_6: ["mecca masjid", "makkah masjid", "mecca mosque", "makkah mosque"],
  site_7: ["falaknuma", "falaknuma palace"],
  site_8: ["birla mandir", "birla temple", "birla mandir hyderabad"],
  site_9: ["taramati baradari", "taramati", "baradari"],
  site_10: ["paigah tombs", "paigah tomb", "paigah"],
};

export function normalizeRecognitionText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function findSiteByIdOrName(siteId?: string | null, siteName?: string | null) {
  const normalizedName = normalizeRecognitionText(siteName ?? "");

  return (
    heritageSites.find((site) => site.id === siteId) ??
    heritageSites.find((site) => normalizeRecognitionText(site.name) === normalizedName) ??
    null
  );
}

export function identifySiteFromText(value: string) {
  const normalizedValue = normalizeRecognitionText(value);
  if (!normalizedValue) return null;

  let bestMatch: { site: HeritageSite; score: number } | null = null;

  for (const site of heritageSites) {
    const aliases = [site.name, ...(monumentAliases[site.id] ?? [])];

    for (const alias of aliases) {
      const normalizedAlias = normalizeRecognitionText(alias);
      if (!normalizedAlias) continue;

      const aliasTokens = normalizedAlias.split(" ");
      const hasExactAlias = normalizedValue.includes(normalizedAlias);
      const hasAllAliasTokens = aliasTokens.every((token) => normalizedValue.includes(token));
      const score = hasExactAlias
        ? 100 + normalizedAlias.length
        : hasAllAliasTokens && aliasTokens.length > 1
          ? 60 + aliasTokens.length
          : 0;

      if (score > (bestMatch?.score ?? 0)) {
        bestMatch = { site, score };
      }
    }
  }

  return bestMatch && bestMatch.score >= 60 ? bestMatch.site : null;
}

export function recognizedSiteResult(
  site: HeritageSite,
  uploadedFile: string,
  source: RecognitionSource,
  confidenceScore: number,
  note: string,
): MonumentRecognitionResult {
  return {
    recognized: true,
    siteId: site.id,
    name: site.name,
    historicalEra: site.historicalEra,
    architectureStyle: site.architectureStyle,
    location: site.location,
    confidence: `${Math.round(confidenceScore * 100)}%`,
    confidenceScore,
    uploadedFile,
    source,
    note,
  };
}

export function unrecognizedResult(uploadedFile: string, note: string): MonumentRecognitionResult {
  return {
    recognized: false,
    siteId: null,
    name: null,
    historicalEra: null,
    architectureStyle: null,
    location: null,
    confidence: "Not confident",
    confidenceScore: 0,
    uploadedFile,
    source: "none",
    note,
  };
}
