// Generic localStorage-backed CRUD store
export type WithId<T> = T & { id: string };

export function loadList<T>(key: string, seed: WithId<T>[] = []): WithId<T>[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as WithId<T>[];
  } catch {
    return seed;
  }
}

export function saveList<T>(key: string, list: WithId<T>[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
