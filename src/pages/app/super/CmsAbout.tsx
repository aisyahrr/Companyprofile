import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { loadList, saveList, genId } from "@/lib/crudStore";
import { HiOutlineDocumentText } from "react-icons/hi2";

interface AboutContent { id: string; title: string; subtitle: string; description: string; vision: string; mission: string; }

const KEY = "cms_about";
const seed: AboutContent[] = [{
  id: "main",
  title: "PT Royal Citra Abadi",
  subtitle: "Mitra Sertifikasi Listrik Terpercaya",
  description: "Perusahaan yang fokus pada layanan sertifikasi NIDI & SLO untuk instalasi listrik.",
  vision: "Menjadi penyedia layanan sertifikasi listrik nomor satu di Indonesia.",
  mission: "Memberikan layanan cepat, akurat, dan terpercaya untuk seluruh pelanggan.",
}];

const CmsAbout = () => {
  const [data, setData] = useState<AboutContent>(loadList<AboutContent>(KEY, seed)[0] || seed[0]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveList(KEY, [data]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell title="CMS - Tentang Perusahaan" subtitle="Kelola konten halaman 'About' di landing page">
      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <HiOutlineDocumentText size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">About Company</h2>
            <p className="text-xs text-slate-500">Perubahan tampil di landing page</p>
          </div>
        </div>

        <div className="space-y-4">
          {([
            ["title", "Judul Utama", false],
            ["subtitle", "Subtitle", false],
            ["description", "Deskripsi", true],
            ["vision", "Visi", true],
            ["mission", "Misi", true],
          ] as const).map(([k, label, multi]) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
              {multi ? (
                <textarea
                  rows={3}
                  value={data[k]}
                  onChange={(e) => setData({ ...data, [k]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              ) : (
                <input
                  value={data[k]}
                  onChange={(e) => setData({ ...data, [k]: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  maxLength={200}
                />
              )}
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            {saved && <p className="text-sm text-emerald-600 font-semibold">✓ Tersimpan</p>}
            <button onClick={handleSave} className="ml-auto px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default CmsAbout;
