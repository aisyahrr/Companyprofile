import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertDetailModal } from "@/components/app/CertDetailModal";
import { CertRecord, loadCerts, upsertCert, pushNotif } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

const FinalApproval = () => {
  const [data, setData] = useState<CertRecord[]>(loadCerts().filter((c) => c.status === "Final Approval"));
  const [selected, setSelected] = useState<CertRecord | null>(null);
  const session = getSession()!;

  const refresh = () => setData(loadCerts().filter((c) => c.status === "Final Approval"));

  const approve = (c: CertRecord) => {
    upsertCert({ id: c.id, status: "Selesai" }, session.username, "Disetujui Final");
    pushNotif({ to: c.createdBy, title: "Data disetujui", body: `${c.customerName} telah selesai` });
    setSelected(null);
    refresh();
  };

  const reject = (c: CertRecord) => {
    const reason = prompt("Alasan penolakan?");
    if (!reason) return;
    upsertCert({ id: c.id, status: "Revisi", rejectReason: reason }, session.username, "Ditolak Final", reason);
    pushNotif({ to: c.createdBy, title: "Data ditolak", body: reason });
    setSelected(null);
    refresh();
  };

  return (
    <AppShell title="Final Approval" subtitle="Setujui atau tolak sertifikasi yang siap final">
      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "nidiNumber", "sloNumber"]}
        onRowClick={setSelected}
        emptyMessage="Tidak ada data menunggu final approval"
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
          { key: "nidiNumber", label: "No. NIDI" },
          { key: "sloNumber", label: "No. SLO" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => approve(r)} className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50">
                  <HiOutlineCheckCircle size={18} />
                </button>
                <button onClick={() => reject(r)} className="p-1.5 rounded text-red-500 hover:bg-red-50">
                  <HiOutlineXCircle size={18} />
                </button>
              </div>
            ),
          },
        ]}
      />

      <CertDetailModal
        cert={selected}
        onClose={() => setSelected(null)}
        footer={
          selected && (
            <>
              <button onClick={() => reject(selected)} className="px-4 h-9 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50">
                Tolak
              </button>
              <button onClick={() => approve(selected)} className="px-4 h-9 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">
                Setujui Final
              </button>
            </>
          )
        }
      />
    </AppShell>
  );
};

export default FinalApproval;
