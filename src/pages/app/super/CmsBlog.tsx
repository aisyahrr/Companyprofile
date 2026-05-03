import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

interface Blog { title: string; author: string; category: string; date: string; image: string; excerpt: string; content: string; }
const KEY = "cms_blog";
const seed: WithId<Blog>[] = [
  { id: "b1", title: "Cara Mengurus NIDI dengan Cepat", author: "Tim Royal", category: "Panduan", date: new Date().toISOString().slice(0, 10), image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600", excerpt: "Langkah-langkah singkat untuk pendaftaran NIDI.", content: "Konten lengkap artikel..." },
];
const empty: Partial<Blog> = { title: "", author: "", category: "", date: new Date().toISOString().slice(0, 10), image: "", excerpt: "", content: "" };

const CmsBlog = () => {
  const [list, setList] = useState<WithId<Blog>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Blog>>>(empty);
  const persist = (n: WithId<Blog>[]) => { saveList(KEY, n); setList(n); };
  const save = () => {
    if (!form.title) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Blog> : x));
    else persist([{ ...(form as Blog), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus artikel?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell title="CMS - Blog" subtitle="Kelola artikel blog di landing page"
      actions={<button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"><HiOutlinePlus size={16} /> Tambah Artikel</button>}>
      <DataTable<WithId<Blog>>
        data={list}
        searchKeys={["title", "author", "category"]}
        columns={[
          { key: "image", label: "Gambar", render: (r) => r.image ? <img src={r.image} alt={r.title} className="w-14 h-10 rounded object-cover" /> : <div className="w-14 h-10 rounded bg-slate-200" /> },
          { key: "title", label: "Judul", render: (r) => <span className="font-semibold text-slate-900 line-clamp-1">{r.title}</span> },
          { key: "author", label: "Penulis" },
          { key: "category", label: "Kategori", render: (r) => <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{r.category}</span> },
          { key: "date", label: "Tanggal" },
          { key: "actions", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
            </div>
          )},
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit Artikel" : "Tambah Artikel"} size="lg"
        footer={<><button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button><button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button></>}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Judul</label><input value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={200} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Penulis</label><input value={form.author || ""} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label><input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={50} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal</label><input type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">URL Gambar</label><input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={500} /></div>
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Ringkasan</label><textarea rows={2} value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={300} /></div>
          <div className="col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Isi Konten</label><textarea rows={6} value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" /></div>
        </div>
      </Modal>
    </AppShell>
  );
};
export default CmsBlog;
