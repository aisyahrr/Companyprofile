import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { loadList, saveList, genId, WithId } from "@/lib/crudStore";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

interface Team { name: string; role: string; photo: string; bio: string; }
const KEY = "cms_team";
const seed: WithId<Team>[] = [
  { id: "t1", name: "Budi Santoso", role: "Direktur Utama", photo: "https://i.pravatar.cc/150?img=12", bio: "20+ tahun pengalaman" },
  { id: "t2", name: "Sari Dewi", role: "Manajer Teknik", photo: "https://i.pravatar.cc/150?img=47", bio: "Spesialis instalasi listrik" },
];
const empty: Partial<Team> = { name: "", role: "", photo: "", bio: "" };

const CmsTeam = () => {
  const [list, setList] = useState<WithId<Team>[]>(loadList(KEY, seed));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<WithId<Team>>>(empty);
  const persist = (n: WithId<Team>[]) => { saveList(KEY, n); setList(n); };
  const save = () => {
    if (!form.name) return;
    if (form.id) persist(list.map((x) => x.id === form.id ? { ...x, ...form } as WithId<Team> : x));
    else persist([{ ...(form as Team), id: genId() }, ...list]);
    setOpen(false);
  };
  const remove = (id: string) => confirm("Hapus anggota tim?") && persist(list.filter((x) => x.id !== id));

  return (
    <AppShell title="CMS - Tim" subtitle="Kelola anggota tim di landing page"
      actions={<button onClick={() => { setForm(empty); setOpen(true); }} className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"><HiOutlinePlus size={16} /> Tambah Anggota</button>}>
      <DataTable<WithId<Team>>
        data={list}
        searchKeys={["name", "role"]}
        columns={[
          { key: "photo", label: "Foto", render: (r) => r.photo ? <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-slate-200" /> },
          { key: "name", label: "Nama", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
          { key: "role", label: "Jabatan" },
          { key: "bio", label: "Bio", render: (r) => <span className="text-sm text-slate-600 line-clamp-1">{r.bio}</span> },
          { key: "actions", label: "", className: "text-right", render: (r) => (
            <div className="flex justify-end gap-1">
              <button onClick={() => { setForm(r); setOpen(true); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
            </div>
          )},
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? "Edit Anggota" : "Tambah Anggota"}
        footer={<><button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button><button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button></>}>
        <div className="space-y-3">
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nama</label><input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Jabatan</label><input value={form.role || ""} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={100} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">URL Foto</label><input value={form.photo || ""} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm" maxLength={500} placeholder="https://..." /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1">Bio</label><textarea rows={3} value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" maxLength={300} /></div>
        </div>
      </Modal>
    </AppShell>
  );
};
export default CmsTeam;
