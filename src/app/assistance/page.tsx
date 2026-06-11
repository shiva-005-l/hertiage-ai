"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, ShieldAlert, AlertTriangle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function AssistancePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
            <ShieldAlert className="h-10 w-10 text-destructive" />
            {t('assistance.title')}
          </h1>
          <p className="text-foreground/70 text-lg">{t('assistance.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="glass border-red-500/20 shadow-red-500/10">
            <CardHeader className="bg-red-500/10 rounded-t-xl">
              <CardTitle className="text-red-500 flex items-center gap-2">
                <Phone className="h-5 w-5" /> Quick Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <ContactRow title="Police Station" number="100" icon={<ShieldAlert className="h-4 w-4" />} />
              <ContactRow title="Ambulance" number="108" icon={<Phone className="h-4 w-4" />} />
              <ContactRow title="Tourist Helpline" number="1363" icon={<Phone className="h-4 w-4" />} />
              <ContactRow title="Women Helpline" number="1091" icon={<Phone className="h-4 w-4" />} />
            </CardContent>
          </Card>

          <Card className="glass border-primary/20">
            <CardHeader className="bg-primary/10 rounded-t-xl">
              <CardTitle className="text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Nearby Facilities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <FacilityRow name="Osmania General Hospital" distance="1.2 km" />
              <FacilityRow name="Charminar Police Station" distance="0.5 km" />
              <FacilityRow name="Telangana Tourism Office" distance="2.4 km" />
              <FacilityRow name="Apollo Emergency Care" distance="3.1 km" />
            </CardContent>
          </Card>
        </div>

        <section className="max-w-3xl mx-auto">
          <Card className="glass border-yellow-500/30">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                {t('assistance.reportTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-center">
              <p className="text-sm text-foreground/65">
                Report garbage overflow, damaged seating, vandalism, or other site issues on the dedicated reporting page.
              </p>
              <Link href="/report">
                <Button className="gap-2">
                  {t('assistance.submit')} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function ContactRow({ title, number, icon }: { title: string, number: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <a href={`tel:${number}`} className="text-xl font-bold tracking-wider text-red-500 hover:underline">
        {number}
      </a>
    </div>
  );
}

function FacilityRow({ name, distance }: { name: string, distance: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50">
      <span className="font-medium">{name}</span>
      <Badge variant="outline" className="bg-background">{distance}</Badge>
    </div>
  );
}
