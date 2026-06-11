"use client";

import { Navbar } from "@/components/layout/Navbar";
import {
  getSiteGoogleSearchUrl,
  getSiteMapsUrl,
  heritageSites,
  HeritageSite,
  siteVoiceGuides,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceGuide } from "@/components/features/VoiceGuide";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Map, Clock, Users, Navigation, Ticket, Search,
  SlidersHorizontal, X, MapPin, Landmark,
  ExternalLink, Info, Stamp, CheckCircle
} from "lucide-react";
import { DemoUser, markCurrentUserSiteVisited, readAuthSession } from "@/lib/auth";

const crowdDot: Record<string, string> = {
  High: "bg-red-500",
  Medium: "bg-yellow-400",
  Low: "bg-green-500",
};
function SiteDetailModal({
  site,
  isVisited,
  canCollectStamp,
  onCollectStamp,
  onClose,
}: {
  site: HeritageSite;
  isVisited: boolean;
  canCollectStamp: boolean;
  onCollectStamp: (siteId: string) => void;
  onClose: () => void;
}) {
  const mapsUrl = getSiteMapsUrl(site);
  const googleUrl = getSiteGoogleSearchUrl(site);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", animation: "fadeIn 0.2s ease"
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "20px", width: "100%", maxWidth: "640px",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          animation: "slideUp 0.25s ease"
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <img src={site.imageUrl} alt={site.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
            width: "36px", height: "36px", cursor: "pointer", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <X style={{ width: "18px", height: "18px" }} />
          </button>
          <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
            <h2 style={{ margin: 0, color: "#fff", fontSize: "24px", fontWeight: 800 }}>{site.name}</h2>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{site.historicalEra}</p>
          </div>
          {/* Crowd badge */}
          <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "4px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: site.crowdLevel === "High" ? "#ef4444" : site.crowdLevel === "Medium" ? "#eab308" : "#22c55e", display: "inline-block" }} />
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{site.crowdLevel} Crowd</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.7, fontSize: "14px", marginBottom: "20px" }}>{site.description}</p>

          {/* Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: <Clock style={{ width: "15px", height: "15px" }} />, label: "Timings", value: site.timings },
              { icon: <Ticket style={{ width: "15px", height: "15px" }} />, label: "Entry Fee", value: site.entryFee },
              { icon: <Users style={{ width: "15px", height: "15px" }} />, label: "Peak Hours", value: site.peakHours },
              { icon: <Clock style={{ width: "15px", height: "15px" }} />, label: "Wait Time", value: site.waitingTime },
              { icon: <MapPin style={{ width: "15px", height: "15px" }} />, label: "Location", value: site.location },
              { icon: <Landmark style={{ width: "15px", height: "15px" }} />, label: "Style", value: site.architectureStyle },
            ].map(item => (
              <div key={item.label} style={{
                background: "var(--accent)", borderRadius: "12px",
                padding: "12px", border: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", marginBottom: "4px" }}>
                  {item.icon}
                  <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Audio Guide */}
          <div style={{ marginBottom: "20px" }}>
              <VoiceGuide
                title={site.name}
                text={site.audioGuide}
                localizedText={siteVoiceGuides[site.id]}
              />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href={`/monuments/${site.id}`}
              style={{
                flex: "1 1 180px", background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "12px",
                padding: "12px", textAlign: "center", textDecoration: "none",
                fontWeight: 700, fontSize: "14px", display: "flex",
                alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              <Info style={{ width: "16px", height: "16px" }} />
              More Info
            </Link>
            <button
              onClick={() => onCollectStamp(site.id)}
              disabled={isVisited}
              style={{
                flex: "1 1 180px", background: isVisited ? "rgba(34,197,94,0.18)" : "var(--primary)",
                color: isVisited ? "#22c55e" : "#000", borderRadius: "12px",
                padding: "12px", textAlign: "center", border: isVisited ? "1px solid rgba(34,197,94,0.35)" : "none",
                fontWeight: 700, fontSize: "14px", display: "flex",
                alignItems: "center", justifyContent: "center", gap: "8px",
                cursor: isVisited ? "not-allowed" : "pointer",
                opacity: canCollectStamp ? 1 : 0.7,
              }}
            >
              {isVisited ? <CheckCircle style={{ width: "16px", height: "16px" }} /> : <Stamp style={{ width: "16px", height: "16px" }} />}
              {isVisited ? "Stamp Collected" : canCollectStamp ? "Collect Stamp" : "Sign in to Collect"}
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: "1 1 180px", background: "var(--accent)", color: "var(--foreground)", borderRadius: "12px",
                padding: "12px", textAlign: "center", textDecoration: "none",
                fontWeight: 700, fontSize: "14px", display: "flex", border: "1px solid var(--border)",
                alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              <Navigation style={{ width: "16px", height: "16px" }} />
              Get Directions
              <ExternalLink style={{ width: "13px", height: "13px" }} />
            </a>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: "1 1 180px", background: "var(--accent)", color: "var(--foreground)", borderRadius: "12px",
                padding: "12px", textAlign: "center", textDecoration: "none",
                fontWeight: 700, fontSize: "14px", display: "flex", border: "1px solid var(--border)",
                alignItems: "center", justifyContent: "center", gap: "8px"
              }}
            >
              <Search style={{ width: "16px", height: "16px" }} />
              Google Info
              <ExternalLink style={{ width: "13px", height: "13px" }} />
            </a>
            <button
              onClick={onClose}
              style={{
                padding: "12px 20px", borderRadius: "12px",
                border: "1px solid var(--border)", background: "var(--accent)",
                color: "var(--foreground)", cursor: "pointer", fontWeight: 600, fontSize: "14px"
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Low">("All");
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const visitedSiteIds = currentUser?.visitedSites || [];
  const canCollectStamp = Boolean(currentUser && currentUser.role !== "admin");

  useEffect(() => {
    const loadAuth = () => setCurrentUser(readAuthSession());

    loadAuth();
    window.addEventListener("smart-heritage-auth-updated", loadAuth);
    window.addEventListener("storage", loadAuth);
    return () => {
      window.removeEventListener("smart-heritage-auth-updated", loadAuth);
      window.removeEventListener("storage", loadAuth);
    };
  }, []);

  const handleCollectStamp = (siteId: string) => {
    if (!canCollectStamp) {
      window.location.href = "/login";
      return;
    }

    setCurrentUser(markCurrentUserSiteVisited(siteId));
  };

  const filtered = heritageSites.filter((site) => {
    const q = search.toLowerCase();
    const matchesSearch = site.name.toLowerCase().includes(q) ||
      site.historicalEra.toLowerCase().includes(q) ||
      site.architectureStyle.toLowerCase().includes(q);
    const matchesFilter = filter === "All" || site.crowdLevel === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Detail Modal */}
      {selectedSite && (
        <SiteDetailModal
          site={selectedSite}
          isVisited={visitedSiteIds.includes(selectedSite.id)}
          canCollectStamp={canCollectStamp}
          onCollectStamp={handleCollectStamp}
          onClose={() => setSelectedSite(null)}
        />
      )}

      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
              <Map className="h-10 w-10 text-primary" />
              Explore Heritage Sites
            </h1>
            <p className="text-foreground/65 text-lg">
              Real-time crowd data, AI voice guides, and rich history at every site.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by name, era, or style..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-accent/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-foreground/40 shrink-0" />
            {(["All", "Low", "Medium", "High"] as const).map(level => (
              <Button
                key={level}
                size="sm"
                variant={filter === level ? "default" : "outline"}
                onClick={() => setFilter(level)}
                className={`text-xs ${filter === level ? "bg-primary text-primary-foreground" : "border-border/60"}`}
              >
                {level !== "All" && <span className={`h-2 w-2 rounded-full mr-1.5 ${crowdDot[level]}`} />}
                {level}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground/50 mb-6">
          Showing <strong className="text-foreground">{filtered.length}</strong> of {heritageSites.length} heritage sites
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filtered.map(site => (
            (() => {
              const isVisited = visitedSiteIds.includes(site.id);
              return (
            <div
              key={site.id}
              id={`site-${site.id}`}
              className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border/40 glass hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden shrink-0">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Crowd Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                  <span className={`h-2 w-2 rounded-full animate-pulse ${crowdDot[site.crowdLevel]}`} />
                  {site.crowdLevel} Crowd
                </div>
                {/* Wait */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-white">
                  <Clock className="h-3 w-3 text-primary" />
                  {site.waitingTime} wait
                </div>
                {isVisited && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-green-600/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                    <CheckCircle className="h-3 w-3" />
                    Stamp
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="sm:w-3/5 flex flex-col p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold leading-tight">{site.name}</h3>
                    <p className="text-xs text-primary/80 font-medium mt-0.5">{site.historicalEra}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0 border-border/60">{site.architectureStyle}</Badge>
                </div>

                <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed mb-3">{site.description}</p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-1.5 text-xs text-foreground/65 mb-4">
                  <div className="flex items-center gap-1.5 bg-accent/60 rounded-lg px-2 py-1.5">
                    <Users className="h-3.5 w-3.5 text-primary shrink-0" /> Peak: {site.peakHours}
                  </div>
                  <div className="flex items-center gap-1.5 bg-accent/60 rounded-lg px-2 py-1.5">
                    <Ticket className="h-3.5 w-3.5 text-primary shrink-0" /> {site.entryFee.split("(")[0].trim()}
                  </div>
                </div>

                <VoiceGuide
                  title={site.name}
                  text={site.audioGuide}
                  localizedText={siteVoiceGuides[site.id]}
                />

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                  <Button
                    variant={isVisited ? "outline" : "default"}
                    className={`flex-1 text-sm ${isVisited ? "border-green-500/50 text-green-500" : "bg-primary/90 hover:bg-primary text-primary-foreground"}`}
                    size="sm"
                    disabled={isVisited}
                    onClick={() => handleCollectStamp(site.id)}
                  >
                    {isVisited ? <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> : <Stamp className="h-3.5 w-3.5 mr-1.5" />}
                    {isVisited ? "Collected" : "Collect Stamp"}
                  </Button>
                  <Button
                    className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground text-sm"
                    size="sm"
                    onClick={() => setSelectedSite(site)}
                  >
                    <Info className="h-3.5 w-3.5 mr-1.5" /> View Details
                  </Button>
                  <a
                    href={getSiteMapsUrl(site)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full border-border/60 text-sm" size="sm">
                      <Navigation className="h-3.5 w-3.5 mr-1.5" /> Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>
              );
            })()
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-foreground/40">
            <Map className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No sites found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
