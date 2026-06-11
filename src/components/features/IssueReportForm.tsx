"use client";

import React, { useRef, useState } from "react";
import { AlertTriangle, Send, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addComplaint } from "@/lib/complaints";
import { useLanguage } from "@/lib/language";

export function IssueReportForm() {
  const [complaintStatus, setComplaintStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [category, setCategory] = useState("Garbage Overflow");
  const [site, setSite] = useState("Charminar");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();
  const [error, setError] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhoto(null);
      setPhotoDataUrl(undefined);
      setError("Please upload an image file for verification.");
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(typeof reader.result === "string" ? reader.result : undefined);
    reader.readAsDataURL(file);
  };

  const handleComplaintSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Please describe the issue before submitting.");
      return;
    }

    setComplaintStatus("submitting");
    setTimeout(() => {
      addComplaint({
        category,
        site,
        description: description.trim(),
        photoName: photo?.name,
        photoDataUrl,
      });
      setDescription("");
      setPhoto(null);
      setPhotoDataUrl(undefined);
      if (photoInputRef.current) photoInputRef.current.value = "";
      setComplaintStatus("success");
      setTimeout(() => setComplaintStatus("idle"), 3000);
    }, 900);
  };

  return (
    <Card className="glass border-yellow-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          {t("assistance.reportTitle")}
        </CardTitle>
        <CardDescription>
          Submit complaints about garbage overflow, damaged seating, or monument defacement. Admins will verify and take action.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleComplaintSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("assistance.category")}</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option>Garbage Overflow</option>
                <option>Damaged Infrastructure</option>
                <option>Vandalism</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("assistance.location")}</label>
              <select
                value={site}
                onChange={(event) => setSite(event.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option>Charminar</option>
                <option>Golconda Fort</option>
                <option>Chowmahalla Palace</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("assistance.description")}</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full bg-background border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <input
            ref={photoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handlePhotoChange}
          />

          <div
            className="border-2 border-dashed border-border/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-accent/30 transition-colors"
            onClick={() => photoInputRef.current?.click()}
          >
            <UploadCloud className="h-8 w-8 text-foreground/50 mb-2" />
            <span className="text-sm font-medium">{photo ? photo.name : t("assistance.upload")}</span>
            <span className="text-xs text-foreground/50">Optional, but useful for verification</span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className={`w-full ${complaintStatus === "success" ? "bg-green-600 hover:bg-green-600" : ""}`}
            disabled={complaintStatus !== "idle"}
          >
            {complaintStatus === "submitting" ? "Submitting..." : complaintStatus === "success" ? "Issue Reported Successfully!" : (
              <>
                <Send className="h-4 w-4 mr-2" /> {t("assistance.submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
