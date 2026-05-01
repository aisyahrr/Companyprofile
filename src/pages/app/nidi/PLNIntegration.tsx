import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Modal } from "@/components/app/Modal";
import { CertRecord, loadCerts, upsertCert, pushNotif } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlineBolt, HiOutlineDocumentText } from "react-icons/hi2";

const PLNIntegration = () => {
  const session = getSession()!;
  const [data, setData] = useState<CertRecord[]>(loadCerts().filter((c) => c.status === "NIDI Selesai" || c.status === "Validasi NIDI" || (c.plnStep1 || c.plnStep2)));
  const [open, setOpen] = useState<CertRecord | null>(null);
  const [form, setForm] = useState({ plnStep1: "", plnStep2: "", nidiNumber: "" });

  const refresh = () => setData(loadCerts().filter((c) => c.status === "NIDI Selesai" || c.status === "Validasi NIDI" || (c.plnStep1 || c.plnStep2)));

  const openModal = (c: CertRecord) => {
    setOpen(c);
    setForm({ plnStep1: c.plnStep1 || "", plnStep2: c.plnStep2 || "", nidiNumber: c.nidiNumber || "" });
  };

  const save = () => {
    if (!open) return;
    const isComplete = form.plnStep1 && form.plnStep2 && form.nidiNumber;
    upsertCert(
      {
        id: open.id,
        plnStep1: form.plnStep1,
        plnStep2: form.plnStep2,
        nidiNumber: form.nidiNumber,
        status: isComplete ? "NIDI Selesai" : open.status,
      },
      session.username,
      "Update integrasi PLN / NIDI",
      `Step1: ${form.plnStep1}, Step2: ${form.plnStep2}, NIDI: ${form.nidiNumber}`
    );
    if (isComplete) {
      pushNotif({ to: open.createdBy, title: "NIDI selesai", body: `${open.customerName} - ${form.nidiNumber}` });
    }
    setOpen(null); refresh();
  };

  return (
    <AppShell title="Integrasi PLN" subtitle="Input PLN Step 1, Step 2, dan nomor NIDI">
      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "nidiNumber"]}
        onRowClick={openModal}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
          { key: "plnStep1", label: "PLN 1", render: (r) => r.plnStep1 || <span className="text-slate-300">-</span> },
          { key: "plnStep2", label: "PLN 2", render: (r) => r.plnStep2 || <span className="text-slate-300">-</span> },
          { key: "nidiNumber", label: "No. NIDI", render: (r) => r.nidiNumber || <span className="text-slate-300">-</span> },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        title="Input Data PLN & NIDI"
        subtitle={open?.customerName}
        footer={
          <>
            <button onClick={() => setOpen(null)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button>
            <button onClick={save} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button>
          </>
        }
      >
        <div className="space-y-3">
          {[
            { k: "plnStep1", label: "PLN Step 1 (No. Permohonan)", icon: <HiOutlineBolt size={16} /> },
            { k: "plnStep2", label: "PLN Step 2 (No. Konfirmasi)", icon: <HiOutlineBolt size={16} /> },
            { k: "nidiNumber", label: "Nomor NIDI", icon: <HiOutlineDocumentText size={16} /> },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{f.icon}</span>
                <input
                  value={(form as Record<string, string>)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  maxLength={100}
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Masukkan nomor..."
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </AppShell>
  );
};

export default PLNIntegration;
