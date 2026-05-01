import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Modal } from "@/components/app/Modal";
import { CertDetailModal } from "@/components/app/CertDetailModal";
import { CertRecord, loadCerts, upsertCert, pushNotif } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlineDocumentArrowUp, HiOutlineXMark, HiOutlinePaperAirplane, HiOutlineDocumentText, HiOutlineEye } from "react-icons/hi2";

interface Props { mode?: "queue" | "process" | "history"; }

const SloProcess = ({ mode = "queue" }: Props) => {
  const session = getSession()!;
  const baseFilter = (c: CertRecord) => {
    if (mode === "queue") return c.status === "Proses SLO";
    if (mode === "process") return c.status === "Proses SLO" || c.status === "Final Approval";
    return c.status === "Selesai" || c.status === "Final Approval";
  };
  const [data, setData] = useState<CertRecord[]>(loadCerts().filter(baseFilter));
  const [open, setOpen] = useState<CertRecord | null>(null);
  const [view, setView] = useState<CertRecord | null>(null);
  const [docInput, setDocInput] = useState("");
  const [sloNumber, setSloNumber] = useState("");
  const [docs, setDocs] = useState<string[]>([]);

  const refresh = () => setData(loadCerts().filter(baseFilter));

  const openProcess = (c: CertRecord) => {
    setOpen(c);
    setDocs(c.sloDocuments || []);
    setSloNumber(c.sloNumber || "");
    setDocInput("");
  };

  const submit = () => {
    if (!open) return;
    upsertCert(
      { id: open.id, sloDocuments: docs, sloNumber, status: "Final Approval" },
      session.username,
      "Diajukan untuk Final Approval",
      `Dokumen: ${docs.length}, SLO: ${sloNumber}`
    );
    pushNotif({ to: "super_admin", title: "SLO menunggu approval", body: open.customerName });
    setOpen(null); refresh();
  };

  const saveDraft = () => {
    if (!open) return;
    upsertCert({ id: open.id, sloDocuments: docs, sloNumber }, session.username, "Update dokumen SLO");
    setOpen(null); refresh();
  };

  return (
    <AppShell
      title={mode === "queue" ? "Antrian SLO" : mode === "process" ? "Proses Dokumen SLO" : "Riwayat SLO"}
      subtitle={mode === "queue" ? "Data dari NIDI siap diproses SLO" : mode === "process" ? "Upload dokumen & ajukan approval" : "Riwayat SLO yang sudah selesai"}
    >
      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "nidiNumber", "sloNumber"]}
        onRowClick={(r) => mode === "history" ? setView(r) : openProcess(r)}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
          { key: "nidiNumber", label: "No. NIDI" },
          { key: "sloNumber", label: "No. SLO", render: (r) => r.sloNumber || <span className="text-slate-300">-</span> },
          {
            key: "documents",
            label: "Dokumen",
            render: (r) => (
              <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                <HiOutlineDocumentText size={14} /> {(r.sloDocuments || []).length} file
              </span>
            ),
          },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <button onClick={(e) => { e.stopPropagation(); mode === "history" ? setView(r) : openProcess(r); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">
                <HiOutlineEye size={16} />
              </button>
            ),
          },
        ]}
      />

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        title="Proses Dokumen SLO"
        subtitle={open?.customerName}
        size="lg"
        footer={
          <>
            <button onClick={() => setOpen(null)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Tutup</button>
            <button onClick={saveDraft} className="px-4 h-9 rounded-lg border border-slate-200 text-sm font-semibold hover:bg-slate-50">Simpan</button>
            <button onClick={submit} disabled={docs.length === 0 || !sloNumber} className="px-4 h-9 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 disabled:opacity-50 inline-flex items-center gap-1.5">
              <HiOutlinePaperAirplane size={14} /> Ajukan Final Approval
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg text-sm">
          <div><p className="text-xs text-slate-500">No. NIDI</p><p className="font-semibold">{open?.nidiNumber || "-"}</p></div>
          <div><p className="text-xs text-slate-500">Kapasitas</p><p className="font-semibold">{open?.capacity || "-"}</p></div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor SLO</label>
          <input value={sloNumber} onChange={(e) => setSloNumber(e.target.value)} maxLength={100} placeholder="SLO-2026-XXXX" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Dokumen SLO</label>
          <div className="flex gap-2">
            <input value={docInput} onChange={(e) => setDocInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (docInput.trim()) { setDocs([...docs, docInput.trim()]); setDocInput(""); } } }} maxLength={100} placeholder="Nama file (mis. SLO-Final.pdf)" className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm" />
            <button onClick={() => { if (docInput.trim()) { setDocs([...docs, docInput.trim()]); setDocInput(""); } }} className="px-4 h-10 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 inline-flex items-center gap-1">
              <HiOutlineDocumentArrowUp size={16} /> Upload
            </button>
          </div>
          {docs.length > 0 && (
            <div className="mt-3 space-y-2">
              {docs.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-violet-50 rounded-lg border border-violet-200">
                  <div className="flex items-center gap-2 text-sm text-violet-700">
                    <HiOutlineDocumentText size={16} /> {d}
                  </div>
                  <button onClick={() => setDocs(docs.filter((_, idx) => idx !== i))} className="text-violet-500 hover:text-red-500"><HiOutlineXMark size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      <CertDetailModal cert={view} onClose={() => setView(null)} />
    </AppShell>
  );
};

export default SloProcess;
