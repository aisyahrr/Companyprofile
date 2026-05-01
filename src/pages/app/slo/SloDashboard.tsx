import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertRecord, loadCerts } from "@/lib/certStore";
import { Link } from "react-router-dom";
import { HiOutlineInbox, HiOutlineDocumentArrowUp, HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";

const SloDashboard = () => {
  const all = loadCerts();
  const queue = all.filter((c) => c.status === "Proses SLO");
  const waiting = all.filter((c) => c.status === "Final Approval");
  const done = all.filter((c) => c.sloNumber).length;

  return (
    <AppShell title="Dashboard Admin SLO" subtitle="Proses dokumen SLO dan ajukan final approval">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Antrian SLO" value={queue.length} icon={<HiOutlineInbox size={20} />} accent="amber" />
        <StatCard label="Sedang Diproses" value={queue.length} icon={<HiOutlineClock size={20} />} accent="blue" />
        <StatCard label="Menunggu Approval" value={waiting.length} icon={<HiOutlineDocumentArrowUp size={20} />} accent="violet" />
        <StatCard label="SLO Diterbitkan" value={done} icon={<HiOutlineCheckCircle size={20} />} accent="emerald" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-900">Antrian SLO</h3>
        <Link to="/app/slo/queue" className="text-sm text-blue-600 hover:underline">Lihat semua</Link>
      </div>
      <DataTable<CertRecord>
        data={queue.slice(0, 8)}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
          { key: "nidiNumber", label: "No. NIDI" },
          { key: "capacity", label: "Kapasitas" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </AppShell>
  );
};

export default SloDashboard;
