import { useMemo } from "react";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { loadCerts, loadActivity, CertStatus, CertRecord } from "@/lib/certStore";
import { loadUsers } from "@/lib/usersStore";
import {
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi2";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#06b6d4", "#64748b"];

const SuperDashboard = () => {
  const certs = loadCerts();
  const users = loadUsers();
  const activity = loadActivity().slice(0, 5);

  const stats = useMemo(() => {
    const total = certs.length;
    const completed = certs.filter((c) => c.status === "Selesai").length;
    const pending = certs.filter((c) => c.status === "Final Approval").length;
    return { total, completed, pending, users: users.length };
  }, [certs, users]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toLocaleDateString("id-ID", { weekday: "short" });
      const count = certs.filter((c) => {
        const cd = new Date(c.createdAt);
        return cd.toDateString() === d.toDateString();
      }).length;
      return { day: key, value: count + Math.floor(Math.random() * 3) };
    });
    return days;
  }, [certs]);

  const statusBreakdown = useMemo(() => {
    const map = new Map<CertStatus, number>();
    certs.forEach((c) => map.set(c.status, (map.get(c.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [certs]);

  return (
    <AppShell title="Dashboard Super Admin" subtitle="Ringkasan sistem sertifikasi NIDI & SLO">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value={stats.users} icon={<HiOutlineUsers size={20} />} accent="blue" trend="+12%" trendUp />
        <StatCard label="Total Data" value={stats.total} icon={<HiOutlineDocumentText size={20} />} accent="violet" trend="+8%" trendUp />
        <StatCard label="Data Completed" value={stats.completed} icon={<HiOutlineCheckCircle size={20} />} accent="emerald" trend="+24%" trendUp />
        <StatCard label="Pending Approval" value={stats.pending} icon={<HiOutlineClock size={20} />} accent="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Tren Permohonan 7 Hari</h3>
              <p className="text-xs text-slate-500">Jumlah data baru per hari</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-1">Status Distribusi</h3>
          <p className="text-xs text-slate-500 mb-3">Sebaran status data</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {statusBreakdown.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Data Terbaru</h3>
          </div>
          <DataTable<CertRecord>
            data={certs.slice(0, 8)}
            columns={[
              { key: "customerName", label: "Pelanggan" },
              { key: "capacity", label: "Kapasitas" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
              {
                key: "updatedAt",
                label: "Diperbarui",
                render: (r) => <span className="text-xs text-slate-500">{new Date(r.updatedAt).toLocaleDateString("id-ID")}</span>,
              },
            ]}
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-3">Aktivitas Terbaru</h3>
          {activity.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Belum ada aktivitas</p>
          ) : (
            <ul className="space-y-3">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {a.by.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-900 truncate">{a.action}</p>
                    <p className="text-xs text-slate-500">
                      {a.by} • {new Date(a.ts).toLocaleString("id-ID")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default SuperDashboard;
