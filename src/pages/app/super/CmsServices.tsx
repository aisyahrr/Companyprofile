import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

interface Service { title: string; category: string; description: string; }
const KEY = "cms_services";
const seed: WithId<Service>[] = [
  { id: "s1", title: "Sertifikasi NIDI", category: "Sertifikasi", description: "Layanan registrasi NIDI lengkap" },
  { id: "s2", title: "Sertifikasi SLO", category: "Sertifikasi", description: "Penerbitan SLO instalasi listrik" },
  { id: "s3", title: "Konsultasi Teknik", category: "Konsultasi", description: "Konsultasi standar teknis instalasi" },
];

const empty: Partial<Service> = { title: "", category: "", description: "" };

const CmsServices = () => {
  const [list, setList] = useState<WithId<Service>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Service>>>(empty);

  const persist = (next: WithId<Service>[]) => { saveList(KEY, next); setList(next); };
  const save = () => {
    if (!form.title) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Service> : x));
    else persist([{ ...(form as Service), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell
      title="CMS - Layanan"
      subtitle="Kelola layanan di landing page"
      actions={
        <button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700">
          <HiOutlinePlus size={16} /> Tambah Layanan
        </button>
      }
    >
      <DataTable<WithId<Service>>
        data={list}
        searchKeys={["title", "category"]}
        columns={[
          { key: "title", label: "Judul", render: (r) => <span className="font-semibold text-slate-900">{r.title}</span> },
          { key: "category", label: "Kategori" },
          { key: "description", label: "Deskripsi", render: (r) => <span className="text-sm text-slate-600 line-clamp-1">{r.description}</span> },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <div className="flex justify-end gap-1">
                <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit Layanan" : "Tambah Layanan"}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button>
            <button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button>
          </>
        }>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Judul</label>
            <input value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
            <input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={50} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi</label>
            <textarea rows={4} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={500} />
          </div>
        </div>
      </Modal>
    </AppShell>
  );
};

export default CmsServices;
