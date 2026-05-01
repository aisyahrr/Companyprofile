import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertDetailModal } from "@/components/app/CertDetailModal";
import { CertRecord, loadCerts, CertStatus } from "@/lib/certStore";

const STATUSES: CertStatus[] = ["Draft", "Revisi", "Validasi NIDI", "NIDI Selesai", "Proses SLO", "Final Approval", "Selesai", "Ditolak"];

const Monitoring = () => {
  const [data] = useState<CertRecord[]>(loadCerts());
  const [selected, setSelected] = useState<CertRecord | null>(null);

  return (
    <AppShell title="Monitoring Workflow" subtitle="Pantau seluruh alur sertifikasi end-to-end">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {STATUSES.map((s) => {
          const count = data.filter((d) => d.status === s).length;
          return (
            <div key={s} className="bg-white border border-slate-200 rounded-xl p-4">
              <StatusBadge status={s} />
              <p className="text-2xl font-bold text-slate-900 mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "idNumber"]}
        filterKey="status"
        filterOptions={STATUSES}
        onRowClick={setSelected}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold text-slate-900">{r.customerName}</span> },
          { key: "idNumber", label: "No. ID" },
          { key: "createdBy", label: "Petugas" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "updatedAt", label: "Update", render: (r) => <span className="text-xs text-slate-500">{new Date(r.updatedAt).toLocaleDateString("id-ID")}</span> },
        ]}
      />

      <CertDetailModal cert={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default Monitoring;
