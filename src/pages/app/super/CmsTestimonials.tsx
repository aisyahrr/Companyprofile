import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiStar } from "react-icons/hi2";

interface Testimonial { name: string; company: string; rating: number; quote: string; photo: string; }
const KEY = "cms_testimonials";
const seed: WithId<Testimonial>[] = [
  { id: "ts1", name: "Andi Wijaya", company: "PT Sukses", rating: 5, quote: "Pelayanan cepat dan profesional!", photo: "https://i.pravatar.cc/150?img=33" },
  { id: "ts2", name: "Linda Sari", company: "CV Mandiri", rating: 5, quote: "Sangat membantu proses sertifikasi kami.", photo: "https://i.pravatar.cc/150?img=44" },
];
const empty: Partial<Testimonial> = { name: "", company: "", rating: 5, quote: "", photo: "" };

const CmsTestimonials = () => {
  const [list, setList] = useState<WithId<Testimonial>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Testimonial>>>(empty);
  const persist = (n: WithId<Testimonial>[]) => { saveList(KEY, n); setList(n); };
  const save = () => {
    if (!form.name || !form.quote) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Testimonial> : x));
    else persist([{ ...(form as Testimonial), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus testimoni?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell title="CMS - Testimoni" subtitle="Kelola testimoni klien di landing page"
      actions={<button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"><HiOutlinePlus size={16} /> Tambah Testimoni</button>}>
      <DataTable<WithId<Testimonial>>
        data={list}
        searchKeys={["name", "company"]}
        columns={[
          { key: "photo", label: "Foto", render: (r) => r.photo ? <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-slate-200" /> },
          { key: "name", label: "Nama", render: (r) => <div><div className="font-semibold text-slate-900">{r.name}</div><div className="text-xs text-slate-500">{r.company}</div></div> },
          { key: "rating", label: "Rating", render: (r) => <div className="flex gap-0.5 text-amber-400">{Array.from({ length: r.rating }).map((_, i) => <HiStar key={i} size={14} />)}</div> },
          { key: "quote", label: "Pesan", render: (r) => <span className="text-sm text-slate-600 line-clamp-2 max-w-md">"{r.quote}"</span> },
          { key: "actions", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
            </div>
          )},
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit Testimoni" : "Tambah Testimoni"}
        footer={<><button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button><button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button></>}>
        <div className="space-y-3">
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nama</label><input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Perusahaan</label><input value={form.company || ""} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating || 5} onChange={(e) => setForm({ ...form, rating: Math.max(1, Math.min(5, Number(e.target.value))) })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">URL Foto</label><input value={form.photo || ""} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={500} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Pesan</label><textarea rows={3} value={form.quote || ""} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={500} /></div>
        </div>
      </Modal>
    </AppShell>
  );
};
export default CmsTestimonials;
