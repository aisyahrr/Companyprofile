import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertRecord, loadCerts, notifsFor } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlinePencilSquare,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePlus,
  HiOutlineBell,
} from "react-icons/hi2";

const PetugasDashboard = () => {
  const session = getSession()!;
  const navigate = useNavigate();
  const myCerts = loadCerts().filter((c) => c.createdBy === session.username);
  const notifs = notifsFor([session.username]).slice(0, 5);

  const draft = myCerts.filter((c) => c.status === "Draft").length;
  const revisi = myCerts.filter((c) => c.status === "Revisi").length;
  const proses = myCerts.filter((c) => !["Draft", "Revisi", "Selesai", "Ditolak"].includes(c.status)).length;
  const selesai = myCerts.filter((c) => c.status === "Selesai").length;

  return (
    <AppShell title={`Halo, ${session.name} 👋`} subtitle="Dashboard Petugas Lapangan">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Mulai Input Data Pelanggan</h2>
          <p className="text-emerald-50 text-sm mt-1">Buat permohonan sertifikasi baru dengan cepat & mudah.</p>
        </div>
        <button
          onClick={() => navigate("/app/petugas/new")}
          className="px-5 h-11 rounded-lg bg-white text-emerald-700 font-bold text-sm flex items-center gap-2 hover:bg-emerald-50 shadow"
        >
          <HiOutlinePlus size={18} /> Buat Data Baru
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Draft" value={draft} icon={<HiOutlinePencilSquare size={20} />} accent="slate" />
        <StatCard label="Revisi" value={revisi} icon={<HiOutlineDocumentText size={20} />} accent="amber" />
        <StatCard label="Diproses" value={proses} icon={<HiOutlineClock size={20} />} accent="blue" />
        <StatCard label="Selesai" value={selesai} icon={<HiOutlineCheckCircle size={20} />} accent="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900">Data Terbaru Saya</h3>
            <Link to="/app/petugas/list" className="text-sm text-blue-600 hover:underline">Lihat semua</Link>
          </div>
          <DataTable<CertRecord>
            data={myCerts.slice(0, 6)}
            columns={[
              { key: "customerName", label: "Pelanggan", render: (r) => <span className="font-semibold">{r.customerName}</span> },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "updatedAt", label: "Update", render: (r) => <span className="text-xs text-slate-500">{new Date(r.updatedAt).toLocaleDateString("id-ID")}</span> },
            ]}
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <HiOutlineBell size={18} className="text-amber-500" /> Notifikasi
          </h3>
          {notifs.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Tidak ada notifikasi</p>
          ) : (
            <ul className="space-y-3">
              {notifs.map((n) => (
                <li key={n.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                  {n.body && <p className="text-xs text-slate-600 mt-0.5">{n.body}</p>}
                  <p className="text-[10px] text-slate-400 mt-1">{new Date(n.ts).toLocaleString("id-ID")}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default PetugasDashboard;
