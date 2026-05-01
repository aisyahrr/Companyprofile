import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertDetailModal } from "@/components/app/CertDetailModal";
import { CertRecord, CertStatus, loadCerts, upsertCert, pushNotif } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineBolt } from "react-icons/hi2";

interface NidiInboxProps {
  mode?: "inbox" | "validation";
}

const NidiInbox = ({ mode = "inbox" }: NidiInboxProps) => {
  const session = getSession()!;
  const filterStatuses: CertStatus[] = mode === "validation"
    ? ["Validasi NIDI", "Revisi"]
    : ["Validasi NIDI", "Revisi", "NIDI Selesai", "Proses SLO"];
  const [data, setData] = useState<CertRecord[]>(loadCerts().filter((c) => filterStatuses.includes(c.status)));
  const [selected, setSelected] = useState<CertRecord | null>(null);

  const refresh = () => setData(loadCerts().filter((c) => filterStatuses.includes(c.status)));

  const approve = (c: CertRecord) => {
    upsertCert({ id: c.id, status: "NIDI Selesai" }, session.username, "Validasi disetujui");
    pushNotif({ to: c.createdBy, title: "Data divalidasi NIDI", body: c.customerName });
    setSelected(null); refresh();
  };
  const reject = (c: CertRecord) => {
    const reason = prompt("Alasan penolakan / revisi?");
    if (!reason) return;
    upsertCert({ id: c.id, status: "Revisi", rejectReason: reason }, session.username, "Diminta revisi", reason);
    pushNotif({ to: c.createdBy, title: "Data perlu direvisi", body: reason });
    setSelected(null); refresh();
  };
  const toPLN = (c: CertRecord) => {
    upsertCert({ id: c.id, status: "Proses SLO" }, session.username, "Diproses ke PLN & dilanjutkan ke SLO");
    pushNotif({ to: "admin_slo", title: "Data baru untuk SLO", body: c.customerName });
    setSelected(null); refresh();
  };

  return (
    <AppShell
      title={mode === "validation" ? "Validasi Data" : "Data Masuk dari Petugas"}
      subtitle="Setujui, tolak, atau lanjutkan ke proses PLN"
    >
      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "idNumber"]}
        filterKey="status"
        filterOptions={filterStatuses}
        onRowClick={setSelected}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <div><p className="font-semibold">{r.customerName}</p><p className="text-xs text-slate-500">{r.idNumber}</p></div> },
          { key: "createdBy", label: "Petugas" },
          { key: "capacity", label: "Kapasitas" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                {r.status === "Validasi NIDI" && (
                  <>
                    <button onClick={() => approve(r)} className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50" title="Setujui"><HiOutlineCheckCircle size={18} /></button>
                    <button onClick={() => reject(r)} className="p-1.5 rounded text-red-500 hover:bg-red-50" title="Tolak"><HiOutlineXCircle size={18} /></button>
                  </>
                )}
                {r.status === "NIDI Selesai" && (
                  <button onClick={() => toPLN(r)} className="px-2 h-7 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1">
                    <HiOutlineBolt size={14} /> Ke SLO
                  </button>
                )}
              </div>
            ),
          },
        ]}
      />

      <CertDetailModal
        cert={selected}
        onClose={() => setSelected(null)}
        footer={
          selected && selected.status === "Validasi NIDI" && (
            <>
              <button onClick={() => reject(selected)} className="px-4 h-9 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50">Tolak / Revisi</button>
              <button onClick={() => approve(selected)} className="px-4 h-9 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Setujui</button>
            </>
          )
        }
      />
    </AppShell>
  );
};

export default NidiInbox;
