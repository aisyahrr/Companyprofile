import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { loadList, saveList } from "@/lib/crudStore";
import { HiOutlineSparkles } from "react-icons/hi2";

interface Hero { id: string; headline: string; subheadline: string; ctaPrimary: string; ctaSecondary: string; backgroundUrl: string; }
const KEY = "cms_hero";
const seed: Hero[] = [{
  id: "main",
  headline: "Mitra Sertifikasi Listrik Terpercaya",
  subheadline: "Layanan NIDI & SLO cepat, akurat, dan profesional untuk seluruh Indonesia.",
  ctaPrimary: "Mulai Konsultasi",
  ctaSecondary: "Pelajari Layanan",
  backgroundUrl: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1600",
}];

const CmsHero = () => {
  const [data, setData] = useState<Hero>(loadList<Hero>(KEY, seed)[0] || seed[0]);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { saveList(KEY, [data]); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <AppShell title="CMS - Hero Section" subtitle="Kelola konten utama hero di landing page">
      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><HiOutlineSparkles size={20} /></div>
          <div>
            <h2 className="font-bold text-slate-900">Hero Banner</h2>
            <p className="text-xs text-slate-500">Tampil paling atas di landing page</p>
          </div>
        </div>
        <div className="space-y-4">
          {([
            ["headline", "Headline", true],
            ["subheadline", "Subheadline", true],
            ["ctaPrimary", "Tombol Utama", false],
            ["ctaSecondary", "Tombol Sekunder", false],
            ["backgroundUrl", "URL Background", false],
          ] as const).map(([k, label, multi]) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
              {multi ? (
                <textarea rows={2} value={data[k]} onChange={(e) => setData({ ...data, [k]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              ) : (
                <input value={data[k]} onChange={(e) => setData({ ...data, [k]: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" maxLength={300} />
              )}
            </div>
          ))}
          {data.backgroundUrl && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Preview</label>
              <img src={data.backgroundUrl} alt="preview" className="w-full h-40 object-cover rounded-lg border border-slate-200" />
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            {saved && <p className="text-sm text-emerald-600 font-semibold">✓ Tersimpan</p>}
            <button onClick={handleSave} className="ml-auto px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default CmsHero;
