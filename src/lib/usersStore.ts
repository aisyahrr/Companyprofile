import { DEMO_USERS, Role } from "./auth";
import { genId } from "./crudStore";

export interface ManagedUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  active: boolean;
  createdAt: number;
}

const KEY = "rca_users";

export function loadUsers(): ManagedUser[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seed: ManagedUser[] = DEMO_USERS.filter((u) => u.username !== "admin").map((u) => ({
        id: u.id,
        username: u.username,
        name: u.name,
        email: u.email,
        role: u.role,
        password: u.password,
        active: true,
        createdAt: Date.now(),
      }));
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveUsers(list: ManagedUser[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertUser(u: Partial<ManagedUser> & { id?: string }): ManagedUser {
  const list = loadUsers();
  if (u.id) {
    const idx = list.findIndex((x) => x.id === u.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...u } as ManagedUser;
      saveUsers(list);
      return list[idx];
    }
  }
  const created: ManagedUser = {
    id: genId(),
    username: u.username || "",
    name: u.name || "",
    email: u.email || "",
    role: (u.role as Role) || "petugas",
    password: u.password || "password123",
    active: u.active ?? true,
    createdAt: Date.now(),
  };
  list.unshift(created);
  saveUsers(list);
  return created;
}

export function deleteUser(id: string) {
  saveUsers(loadUsers().filter((u) => u.id !== id));
}
