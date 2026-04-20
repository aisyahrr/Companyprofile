import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { cn } from "@/lib/utils";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "email" | "url" | "select";
  options?: string[];
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  render?: (row: WithId<T>) => React.ReactNode;
  className?: string;
}

interface CrudPageProps<T> {
  title: string;
  subtitle: string;
  storageKey: string;
  seed: WithId<T>[];
  columns: ColumnDef<T>[];
  fields: FieldDef[];
  searchKeys?: (keyof T)[];
}

export function CrudPage<T extends Record<string, any>>({
  title,
  subtitle,
  storageKey,
  seed,
  columns,
  fields,
  searchKeys = [],
}: CrudPageProps<T>) {
  const [items, setItems] = useState<WithId<T>[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<WithId<T> | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setItems(loadList<T>(storageKey, seed));
  }, [storageKey]);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [items, search, searchKeys]);

  const openNew = () => {
    setEditing(null);
    setForm({});
    setErrors({});
    setOpen(true);
  };

  const openEdit = (row: WithId<T>) => {
    setEditing(row);
    setForm({ ...row });
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveList(storageKey, next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      const val = form[f.name];
      if (f.required && (val === undefined || val === null || String(val).trim() === "")) {
        errs[f.name] = `${f.label} wajib diisi`;
      }
      if (f.maxLength && val && String(val).length > f.maxLength) {
        errs[f.name] = `Maksimal ${f.maxLength} karakter`;
      }
      if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        errs[f.name] = "Email tidak valid";
      }
    });
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    let next: WithId<T>[];
    if (editing) {
      next = items.map((i) => (i.id === editing.id ? ({ ...editing, ...form } as WithId<T>) : i));
    } else {
      next = [{ id: genId(), ...form } as WithId<T>, ...items];
    }
    setItems(next);
    saveList(storageKey, next);
    setOpen(false);
  };

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      <div className="bg-card border border-border rounded-xl">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={openNew}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:bg-primary/90"
          >
            <FiPlus size={14} /> Tambah Baru
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/40 border-b border-border">
                {columns.map((c) => (
                  <th key={String(c.key)} className={cn("text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider", c.className)}>
                    {c.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-12 text-muted-foreground">
                    Belum ada data. Klik <strong className="text-foreground">Tambah Baru</strong> untuk memulai.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    {columns.map((c) => (
                      <td key={String(c.key)} className={cn("px-4 py-3 text-foreground", c.className)}>
                        {c.render ? c.render(row) : String(row[c.key as keyof typeof row] ?? "")}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(row)}
                          className="w-8 h-8 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary flex items-center justify-center"
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center"
                          title="Hapus"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border text-xs text-muted-foreground">
          Menampilkan {filtered.length} dari {items.length} data
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div
            className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold text-foreground">{editing ? "Edit" : "Tambah"} Data</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {f.label} {f.required && <span className="text-destructive">*</span>}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      maxLength={f.maxLength}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    >
                      <option value="">-- Pilih --</option>
                      {f.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type ?? "text"}
                      value={form[f.name] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value })
                      }
                      placeholder={f.placeholder}
                      maxLength={f.maxLength}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                  )}
                  {errors[f.name] && <p className="text-xs text-destructive mt-1">{errors[f.name]}</p>}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
                >
                  {editing ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
