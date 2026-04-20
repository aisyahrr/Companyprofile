// Simple localStorage-based admin auth (demo only, NOT secure for production)
const KEY = "rca_admin_session";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "admin123";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(KEY, JSON.stringify({ user: username, ts: Date.now() }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(KEY);
}

export function getUser(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw).user;
  } catch {
    return null;
  }
}
