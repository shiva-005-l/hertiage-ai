"use client";

export type UserRole = "user" | "admin" | "guest";

export type DemoUser = {
  id: string;
  role: UserRole;
  identifier: string;
  displayName: string;
  signedInAt: string;
  visitedSites: string[];
};

export type StoredUserProfile = DemoUser & {
  lastLoginAt: string;
  loginCount: number;
};

export const ADMIN_EMAIL = "admin@smartheritage.in";
export const ADMIN_PHONE = "+919999999999";
export const ADMIN_PASSWORD = "admin123";

const AUTH_STORAGE_KEY = "smart-heritage-auth";
const AUTH_USERS_STORAGE_KEY = "smart-heritage-users";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("91") ? `+${digits}` : `+91${digits}`;
}

function normalizeIdentifier(value: string) {
  const trimmedValue = value.trim().toLowerCase();
  if (trimmedValue.includes("@")) return trimmedValue;
  if (!trimmedValue || trimmedValue === "guest" || trimmedValue === "google-user") return trimmedValue;
  return normalizePhone(trimmedValue);
}

function createUserId(role: UserRole, identifier: string) {
  return `${role}:${normalizeIdentifier(identifier) || "anonymous"}`;
}

function createDisplayName(identifier: string, role: UserRole) {
  if (role === "guest") return "Guest Explorer";
  if (role === "admin") return "Admin";
  if (identifier === "google-user") return "Google User";
  if (identifier.includes("@")) return identifier.split("@")[0].replace(/[._-]+/g, " ");
  return "Heritage Explorer";
}

function readStoredUsersRaw(): StoredUserProfile[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(AUTH_USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUserProfile[]) : [];
  } catch {
    return [];
  }
}

function writeStoredUsers(users: StoredUserProfile[]) {
  window.localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event("smart-heritage-users-updated"));
}

export function isAdminCredential(identifier: string, password: string) {
  return isAdminIdentifier(identifier) && password === ADMIN_PASSWORD;
}

export function isAdminIdentifier(identifier: string) {
  const trimmedIdentifier = identifier.trim().toLowerCase();
  const normalizedAdminPhone = normalizePhone(ADMIN_PHONE);
  const normalizedInputPhone = normalizePhone(identifier);

  return trimmedIdentifier === ADMIN_EMAIL || normalizedInputPhone === normalizedAdminPhone;
}

export function createAuthSession(role: UserRole, identifier: string) {
  const signedInAt = new Date().toISOString();
  const id = createUserId(role, identifier);
  const users = readStoredUsersRaw();
  const existingUser = users.find((storedUser) => storedUser.id === id);
  const displayName = existingUser?.displayName || createDisplayName(identifier, role);
  const visitedSites = existingUser?.visitedSites || [];

  const user: DemoUser = {
    id,
    role,
    identifier,
    displayName,
    signedInAt,
    visitedSites,
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  if (role !== "admin") {
    const nextUsers = existingUser
      ? users.map((storedUser) =>
          storedUser.id === id
            ? {
                ...storedUser,
                identifier,
                displayName,
                signedInAt: storedUser.signedInAt,
                lastLoginAt: signedInAt,
                loginCount: storedUser.loginCount + 1,
              }
            : storedUser
        )
      : [
          ...users,
          {
            ...user,
            lastLoginAt: signedInAt,
            loginCount: 1,
          },
        ];

    writeStoredUsers(nextUsers);
  }
  window.dispatchEvent(new Event("smart-heritage-auth-updated"));
  return user;
}

export function readAuthSession(): DemoUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as Partial<DemoUser>;
    if (!session.role || !session.identifier || !session.signedInAt) return null;

    return {
      id: session.id || createUserId(session.role, session.identifier),
      role: session.role,
      identifier: session.identifier,
      displayName: session.displayName || createDisplayName(session.identifier, session.role),
      signedInAt: session.signedInAt,
      visitedSites: session.visitedSites || [],
    };
  } catch {
    return null;
  }
}

export function readStoredUsers() {
  return readStoredUsersRaw().filter((storedUser) => storedUser.role !== "admin");
}

export function updateCurrentUserName(displayName: string) {
  const trimmedName = displayName.trim();
  if (!trimmedName) return readAuthSession();

  const currentSession = readAuthSession();
  if (!currentSession) return null;

  const nextSession = {
    ...currentSession,
    displayName: trimmedName,
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));

  if (currentSession.role !== "admin") {
    const users = readStoredUsersRaw();
    const existingUser = users.some((storedUser) => storedUser.id === currentSession.id);
    const nextUsers = existingUser
      ? users.map((storedUser) =>
          storedUser.id === currentSession.id
            ? {
                ...storedUser,
                displayName: trimmedName,
              }
            : storedUser
        )
      : [
          ...users,
          {
            ...nextSession,
            lastLoginAt: currentSession.signedInAt,
            loginCount: 1,
          },
        ];
    writeStoredUsers(nextUsers);
  }

  window.dispatchEvent(new Event("smart-heritage-auth-updated"));
  return nextSession;
}

export function markCurrentUserSiteVisited(siteId: string) {
  const currentSession = readAuthSession();
  if (!currentSession || currentSession.role === "admin") return currentSession;

  const visitedSites = currentSession.visitedSites.includes(siteId)
    ? currentSession.visitedSites
    : [...currentSession.visitedSites, siteId];

  const nextSession = {
    ...currentSession,
    visitedSites,
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));

  const users = readStoredUsersRaw();
  const existingUser = users.some((storedUser) => storedUser.id === currentSession.id);
  const nextUsers = existingUser
    ? users.map((storedUser) =>
        storedUser.id === currentSession.id
          ? {
              ...storedUser,
              visitedSites,
            }
          : storedUser
      )
    : [
        ...users,
        {
          ...nextSession,
          lastLoginAt: currentSession.signedInAt,
          loginCount: 1,
        },
      ];

  writeStoredUsers(nextUsers);
  window.dispatchEvent(new Event("smart-heritage-auth-updated"));
  return nextSession;
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("smart-heritage-auth-updated"));
}

export function generateOtp() {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  return String(100000 + (buffer[0] % 900000));
}
