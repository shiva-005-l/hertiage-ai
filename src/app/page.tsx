"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ImageRecognizer } from "@/components/features/ImageRecognizer";
import { useLanguage } from "@/lib/language";
import Link from "next/link";
import {
  Compass,
  Bot,
  MapPin,
  QrCode,
  Medal,
  Users,
  Mic,
  Globe,
  Camera,
  Zap,
  Star,
  ArrowRight,
  Shield,
  Landmark,
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden pt-28 pb-36">
          {/* Ambient background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-60 pointer-events-none" />
          <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-40 left-[-100px] w-[350px] h-[350px] bg-yellow-600/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm shadow-lg shadow-primary/10">
                <Zap className="h-3.5 w-3.5 mr-2 fill-primary" />
                {t('home.badge')}
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
                {t('home.title')}
              </h1>

              <p className="text-xl text-foreground/65 max-w-2xl leading-relaxed">
                {t('home.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/explore">
                  <Button
                    size="lg"
                    id="start-exploring-btn"
                    className="h-13 px-8 text-base shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
                  >
                    <MapPin className="h-5 w-5" />
                    {t('home.startExploring')}
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  id="try-chatbot-btn"
                  className="h-13 px-8 text-base bg-background/50 backdrop-blur-md border-border/60 gap-2"
                  onClick={() => {
                    const btn = document.getElementById('chatbot-toggle-btn') as HTMLButtonElement | null;
                    btn?.click();
                  }}
                >
                  <Bot className="h-5 w-5 text-primary" />
                  {t('home.tryChatbot')}
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-4 text-sm text-foreground/50">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 border-2 border-background -ml-2 first:ml-0" />
                    ))}
                  </div>
                  <span>12,450+ Explorers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="ml-1">4.9 rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Row ── */}
        <section className="py-10 border-y border-border/40 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: "50+", label: "Heritage Sites" },
                { value: "5", label: "Languages" },
                { value: "Smart", label: "Photo Matching" },
                { value: "24/7", label: "Real-Time Data" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI Image Recognizer Section ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute -left-[150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                <Camera className="h-4 w-4" />
                Vision AI Recognition
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Don&apos;t know what you&apos;re looking at?{" "}
                <span className="text-primary">Just snap it.</span>
              </h2>
              <p className="text-lg text-foreground/65 leading-relaxed">
                Upload a monument photo to identify supported sites, architectural styles, historical eras, and useful visitor context.
              </p>
              <div className="space-y-3">
                {["Identify supported monuments", "Learn the historical era & dynasty", "Get architectural style analysis", "Show confidence honestly"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Zap className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <ImageRecognizer />
            </div>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section className="py-28 bg-accent/25 border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                Smart Features
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Everything for the Modern Explorer</h2>
              <p className="text-foreground/60 text-lg">AI-powered tools that make your heritage visits educational, smooth, and unforgettable.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FeatureCard
                icon={<Bot className="h-7 w-7 text-primary" />}
                title="AI Heritage Chatbot"
                description="Ask anything — who built it, why, what happened here. Powered by RAG architecture for historically accurate answers."
                badge="Most Popular"
              />
              <FeatureCard
                icon={<Mic className="h-7 w-7 text-primary" />}
                title="AI Voice Guide"
                description="Text-to-speech narration triggers automatically as you explore. Pause, resume, and listen in your language."
              />
              <FeatureCard
                icon={<Users className="h-7 w-7 text-primary" />}
                title="Real-Time Crowd Monitor"
                description="Check live crowd levels and wait times before arriving. Plan your visit to skip the peak hours."
              />
              <FeatureCard
                icon={<Medal className="h-7 w-7 text-primary" />}
                title="Digital Heritage Passport"
                description="Earn stamps for every site visited. Unlock badges like 'History Buff' and 'Explorer'. Compete on the leaderboard."
              />
              <FeatureCard
                icon={<Globe className="h-7 w-7 text-primary" />}
                title="Multi-Language Support"
                description="Full support for English, Telugu, Hindi, Tamil, and Kannada. AI translates all content instantly."
              />
              <FeatureCard
                icon={<Shield className="h-7 w-7 text-primary" />}
                title="Emergency Assistance"
                description="One-tap access to police (100), ambulance (108), tourist helpline (1363). Submit site complaints directly."
              />
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
            <div className="glass rounded-3xl p-12 border border-primary/20 glow-gold">
              <QrCode className="h-14 w-14 text-primary mx-auto mb-6 float" />
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Ready to Explore India&apos;s Heritage?
              </h2>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Join 12,000+ explorers who are discovering history through the lens of AI. Sign up free and start earning your Digital Heritage Passport today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button
                    size="lg"
                    id="cta-signup-btn"
                    className="h-13 px-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 gap-2"
                  >
                    <Compass className="h-5 w-5" /> Start Free Journey
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    size="lg"
                    variant="outline"
                    id="cta-explore-btn"
                    className="h-13 px-10 text-base border-border/60 gap-2"
                  >
                    <MapPin className="h-5 w-5" /> Browse Sites
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-10 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              <span className="font-semibold">Smart Heritage Guide</span>
            </div>
            <p className="text-foreground/50 text-sm text-center">
              Built for the Hackathon 2026 · AI-Powered Heritage Tourism Platform
            </p>
            <div className="flex gap-4 text-sm text-foreground/50">
              <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
              <Link href="/passport" className="hover:text-primary transition-colors">Passport</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="glass p-6 rounded-2xl flex flex-col items-start hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden">
      {badge && (
        <span className="absolute top-4 right-4 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/30">
          {badge}
        </span>
      )}
      <div className="mb-4 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/65 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
