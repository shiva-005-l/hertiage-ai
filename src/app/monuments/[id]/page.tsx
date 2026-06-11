import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSiteGoogleSearchUrl,
  getSiteMapsUrl,
  heritageSites,
  siteVoiceGuides,
} from "@/lib/mock-data";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoiceGuide } from "@/components/features/VoiceGuide";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Landmark,
  MapPin,
  Navigation,
  Search,
  Ticket,
  Users,
} from "lucide-react";

type MonumentPageProps = {
  params: Promise<{ id: string }>;
};

function findSite(id: string) {
  return heritageSites.find((site) => site.id === id);
}

export function generateStaticParams() {
  return heritageSites.map((site) => ({ id: site.id }));
}

export async function generateMetadata({ params }: MonumentPageProps): Promise<Metadata> {
  const { id } = await params;
  const site = findSite(id);

  if (!site) {
    return {
      title: "Monument Not Found | Smart Heritage Guide",
    };
  }

  return {
    title: `${site.name} | Smart Heritage Guide`,
    description: site.description,
  };
}

export default async function MonumentDetailPage({ params }: MonumentPageProps) {
  const { id } = await params;
  const site = findSite(id);

  if (!site) notFound();

  const mapsUrl = getSiteMapsUrl(site);
  const googleUrl = getSiteGoogleSearchUrl(site);
  const relatedSites = heritageSites
    .filter((candidate) => candidate.id !== site.id)
    .filter(
      (candidate) =>
        candidate.architectureStyle.includes(site.architectureStyle.split(" ")[0]) ||
        candidate.historicalEra.includes(site.historicalEra.split(" ")[0]) ||
        candidate.location.includes("Hyderabad"),
    )
    .slice(0, 3);

  const facts = [
    { label: "Historical Era", value: site.historicalEra, icon: <Landmark className="h-4 w-4" /> },
    { label: "Architecture", value: site.architectureStyle, icon: <Landmark className="h-4 w-4" /> },
    { label: "Location", value: site.location, icon: <MapPin className="h-4 w-4" /> },
    { label: "Timings", value: site.timings, icon: <Clock className="h-4 w-4" /> },
    { label: "Entry Fee", value: site.entryFee, icon: <Ticket className="h-4 w-4" /> },
    { label: "Peak Hours", value: site.peakHours, icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative min-h-[62vh] overflow-hidden">
          <img
            src={site.imageUrl}
            alt={site.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-black/20" />
          <div className="container relative mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28">
            <Link href="/explore" className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg bg-background/75 px-3 py-2 text-sm font-semibold text-foreground/85 backdrop-blur-md transition hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Link>
            <div className="max-w-3xl">
              <Badge className="mb-4 border-primary/30 bg-primary/20 text-primary hover:bg-primary/20">
                Popular Monument Guide
              </Badge>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">{site.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/75">
                {site.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
                <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 border-border/60 bg-background/70 backdrop-blur-md">
                    <Search className="h-4 w-4" />
                    Search on Google
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">About the Monument</h2>
              <p className="mt-3 text-base leading-8 text-foreground/70">{site.description}</p>
              <p className="mt-4 text-base leading-8 text-foreground/70">{site.audioGuide}</p>
            </div>

            <VoiceGuide
              title={site.name}
              text={site.audioGuide}
              localizedText={siteVoiceGuides[site.id]}
            />

            <div>
              <h2 className="text-2xl font-bold">Visitor Details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-border/50 bg-accent/45 p-4">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      {fact.icon}
                      <span className="text-xs font-bold uppercase tracking-wide">{fact.label}</span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-foreground/85">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border/50 bg-accent/40 p-5">
              <h2 className="text-xl font-bold">Quick Plan</h2>
              <div className="mt-4 space-y-3 text-sm text-foreground/70">
                <p><strong className="text-foreground">Crowd:</strong> {site.crowdLevel}</p>
                <p><strong className="text-foreground">Current wait:</strong> {site.waitingTime}</p>
                <p><strong className="text-foreground">Best to avoid:</strong> {site.peakHours}</p>
              </div>
              <div className="mt-5 grid gap-2">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Navigation className="h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </a>
                <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full gap-2 border-border/60">
                    <Search className="h-4 w-4" />
                    More from Google
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">More Popular Sites</h2>
              <div className="mt-4 space-y-3">
                {relatedSites.map((related) => (
                  <Link
                    key={related.id}
                    href={`/monuments/${related.id}`}
                    className="flex gap-3 rounded-xl border border-border/50 bg-accent/35 p-3 transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <img
                      src={related.imageUrl}
                      alt={related.name}
                      className="h-20 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">{related.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-foreground/60">
                        {related.historicalEra}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
