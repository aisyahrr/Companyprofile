import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";
import { SourcesChart } from "@/components/admin/SourcesChart";
import { MiniCalendar } from "@/components/admin/MiniCalendar";
import { logout } from "@/lib/auth";
import {
  FiCalendar,
  FiUserX,
  FiClipboard,
  FiBell,
  FiMessageSquare,
  FiLogOut,
  FiMoreVertical,
  FiPlus,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const performers = [
  { name: "Rainer Brown", email: "rainerbrwn@mail.com", color: "bg-orange-100 text-orange-600" },
  { name: "Alex Sullivan", email: "alexsullivn@mail.com", color: "bg-blue-100 text-blue-600" },
  { name: "Conny Rany", email: "connyerain@mail.com", color: "bg-purple-100 text-purple-600" },
  { name: "Lily Alexa", email: "lilyalex@mail.com", color: "bg-pink-100 text-pink-600" },
  { name: "Armin Falcon", email: "arfalcon@mail.com", color: "bg-emerald-100 text-emerald-600" },
  { name: "Agatha Smith", email: "agathasmith@mail.com", color: "bg-amber-100 text-amber-600" },
];

const meetings = [
  { name: "Meeting with Herry", time: "12:00 - 01:00 PM", color: "bg-emerald-500", count: 9 },
  { name: "Meeting with Salah", time: "10:00 - 11:30 AM", color: "bg-blue-500", count: 9 },
  { name: "Meeting with Mbappe", time: "02:00 - 03:00 PM", color: "bg-orange-500", count: 9 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-secondary/40 flex">
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-background flex items-center justify-center text-xs font-semibold text-orange-700">
                R
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-background flex items-center justify-center text-xs font-semibold text-blue-700">
                A
              </div>
              <button className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-muted-foreground hover:bg-muted">
                <FiPlus size={12} />
              </button>
            </div>
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary">
              <FiMessageSquare size={16} />
            </button>
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary relative">
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => { logout(); navigate("/login", { replace: true }); }}
              className="h-9 px-3 rounded-lg border border-border flex items-center gap-2 text-sm text-foreground hover:bg-secondary"
            >
              <FiLogOut size={14} /> Logout
            </button>
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary">
              <FiMoreVertical size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT 2 cols */}
          <div className="xl:col-span-2 space-y-6">
            {/* Welcome */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  Selamat Datang, Admin RCA <span>👋</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Kelola konten landing page PT Royal Citra Abadi dengan mudah.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={FiCalendar}
                value="560"
                label="Total Pengunjung"
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />
              <StatCard
                icon={FiUserX}
                value="010"
                label="Pesan Baru"
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
              <StatCard
                icon={FiClipboard}
                value="40"
                label="Pengajuan Layanan"
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Sumber Klien Teratas</h3>
                <button className="text-xs text-muted-foreground border border-border rounded-md px-2.5 py-1.5 flex items-center gap-1.5 hover:bg-secondary">
                  <FiCalendar size={12} /> 1 Nov - 7 Nov 2024
                </button>
              </div>
              <SourcesChart />
            </div>

            {/* Top Performers */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Tim Berprestasi</h3>
                <div className="flex items-center gap-1 text-xs">
                  {["1m", "7d", "1y", "All"].map((t, i) => (
                    <button
                      key={t}
                      className={cn(
                        "px-2.5 py-1 rounded-md",
                        i === 1 ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {performers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/60"
                  >
                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold", p.color)}>
                      {p.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <FiMoreVertical size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 1 col */}
          <div className="space-y-6">
            {/* Date + Add */}
            <div className="flex items-center gap-2 justify-end">
              <button className="text-xs text-foreground bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-1.5 hover:bg-secondary">
                <FiCalendar size={12} /> 1 Nov - 7 Nov 2024
              </button>
              <button className="text-xs text-primary-foreground bg-primary rounded-lg px-3 py-2 flex items-center gap-1.5 hover:bg-primary/90 font-medium">
                <FiPlus size={12} /> Tambah Baru
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-card border border-border rounded-xl p-5">
              <MiniCalendar />

              {/* Today */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Hari Ini</p>
                <MeetingItem {...meetings[0]} />
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Sab, Jan 20</p>
                <div className="space-y-3">
                  <MeetingItem {...meetings[1]} />
                  <MeetingItem {...meetings[2]} />
                </div>
              </div>
            </div>

            {/* Job applications card */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Aktivitas Terbaru</h3>
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 rounded-xl p-4 mb-3">
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-2">
                  Pengajuan Layanan
                </p>
                <h4 className="font-bold text-foreground mb-1">Permintaan Konsultasi</h4>
                <p className="text-xs text-muted-foreground">246 Diterima · 101 Diproses</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-4">
                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-2">
                  Subscriber Baru
                </p>
                <h4 className="font-bold text-foreground mb-1">Newsletter</h4>
                <p className="text-xs text-muted-foreground">87 subscriber minggu ini</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const MeetingItem = ({ name, time, color, count }: { name: string; time: string; color: string; count: number }) => (
  <div className="flex items-center gap-3 pl-3 relative">
    <span className={cn("absolute left-0 top-1 bottom-1 w-1 rounded-full", color)} />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground truncate">{name}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
    <div className="flex -space-x-1.5">
      <div className="w-6 h-6 rounded-full bg-orange-200 border-2 border-background" />
      <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-background" />
      <div className="w-6 h-6 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-[9px] font-semibold text-muted-foreground">
        +{count}
      </div>
    </div>
  </div>
);

export default Dashboard;
