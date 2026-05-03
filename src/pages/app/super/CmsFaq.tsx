import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

interface Faq { question: string; answer: string; order: number; }
const KEY = "cms_faq";
const seed: WithId<Faq>[] = [
  { id: "f1", question: "Berapa lama proses NIDI?", answer: "Sekitar 3-5 hari kerja setelah dokumen lengkap.", order: 1 },
  { id: "f2", question: "Apa syarat sertifikasi SLO?", answer: "Dokumen instalasi, identitas pemilik, dan hasil uji teknis.", order: 2 },
];
const empty: Partial<Faq> = { question: "", answer: "", order: 1 };

const CmsFaq = () => {
  const [list, setList] = useState<WithId<Faq>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Faq>>>(empty);
  const persist = (n: WithId<Faq>[]) => { saveList(KEY, n); setList(n); };
  const save = () => {
    if (!form.question) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Faq> : x));
    else persist([{ ...(form as Faq), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus FAQ?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell title="CMS - FAQ" subtitle="Kelola pertanyaan umum di landing page"
      actions={<button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"><HiOutlinePlus size={16} /> Tambah FAQ</button>}>
      <DataTable<WithId<Faq>>
        data={[...list].sort((a, b) => a.order - b.order)}
        searchKeys={["question", "answer"]}
        columns={[
          { key: "order", label: "#", className: "w-12", render: (r) => <span className="text-slate-500">{r.order}</span> },
          { key: "question", label: "Pertanyaan", render: (r) => <span className="font-semibold text-slate-900">{r.question}</span> },
          { key: "answer", label: "Jawaban", render: (r) => <span className="text-sm text-slate-600 line-clamp-2 max-w-xl">{r.answer}</span> },
          { key: "actions", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
            </div>
          )},
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit FAQ" : "Tambah FAQ"}
        footer={<><button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button><button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button></>}>
        <div className="space-y-3">
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Urutan</label><input type="number" min={1} value={form.order || 1} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Pertanyaan</label><input value={form.question || ""} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={300} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Jawaban</label><textarea rows={5} value={form.answer || ""} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={1000} /></div>
        </div>
      </Modal>
    </AppShell>
  );
};
export default CmsFaq;
