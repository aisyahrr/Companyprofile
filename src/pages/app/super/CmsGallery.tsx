import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePhoto } from "react-icons/hi2";

interface Photo { title: string; url: string; }
const KEY = "cms_gallery";
const seed: WithId<Photo>[] = [
  { id: "g1", title: "Survei Lokasi", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
  { id: "g2", title: "Pemasangan Panel", url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600" },
  { id: "g3", title: "Inspeksi Akhir", url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600" },
];

const CmsGallery = () => {
  const [list, setList] = useState<WithId<Photo>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Photo>>({ title: "", url: "" });

  const persist = (n: WithId<Photo>[]) => { saveList(KEY, n); setList(n); };
  const add = () => {
    if (!form.title || !form.url) return;
    persist([{ id: genId(), title: form.title, url: form.url }, ...list]);
    setOpen(false);
    setForm({ title: "", url: "" });
  };

  return (
    <AppShell title="CMS - Galeri" subtitle="Kelola foto galeri landing page"
      actions={
        <button onClick={() => setOpen(true)} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700">
          <HiOutlinePlus size={16} /> Tambah Foto
        </button>
      }
    >
      {list.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
          <HiOutlinePhoto size={40} className="mx-auto mb-2" />
          Belum ada foto
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p) => (
            <div key={p.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden">
              <img src={p.url} alt={p.title} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
              </div>
              <button onClick={() => persist(list.filter((x) => x.id !== p.id))} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur text-red-500 hover:bg-red-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <HiOutlineTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Tambah Foto"
        footer={
          <>
            <button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button>
            <button onClick={add} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Tambah</button>
          </>
        }>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Judul</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">URL Gambar</label>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={500} placeholder="https://..." />
          </div>
        </div>
      </Modal>
    </AppShell>
  );
};

export default CmsGallery;
