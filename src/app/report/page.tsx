"use client";

import { Navbar } from "@/components/layout/Navbar";
import { IssueReportForm } from "@/components/features/IssueReportForm";
import { useLanguage } from "@/lib/language";

export default function ReportIssuePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">{t("assistance.reportTitle")}</h1>
          <p className="text-foreground/70">
            Submit a site issue with details and optional photo evidence. The admin dashboard will show new reports immediately in this browser.
          </p>
        </div>
        <IssueReportForm />
      </main>
    </div>
  );
}
