import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

interface Portfolio { title: string; client: string; category: string; image: string; description: string; }
const KEY = "cms_portfolio";
const seed: WithId<Portfolio>[] = [
  { id: "p1", title: "Sertifikasi PT Maju", client: "PT Maju Bersama", category: "NIDI", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600", description: "Sertifikasi instalasi listrik kantor pusat" },
  { id: "p2", title: "SLO Pabrik Tekstil", client: "PT Sandang", category: "SLO", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600", description: "SLO instalasi 1500kVA" },
];
const empty: Partial<Portfolio> = { title: "", client: "", category: "", image: "", description: "" };

const CmsPortfolio = () => {
  const [list, setList] = useState<WithId<Portfolio>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Portfolio>>>(empty);
  const persist = (n: WithId<Portfolio>[]) => { saveList(KEY, n); setList(n); };
  const save = () => {
    if (!form.title) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Portfolio> : x));
    else persist([{ ...(form as Portfolio), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus portofolio?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell title="CMS - Portofolio" subtitle="Kelola proyek portofolio di landing page"
      actions={<button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"><HiOutlinePlus size={16} /> Tambah Portofolio</button>}>
      <DataTable<WithId<Portfolio>>
        data={list}
        searchKeys={["title", "client", "category"]}
        columns={[
          { key: "image", label: "Gambar", render: (r) => r.image ? <img src={r.image} alt={r.title} className="w-14 h-10 rounded object-cover" /> : <div className="w-14 h-10 rounded bg-slate-200" /> },
          { key: "title", label: "Judul", render: (r) => <span className="font-semibold text-slate-900">{r.title}</span> },
          { key: "client", label: "Klien" },
          { key: "category", label: "Kategori", render: (r) => <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{r.category}</span> },
          { key: "actions", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
            </div>
          )},
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit Portofolio" : "Tambah Portofolio"} size="lg"
        footer={<><button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button><button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Judul</label><input value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={150} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Klien</label><input value={form.client || ""} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label><input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={50} /></div>
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">URL Gambar</label><input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={500} placeholder="https://..." /></div>
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi</label><textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={500} /></div>
        </div>
      </Modal>
    </AppShell>
  );
};
export default CmsPortfolio;
