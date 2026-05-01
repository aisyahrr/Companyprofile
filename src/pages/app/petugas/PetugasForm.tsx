import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/app/AppShell";
import { CertRecord, getCert, upsertCert, pushNotif } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlineDocumentArrowUp, HiOutlineXMark, HiOutlineArrowLeft, HiOutlineCheck, HiOutlinePaperAirplane } from "react-icons/hi2";

const PetugasForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = getSession()!;
  const editing = id && id !== "new" ? getCert(id) : undefined;

  const [form, setForm] = useState<Partial<CertRecord>>({
    customerName: "", address: "", phone: "", idNumber: "", capacity: "", installationType: "Rumah Tangga", documents: [], notes: "",
  });
  const [docInput, setDocInput] = useState("");

  useEffect(() => {
    if (editing) setForm(editing);
  }, [id]);

  const set = (k: keyof CertRecord, v: unknown) => setForm({ ...form, [k]: v });

  const addDoc = () => {
    if (!docInput.trim()) return;
    setForm({ ...form, documents: [...(form.documents || []), docInput.trim()] });
    setDocInput("");
  };
  const removeDoc = (i: number) => setForm({ ...form, documents: (form.documents || []).filter((_, idx) => idx !== i) });

  const save = (status: "Draft" | "Validasi NIDI") => {
    if (!form.customerName?.trim()) { alert("Nama pelanggan wajib diisi"); return; }
    if (!form.idNumber?.trim()) { alert("No. identitas wajib diisi"); return; }
    const rec = upsertCert({ ...form, status, id: editing?.id }, session.username, status === "Draft" ? "Disimpan sebagai draft" : "Dikirim ke NIDI");
    if (status === "Validasi NIDI") {
      pushNotif({ to: "admin_nidi", title: "Data baru menunggu validasi", body: rec.customerName });
    }
    navigate("/app/petugas/list");
  };

  return (
    <AppShell
      title={editing ? "Edit Data Pelanggan" : "Buat Data Pelanggan Baru"}
      subtitle="Isi formulir secara lengkap, simpan sebagai draft atau langsung kirim ke NIDI"
    >
      <div className="max-w-4xl">
        <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
          <HiOutlineArrowLeft size={16} /> Kembali
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Data Pelanggan</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["customerName", "Nama Pelanggan", "text", true],
                ["idNumber", "No. Identitas / NIK", "text", true],
                ["phone", "No. Telepon", "tel", false],
                ["capacity", "Kapasitas (VA)", "text", false],
              ].map(([k, label, type, req]) => (
                <div key={k as string} className={k === "customerName" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{label as string}{req && <span className="text-red-500"> *</span>}</label>
                  <input
                    type={type as string}
                    value={(form[k as keyof CertRecord] as string) || ""}
                    onChange={(e) => set(k as keyof CertRecord, e.target.value)}
                    maxLength={200}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alamat</label>
                <textarea rows={2} value={form.address || ""} onChange={(e) => set("address", e.target.value)} maxLength={500} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Jenis Instalasi</label>
                <select value={form.installationType} onChange={(e) => set("installationType", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm">
                  {["Rumah Tangga", "Komersial", "Industri", "Sosial"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-3">Dokumen</h3>
            <div className="flex gap-2">
              <input
                value={docInput}
                onChange={(e) => setDocInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDoc())}
                placeholder="Nama dokumen (mis. KTP.pdf)"
                maxLength={100}
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button onClick={addDoc} className="px-4 h-10 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 inline-flex items-center gap-1">
                <HiOutlineDocumentArrowUp size={16} /> Tambah
              </button>
            </div>
            {(form.documents || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {(form.documents || []).map((d, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                    {d}
                    <button onClick={() => removeDoc(i)} className="text-blue-500 hover:text-red-500">
                      <HiOutlineXMark size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Catatan (opsional)</label>
            <textarea rows={2} value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} maxLength={500} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-end pt-4 border-t border-slate-100">
            <button onClick={() => save("Draft")} className="px-4 h-10 rounded-lg border border-slate-200 text-sm font-semibold hover:bg-slate-50 inline-flex items-center justify-center gap-1.5">
              <HiOutlineCheck size={16} /> Simpan Draft
            </button>
            <button onClick={() => save("Validasi NIDI")} className="px-4 h-10 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 inline-flex items-center justify-center gap-1.5">
              <HiOutlinePaperAirplane size={16} /> Kirim ke NIDI
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default PetugasForm;
