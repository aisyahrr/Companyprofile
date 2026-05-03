import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { loadList, saveList } from "@/lib/crudStore";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from "react-icons/hi2";

interface Contact { id: string; address: string; phone: string; whatsapp: string; email: string; hours: string; mapUrl: string; instagram: string; facebook: string; linkedin: string; }
const KEY = "cms_contact";
const seed: Contact[] = [{
  id: "main",
  address: "Jl. Sudirman No. 123, Jakarta Pusat",
  phone: "(021) 1234-5678",
  whatsapp: "+62 812-3456-7890",
  email: "info@royalcitra.co.id",
  hours: "Senin - Jumat, 08.00 - 17.00 WIB",
  mapUrl: "https://maps.google.com",
  instagram: "@royalcitraabadi",
  facebook: "RoyalCitraAbadi",
  linkedin: "pt-royal-citra-abadi",
}];

const fields: Array<[keyof Contact, string, React.ComponentType<{ size?: number }>]> = [
  ["address", "Alamat", HiOutlineMapPin],
  ["phone", "Telepon", HiOutlinePhone],
  ["whatsapp", "WhatsApp", HiOutlinePhone],
  ["email", "Email", HiOutlineEnvelope],
  ["hours", "Jam Operasional", HiOutlineClock],
  ["mapUrl", "URL Google Maps", HiOutlineMapPin],
  ["instagram", "Instagram", HiOutlineEnvelope],
  ["facebook", "Facebook", HiOutlineEnvelope],
  ["linkedin", "LinkedIn", HiOutlineEnvelope],
];

const CmsContact = () => {
  const [data, setData] = useState<Contact>(loadList<Contact>(KEY, seed)[0] || seed[0]);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { saveList(KEY, [data]); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <AppShell title="CMS - Kontak" subtitle="Kelola informasi kontak di landing page">
      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-3xl">
        <div className="space-y-4">
          {fields.map(([k, label, Icon]) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5"><Icon size={14} /> {label}</label>
              {k === "address" ? (
                <textarea rows={2} value={data[k]} onChange={(e) => setData({ ...data, [k]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              ) : (
                <input value={data[k]} onChange={(e) => setData({ ...data, [k]: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" maxLength={300} />
              )}
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            {saved && <p className="text-sm text-emerald-600 font-semibold">✓ Tersimpan</p>}
            <button onClick={handleSave} className="ml-auto px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default CmsContact;
