import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertRecord, loadCerts } from "@/lib/certStore";
import { Link } from "react-router-dom";
import { HiOutlineInbox, HiOutlineShieldCheck, HiOutlineBolt, HiOutlineCheckCircle } from "react-icons/hi2";

const NidiDashboard = () => {
  const all = loadCerts();
  const incoming = all.filter((c) => c.status === "Validasi NIDI");
  const revisi = all.filter((c) => c.status === "Revisi");
  const proses = all.filter((c) => c.status === "NIDI Selesai" || c.status === "Proses SLO");
  const selesai = all.filter((c) => c.nidiNumber).length;

  return (
    <AppShell title="Dashboard Admin NIDI" subtitle="Validasi data masuk & integrasi PLN">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Menunggu Validasi" value={incoming.length} icon={<HiOutlineInbox size={20} />} accent="violet" />
        <StatCard label="Revisi" value={revisi.length} icon={<HiOutlineShieldCheck size={20} />} accent="amber" />
        <StatCard label="Diproses ke PLN" value={proses.length} icon={<HiOutlineBolt size={20} />} accent="blue" />
        <StatCard label="NIDI Diterbitkan" value={selesai} icon={<HiOutlineCheckCircle size={20} />} accent="emerald" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-900">Data Masuk Terbaru</h3>
        <Link to="/app/nidi/inbox" className="text-sm text-blue-600 hover:underline">Lihat semua</Link>
      </div>
      <DataTable<CertRecord>
        data={incoming.slice(0, 8)}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
          { key: "createdBy", label: "Petugas" },
          { key: "capacity", label: "Kapasitas" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </AppShell>
  );
};

export default NidiDashboard;
