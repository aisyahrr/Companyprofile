// Certification (NIDI & SLO) data store - localStorage
import { genId } from "./crudStore";

export type CertStatus =
  | "Draft"
  | "Revisi"
  | "Validasi NIDI"
  | "NIDI Selesai"
  | "Proses SLO"
  | "Final Approval"
  | "Selesai"
  | "Ditolak";

export interface CertRecord {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  idNumber: string; // NIK / ID pelanggan
  capacity: string; // VA
  installationType: string;
  documents: string[]; // file names
  notes: string;
  status: CertStatus;
  createdBy: string; // username
  createdAt: number;
  updatedAt: number;
  // workflow fields
  rejectReason?: string;
  plnStep1?: string;
  plnStep2?: string;
  nidiNumber?: string;
  sloDocuments?: string[];
  sloNumber?: string;
  history: Array<{ ts: number; by: string; action: string; note?: string }>;
}

const KEY = "rca_certs";

const seed: CertRecord[] = [
  {
    id: "c-1",
    customerName: "PT Mitra Listrik Jaya",
    address: "Jl. Sudirman 12, Jakarta",
    phone: "08123456789",
    idNumber: "3174012345678901",
    capacity: "5500 VA",
    installationType: "Industri",
    documents: ["KTP.pdf", "NPWP.pdf"],
    notes: "Permohonan baru",
    status: "Validasi NIDI",
    createdBy: "petugas",
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
    history: [
      { ts: Date.now() - 86400000 * 5, by: "petugas", action: "Dibuat" },
      { ts: Date.now() - 86400000 * 2, by: "petugas", action: "Dikirim ke NIDI" },
    ],
  },
  {
    id: "c-2",
    customerName: "CV Sejahtera Abadi",
    address: "Jl. Gatot Subroto 45, Bandung",
    phone: "08987654321",
    idNumber: "3273098765432109",
    capacity: "2200 VA",
    installationType: "Komersial",
    documents: ["KTP.pdf"],
    notes: "",
    status: "Draft",
    createdBy: "petugas",
    createdAt: Date.now() - 86400000 * 1,
    updatedAt: Date.now() - 86400000 * 1,
    history: [{ ts: Date.now() - 86400000, by: "petugas", action: "Dibuat" }],
  },
  {
    id: "c-3",
    customerName: "Toko Bangunan Maju",
    address: "Jl. Diponegoro 7, Surabaya",
    phone: "08111222333",
    idNumber: "3578011122233344",
    capacity: "1300 VA",
    installationType: "Komersial",
    documents: ["KTP.pdf", "Denah.pdf"],
    notes: "",
    status: "Proses SLO",
    createdBy: "petugas",
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 1,
    plnStep1: "PLN-001/2026",
    plnStep2: "PLN-002/2026",
    nidiNumber: "NIDI-2026-0001",
    history: [
      { ts: Date.now() - 86400000 * 10, by: "petugas", action: "Dibuat" },
      { ts: Date.now() - 86400000 * 7, by: "nidi", action: "NIDI Selesai" },
    ],
  },
  {
    id: "c-4",
    customerName: "PT Karya Mandiri",
    address: "Jl. Asia Afrika 88, Bandung",
    phone: "0813999888",
    idNumber: "3273055566677788",
    capacity: "10600 VA",
    installationType: "Industri",
    documents: ["KTP.pdf", "NPWP.pdf", "IMB.pdf"],
    notes: "",
    status: "Final Approval",
    createdBy: "petugas",
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now() - 3600000,
    plnStep1: "PLN-010/2026",
    plnStep2: "PLN-011/2026",
    nidiNumber: "NIDI-2026-0002",
    sloDocuments: ["SLO-Draft.pdf"],
    sloNumber: "SLO-2026-0001",
    history: [
      { ts: Date.now() - 86400000 * 15, by: "petugas", action: "Dibuat" },
      { ts: Date.now() - 86400000 * 10, by: "nidi", action: "NIDI Selesai" },
      { ts: Date.now() - 3600000, by: "slo", action: "Diajukan Final Approval" },
    ],
  },
  {
    id: "c-5",
    customerName: "Hotel Permata",
    address: "Jl. Pahlawan 1, Semarang",
    phone: "08122333444",
    idNumber: "3374011223344556",
    capacity: "23000 VA",
    installationType: "Komersial",
    documents: ["KTP.pdf"],
    notes: "Selesai 100%",
    status: "Selesai",
    createdBy: "petugas",
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now() - 86400000 * 2,
    plnStep1: "PLN-020/2026",
    plnStep2: "PLN-021/2026",
    nidiNumber: "NIDI-2026-0003",
    sloDocuments: ["SLO-Final.pdf"],
    sloNumber: "SLO-2026-0002",
    history: [
      { ts: Date.now() - 86400000 * 30, by: "petugas", action: "Dibuat" },
      { ts: Date.now() - 86400000 * 2, by: "superadmin", action: "Disetujui Final" },
    ],
  },
];

export function loadCerts(): CertRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as CertRecord[];
  } catch {
    return seed;
  }
}

export function saveCerts(list: CertRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getCert(id: string): CertRecord | undefined {
  return loadCerts().find((c) => c.id === id);
}

export function upsertCert(rec: Partial<CertRecord> & { id?: string }, by: string, action: string, note?: string): CertRecord {
  const list = loadCerts();
  const now = Date.now();
  if (rec.id) {
    const idx = list.findIndex((c) => c.id === rec.id);
    if (idx >= 0) {
      const updated: CertRecord = {
        ...list[idx],
        ...rec,
        id: list[idx].id,
        updatedAt: now,
        history: [...list[idx].history, { ts: now, by, action, note }],
      } as CertRecord;
      list[idx] = updated;
      saveCerts(list);
      pushActivity({ ts: now, by, action: `${action}: ${updated.customerName}` });
      return updated;
    }
  }
  const created: CertRecord = {
    id: genId(),
    customerName: rec.customerName ?? "",
    address: rec.address ?? "",
    phone: rec.phone ?? "",
    idNumber: rec.idNumber ?? "",
    capacity: rec.capacity ?? "",
    installationType: rec.installationType ?? "",
    documents: rec.documents ?? [],
    notes: rec.notes ?? "",
    status: rec.status ?? "Draft",
    createdBy: by,
    createdAt: now,
    updatedAt: now,
    history: [{ ts: now, by, action: "Dibuat" }],
    ...rec,
  } as CertRecord;
  list.unshift(created);
  saveCerts(list);
  pushActivity({ ts: now, by, action: `Membuat data: ${created.customerName}` });
  return created;
}

export function deleteCert(id: string) {
  const list = loadCerts().filter((c) => c.id !== id);
  saveCerts(list);
}

// Activity log
export interface Activity {
  ts: number;
  by: string;
  action: string;
}
const ACT_KEY = "rca_activity";
export function loadActivity(): Activity[] {
  try {
    return JSON.parse(localStorage.getItem(ACT_KEY) || "[]");
  } catch {
    return [];
  }
}
export function pushActivity(a: Activity) {
  const list = loadActivity();
  list.unshift(a);
  localStorage.setItem(ACT_KEY, JSON.stringify(list.slice(0, 100)));
}

// Notifications per user
export interface Notif {
  id: string;
  to: string; // username or role
  title: string;
  body?: string;
  ts: number;
  read: boolean;
}
const NOTIF_KEY = "rca_notifs";
export function loadNotifs(): Notif[] {
  try {
    return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]");
  } catch {
    return [];
  }
}
export function pushNotif(n: Omit<Notif, "id" | "ts" | "read">) {
  const list = loadNotifs();
  list.unshift({ ...n, id: genId(), ts: Date.now(), read: false });
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list.slice(0, 200)));
}
export function markNotifRead(id: string) {
  const list = loadNotifs().map((n) => (n.id === id ? { ...n, read: true } : n));
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
}
export function notifsFor(usernameOrRole: string[]): Notif[] {
  return loadNotifs().filter((n) => usernameOrRole.includes(n.to));
}

export const STATUS_COLORS: Record<CertStatus, string> = {
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
  Revisi: "bg-amber-100 text-amber-700 border-amber-200",
  "Validasi NIDI": "bg-blue-100 text-blue-700 border-blue-200",
  "NIDI Selesai": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Proses SLO": "bg-violet-100 text-violet-700 border-violet-200",
  "Final Approval": "bg-orange-100 text-orange-700 border-orange-200",
  Selesai: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Ditolak: "bg-red-100 text-red-700 border-red-200",
};
