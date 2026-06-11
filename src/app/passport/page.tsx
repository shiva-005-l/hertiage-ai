"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { mockUser, heritageSites } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Stamp, Star, Map, Calendar, Pencil, Save, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DemoUser, readAuthSession, updateCurrentUserName } from "@/lib/auth";

export default function PassportPage() {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState(mockUser.name);
  const totalSites = heritageSites.length;
  const visitedSiteIds = currentUser?.visitedSites || [];
  const visitedCount = visitedSiteIds.length;
  const progressPercentage = Math.round((visitedCount / totalSites) * 100);
  const displayName = currentUser?.displayName || mockUser.name;
  const displayIdentifier = currentUser?.identifier || mockUser.email;
  const pointsEarned = visitedCount * 250;
  const explorerSince = currentUser
    ? new Date(currentUser.signedInAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })
    : mockUser.joinDate;
  const earnedBadges = mockUser.badges.slice(0, Math.min(mockUser.badges.length, visitedCount));

  useEffect(() => {
    const loadAuth = () => {
      const session = readAuthSession();
      setCurrentUser(session);
      setProfileName(session?.displayName || mockUser.name);
    };

    loadAuth();
    window.addEventListener("smart-heritage-auth-updated", loadAuth);
    window.addEventListener("storage", loadAuth);
    return () => {
      window.removeEventListener("smart-heritage-auth-updated", loadAuth);
      window.removeEventListener("storage", loadAuth);
    };
  }, []);

  const handleSaveName = () => {
    const updatedSession = updateCurrentUserName(profileName);
    setCurrentUser(updatedSession);
    setProfileName(updatedSession?.displayName || displayName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setProfileName(displayName);
    setIsEditingName(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
            <Trophy className="h-10 w-10 text-primary" />
            Digital Heritage Passport
          </h1>
          <p className="text-foreground/65 text-lg">
            Track your visits, earn points, collect stamps, and unlock achievements as you explore India&apos;s heritage.
          </p>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[ 
            { label: "Points Earned", value: pointsEarned.toLocaleString(), icon: <Star className="h-4 w-4 text-primary" /> },
            { label: "Sites Visited", value: `${visitedCount} / ${totalSites}`, icon: <Map className="h-4 w-4 text-primary" /> },
            { label: "Badges Earned", value: earnedBadges.length, icon: <Medal className="h-4 w-4 text-primary" /> },
            { label: "Explorer Since", value: explorerSince, icon: <Calendar className="h-4 w-4 text-primary" /> },
          ].map((stat) => (
            <Card key={stat.label} className="glass border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-foreground/55 font-medium">{stat.label}</p>
                  <p className="font-bold text-lg leading-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {/* Profile Card */}
          <Card className="glass border-primary/25 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle>Explorer Profile</CardTitle>
              <CardDescription>Your current standing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-3xl font-bold text-primary border border-primary/20">
                    {displayName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    {isEditingName ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={profileName}
                          onChange={(event) => setProfileName(event.target.value)}
                          className="w-full rounded-lg border border-border bg-accent/50 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                          maxLength={40}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" className="h-8 gap-1" onClick={handleSaveName} disabled={!profileName.trim()}>
                            <Save className="h-3.5 w-3.5" /> Save
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleCancelEdit}>
                            <X className="h-3.5 w-3.5" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg leading-tight truncate">{displayName}</h3>
                          <p className="text-sm text-foreground/55 truncate">{displayIdentifier}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">{mockUser.level}</Badge>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => setIsEditingName(true)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit profile name</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Exploration Progress</span>
                    <span className="text-primary">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2.5" />
                  <p className="text-xs text-foreground/50">
                    {visitedCount} of {totalSites} sites visited
                  </p>
                </div>

                <Link href="/explore">
                  <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground" size="sm">
                    Explore More Sites
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="md:col-span-2 glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-primary" /> Achieved Badges
              </CardTitle>
              <CardDescription>Unlock more by visiting sites and using features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-accent/60 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-default group"
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</span>
                    <span className="font-semibold text-sm text-center leading-tight">{badge.name}</span>
                    <span className="text-xs text-foreground/50 text-center mt-1 leading-tight">{badge.description}</span>
                    <span className="text-xs text-primary/70 mt-1.5">{badge.unlockedAt}</span>
                  </div>
                ))}
                {earnedBadges.length === 0 && (
                  <div className="col-span-2 flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-accent/30 p-4 text-center sm:col-span-4">
                    <Stamp className="mb-2 h-8 w-8 text-foreground/35" />
                    <span className="font-semibold text-sm">No badges yet</span>
                    <span className="text-xs text-foreground/50 mt-1">Collect your first monument stamp to unlock one.</span>
                  </div>
                )}
                {/* Locked badge teaser */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-accent/30 border border-dashed border-border/40 opacity-50">
                  <span className="text-4xl mb-2 grayscale">🏛️</span>
                  <span className="font-semibold text-sm text-center">Grand Tour</span>
                  <span className="text-xs text-foreground/50 text-center mt-1">Visit all {totalSites} sites</span>
                  <span className="text-xs mt-1.5">🔒 Locked</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stamps Grid */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Stamp className="h-6 w-6 text-primary" /> My Heritage Stamps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heritageSites.map((site) => {
            const isVisited = visitedSiteIds.includes(site.id);
            return (
              <Card
                key={site.id}
                className={`overflow-hidden transition-all duration-300 ${
                  isVisited
                    ? "border-primary/40 shadow-lg shadow-primary/10"
                    : "opacity-60 border-border/30"
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {isVisited && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                      <div className="border-4 border-primary text-primary font-black text-xl py-2 px-6 rounded-lg rotate-[-8deg] bg-background/85 backdrop-blur-sm shadow-2xl">
                        ✓ VISITED
                      </div>
                    </div>
                  )}
                  {!isVisited && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white/60 font-medium text-sm">Not Visited Yet</span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription>{site.historicalEra}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{site.architectureStyle}</Badge>
                    {isVisited ? (
                      <Badge className="bg-green-600 hover:bg-green-600/90 text-white border-transparent">
                        Stamp Collected ✓
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-dashed">Visit to Collect</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
