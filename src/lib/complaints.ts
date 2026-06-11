export type Complaint = {
  id: string;
  category: string;
  site: string;
  description: string;
  photoName?: string;
  photoDataUrl?: string;
  status: "Pending" | "In Progress" | "Resolved";
  createdAt: string;
};

const STORAGE_KEY = "smart-heritage-complaints";

export function readComplaints(): Complaint[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Complaint[]) : [];
  } catch {
    return [];
  }
}

export function writeComplaints(complaints: Complaint[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

export function addComplaint(complaint: Omit<Complaint, "id" | "status" | "createdAt">) {
  const nextComplaint: Complaint = {
    ...complaint,
    id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  const complaints = [nextComplaint, ...readComplaints()];
  writeComplaints(complaints);
  window.dispatchEvent(new Event("smart-heritage-complaints-updated"));
  return nextComplaint;
}

export function updateComplaintStatus(id: string, status: Complaint["status"]) {
  const complaints = readComplaints().map((complaint) =>
    complaint.id === id ? { ...complaint, status } : complaint,
  );
  writeComplaints(complaints);
  window.dispatchEvent(new Event("smart-heritage-complaints-updated"));
  return complaints;
}
