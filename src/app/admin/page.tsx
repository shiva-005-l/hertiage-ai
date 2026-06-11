"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, MapPin, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Complaint, readComplaints, updateComplaintStatus } from "@/lib/complaints";
import { useLanguage } from "@/lib/language";
import { DemoUser, readAuthSession, readStoredUsers, StoredUserProfile } from "@/lib/auth";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'complaints' | 'contributions'>('analytics');
  const [userComplaints, setUserComplaints] = useState<Complaint[]>([]);
  const [userLogins, setUserLogins] = useState<StoredUserProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const loadAuth = () => {
      const session = readAuthSession();
      setCurrentUser(session);
      setIsCheckingAuth(false);

      if (session?.role !== "admin") {
        router.replace("/login");
      }
    };

    loadAuth();
    window.addEventListener("smart-heritage-auth-updated", loadAuth);
    window.addEventListener("storage", loadAuth);
    return () => {
      window.removeEventListener("smart-heritage-auth-updated", loadAuth);
      window.removeEventListener("storage", loadAuth);
    };
  }, [router]);

  useEffect(() => {
    const loadUsers = () => setUserLogins(readStoredUsers());
    loadUsers();
    window.addEventListener("smart-heritage-users-updated", loadUsers);
    window.addEventListener("smart-heritage-auth-updated", loadUsers);
    window.addEventListener("storage", loadUsers);
    return () => {
      window.removeEventListener("smart-heritage-users-updated", loadUsers);
      window.removeEventListener("smart-heritage-auth-updated", loadUsers);
      window.removeEventListener("storage", loadUsers);
    };
  }, []);

  useEffect(() => {
    const loadComplaints = () => setUserComplaints(readComplaints());
    loadComplaints();
    window.addEventListener("smart-heritage-complaints-updated", loadComplaints);
    window.addEventListener("storage", loadComplaints);
    return () => {
      window.removeEventListener("smart-heritage-complaints-updated", loadComplaints);
      window.removeEventListener("storage", loadComplaints);
    };
  }, []);

  const handleResolveComplaint = (id: string) => {
    setUserComplaints(updateComplaintStatus(id, "Resolved"));
  };

  const openComplaintCount = userComplaints.filter((complaint) => complaint.status !== "Resolved").length + 2;
  const totalUserLogins = userLogins.reduce((total, user) => total + user.loginCount, 0);

  if (isCheckingAuth || currentUser?.role !== "admin") {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-16">
          <p className="text-sm text-foreground/60">Opening admin dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('admin.title')}</h1>
            <p className="text-foreground/60">{t('admin.subtitle')}</p>
          </div>
          <div className="flex gap-2 bg-accent p-1 rounded-lg">
            <Button 
              variant={activeTab === 'analytics' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTab('analytics')}
            >
              {t('admin.analytics')}
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTab('users')}
            >
              Users
            </Button>
            <Button 
              variant={activeTab === 'complaints' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTab('complaints')}
            >
              {t('admin.complaints')}
            </Button>
            <Button 
              variant={activeTab === 'contributions' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTab('contributions')}
            >
              {t('admin.contributions')}
            </Button>
          </div>
        </div>

        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard title="Stored User Profiles" value={userLogins.length.toString()} icon={<Users className="h-4 w-4 text-primary" />} trend="live" />
              <KpiCard title="Total User Logins" value={totalUserLogins.toString()} icon={<BarChart3 className="h-4 w-4 text-primary" />} trend="live" />
              <KpiCard title="Most Visited Site" value="Charminar" icon={<MapPin className="h-4 w-4 text-primary" />} trend="High Crowd" />
              <KpiCard title="Open Complaints" value={openComplaintCount.toString()} icon={<AlertCircle className="h-4 w-4 text-destructive" />} trend="live" isNegative />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Visitor Demographics (Languages)</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-end justify-between gap-2 pt-4">
                  <Bar height="h-[80%]" label="EN" value="45%" />
                  <Bar height="h-[60%]" label="TE" value="30%" />
                  <Bar height="h-[40%]" label="HI" value="15%" />
                  <Bar height="h-[20%]" label="TA" value="7%" />
                  <Bar height="h-[10%]" label="KN" value="3%" />
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Peak Hours Tracker</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-end justify-between gap-2 pt-4">
                  <Bar height="h-[20%]" label="8 AM" value="Low" />
                  <Bar height="h-[40%]" label="11 AM" value="Med" />
                  <Bar height="h-[90%]" label="2 PM" value="High" color="bg-destructive" />
                  <Bar height="h-[100%]" label="5 PM" value="High" color="bg-destructive" />
                  <Bar height="h-[60%]" label="8 PM" value="Med" />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h2 className="text-xl font-semibold">User Login Info</h2>
              <p className="text-sm text-foreground/60">Visitor and guest logins saved in this browser.</p>
            </div>
            {userLogins.length === 0 ? (
              <Card className="border-border/50 glass">
                <CardContent className="p-6 text-sm text-foreground/60">
                  No user logins saved yet. When a visitor signs in, their profile will appear here.
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {userLogins
                  .slice()
                  .sort((a, b) => new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime())
                  .map((user) => (
                    <UserLoginCard key={user.id} user={user} />
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4">{t('admin.recentComplaints')}</h2>
            <div className="grid grid-cols-1 gap-4">
              {userComplaints.length === 0 && (
                <Card className="border-border/50 glass">
                  <CardContent className="p-6 text-sm text-foreground/60">
                    No user complaints submitted yet. Submit one from the Assistance page and it will appear here.
                  </CardContent>
                </Card>
              )}
              {userComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  site={complaint.site}
                  issue={complaint.category}
                  desc={complaint.description}
                  status={complaint.status}
                  date={formatComplaintDate(complaint.createdAt)}
                  photoName={complaint.photoName}
                  photoDataUrl={complaint.photoDataUrl}
                  onResolve={() => handleResolveComplaint(complaint.id)}
                />
              ))}
              <ComplaintCard 
                site="Charminar" 
                issue="Garbage Overflow" 
                desc="Trash bins near the south gate are overflowing since yesterday."
                status="Pending"
                date="2 hours ago"
                onResolve={() => undefined}
              />
              <ComplaintCard 
                site="Golconda Fort" 
                issue="Damaged Infrastructure" 
                desc="Handrail on the stairs leading to the durbar hall is broken."
                status="In Progress"
                date="1 day ago"
                onResolve={() => undefined}
              />
            </div>
          </div>
        )}

        {activeTab === 'contributions' && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4">Pending Community Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContributionCard 
                user="Aryan Explorer" 
                site="Chowmahalla Palace"
                type="Photo & Story"
                desc="Added a detailed description of the vintage car collection."
              />
              <ContributionCard 
                user="HistoryBuff99" 
                site="Charminar"
                type="Historical Fact"
                desc="Submitted a correction regarding the exact year of construction."
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
  trend,
  isNegative = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isNegative?: boolean;
}) {
  return (
    <Card className="glass border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/60">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs mt-1 ${isNegative ? 'text-destructive' : 'text-green-500'}`}>{trend === 'live' ? 'Updated in this browser' : `${trend} from last month`}</p>
      </CardContent>
    </Card>
  );
}

function Bar({
  height,
  label,
  value,
  color = "bg-primary",
}: {
  height: string;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-end h-full w-full">
      <span className="text-xs text-foreground/50 mb-1">{value}</span>
      <div className={`w-full max-w-[40px] rounded-t-md ${height} ${color} transition-all`} />
      <span className="text-xs font-medium mt-2">{label}</span>
    </div>
  );
}

function formatComplaintDate(createdAt: string) {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "Just now";

  const minutes = Math.max(0, Math.round((Date.now() - created.getTime()) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatLoginDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function UserLoginCard({ user }: { user: StoredUserProfile }) {
  const initial = user.displayName.charAt(0).toUpperCase();

  return (
    <Card className="border-border/50 glass">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-base font-bold text-primary">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-semibold">{user.displayName}</h3>
                <Badge variant={user.role === "guest" ? "secondary" : "outline"}>{user.role}</Badge>
              </div>
              <p className="truncate text-sm text-foreground/60">{user.identifier}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm md:min-w-[360px] md:grid-cols-3">
            <div>
              <p className="text-xs text-foreground/45">Last Login</p>
              <p className="font-medium">{formatLoginDate(user.lastLoginAt)}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/45">First Seen</p>
              <p className="font-medium">{formatLoginDate(user.signedInAt)}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/45">Logins</p>
              <p className="font-medium">{user.loginCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComplaintCard({
  site,
  issue,
  desc,
  status,
  date,
  photoName,
  photoDataUrl,
  onResolve,
}: {
  site: string;
  issue: string;
  desc: string;
  status: "Pending" | "In Progress" | "Resolved";
  date: string;
  photoName?: string;
  photoDataUrl?: string;
  onResolve: () => void;
}) {
  return (
    <Card className="border-border/50 glass hover:bg-accent/20 transition-colors">
      <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4">
          {photoDataUrl && (
            <img src={photoDataUrl} alt={`${issue} evidence`} className="h-20 w-20 rounded-md object-cover border border-border" />
          )}
          <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{site}</Badge>
            <span className="text-xs text-foreground/50">{date}</span>
          </div>
          <h3 className="font-semibold text-lg">{issue}</h3>
          <p className="text-sm text-foreground/70">{desc}</p>
          {photoName && <p className="text-xs text-foreground/45 mt-1">Photo: {photoName}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={status === 'Pending' ? 'destructive' : 'secondary'}>{status}</Badge>
          <Button variant="outline" size="sm" onClick={onResolve} disabled={status === "Resolved"}>Resolve</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionCard({
  user,
  site,
  type,
  desc,
}: {
  user: string;
  site: string;
  type: string;
  desc: string;
}) {
  return (
    <Card className="border-border/50 glass">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{user.charAt(0)}</div>
            <span className="text-sm font-medium">{user}</span>
          </div>
          <Badge variant="secondary">{type}</Badge>
        </div>
        <h4 className="font-semibold mb-1">{site}</h4>
        <p className="text-sm text-foreground/70 mb-4">{desc}</p>
        <div className="flex gap-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" size="sm">
            <CheckCircle className="h-4 w-4 mr-1" /> Approve
          </Button>
          <Button variant="destructive" className="flex-1" size="sm">
            <XCircle className="h-4 w-4 mr-1" /> Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
