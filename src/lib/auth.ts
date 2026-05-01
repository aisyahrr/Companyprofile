// localStorage-based multi-role auth (demo only)
const KEY = "rca_session";

export type Role = "super_admin" | "petugas" | "admin_nidi" | "admin_slo";

export interface SessionUser {
  id: string;
  username: string;
  name: string;
  role: Role;
  email: string;
}

// Demo accounts (also seeded into user management)
export const DEMO_USERS: Array<SessionUser & { password: string }> = [
  { id: "u-1", username: "superadmin", password: "admin123", name: "Super Admin", role: "super_admin", email: "super@rca.id" },
  { id: "u-2", username: "petugas", password: "admin123", name: "Budi Petugas", role: "petugas", email: "petugas@rca.id" },
  { id: "u-3", username: "nidi", password: "admin123", name: "Sari Admin NIDI", role: "admin_nidi", email: "nidi@rca.id" },
  { id: "u-4", username: "slo", password: "admin123", name: "Rian Admin SLO", role: "admin_slo", email: "slo@rca.id" },
  // legacy
  { id: "u-0", username: "admin", password: "admin123", name: "Admin RCA", role: "super_admin", email: "admin@rca.id" },
];

export function login(username: string, password: string): SessionUser | null {
  const u = DEMO_USERS.find((x) => x.username === username && x.password === password);
  if (!u) return null;
  const { password: _p, ...session } = u;
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getSession();
}

export function getUser(): string | null {
  return getSession()?.username ?? null;
}

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  petugas: "Petugas",
  admin_nidi: "Admin NIDI",
  admin_slo: "Admin SLO",
};

export const ROLE_HOME: Record<Role, string> = {
  super_admin: "/app/super",
  petugas: "/app/petugas",
  admin_nidi: "/app/nidi",
  admin_slo: "/app/slo",
};
