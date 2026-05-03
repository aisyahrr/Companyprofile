import { ReactNode, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
  HiOutlineShieldCheck,
  HiOutlineCog6Tooth,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineBars3,
  HiOutlinePhoto,
  HiOutlineBuildingOffice2,
  HiOutlineChartBar,
  HiOutlineInbox,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineBoltSlash,
  HiOutlineBolt,
  HiOutlineDocumentArrowUp,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlinePhone,
} from "react-icons/hi2";
import { getSession, logout, Role, ROLE_LABEL } from "@/lib/auth";
import { loadNotifs, markNotifRead } from "@/lib/certStore";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const menus: Record<Role, { label: string; items: MenuItem[] }[]> = {
  super_admin: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", url: "/app/super", icon: HiOutlineHome },
        { title: "Monitoring", url: "/app/super/monitoring", icon: HiOutlineChartBar },
        { title: "Final Approval", url: "/app/super/approval", icon: HiOutlineCheckCircle },
      ],
    },
    {
      label: "Manajemen",
      items: [
        { title: "User Management", url: "/app/super/users", icon: HiOutlineUsers },
        { title: "Activity Logs", url: "/app/super/activity", icon: HiOutlineClipboardDocumentCheck },
      ],
    },
    {
      label: "CMS Landing Page",
      items: [
        { title: "Hero Section", url: "/app/super/cms/hero", icon: HiOutlineSparkles },
        { title: "Tentang Perusahaan", url: "/app/super/cms/about", icon: HiOutlineBuildingOffice2 },
        { title: "Layanan", url: "/app/super/cms/services", icon: HiOutlineDocumentText },
        { title: "Tim", url: "/app/super/cms/team", icon: HiOutlineUserGroup },
        { title: "Portofolio", url: "/app/super/cms/portfolio", icon: HiOutlineBriefcase },
        { title: "Testimoni", url: "/app/super/cms/testimonials", icon: HiOutlineChatBubbleLeftRight },
        { title: "Blog", url: "/app/super/cms/blog", icon: HiOutlineNewspaper },
        { title: "FAQ", url: "/app/super/cms/faq", icon: HiOutlineQuestionMarkCircle },
        { title: "Galeri", url: "/app/super/cms/gallery", icon: HiOutlinePhoto },
        { title: "Kontak", url: "/app/super/cms/contact", icon: HiOutlinePhone },
      ],
    },
  ],
  petugas: [
    {
      label: "Pekerjaan Saya",
      items: [
        { title: "Dashboard", url: "/app/petugas", icon: HiOutlineHome },
        { title: "Buat Data Baru", url: "/app/petugas/new", icon: HiOutlinePencilSquare },
        { title: "Daftar Data", url: "/app/petugas/list", icon: HiOutlineDocumentText },
      ],
    },
  ],
  admin_nidi: [
    {
      label: "NIDI",
      items: [
        { title: "Dashboard", url: "/app/nidi", icon: HiOutlineHome },
        { title: "Data Masuk", url: "/app/nidi/inbox", icon: HiOutlineInbox },
        { title: "Validasi", url: "/app/nidi/validation", icon: HiOutlineShieldCheck },
        { title: "Integrasi PLN", url: "/app/nidi/pln", icon: HiOutlineBolt },
      ],
    },
  ],
  admin_slo: [
    {
      label: "SLO",
      items: [
        { title: "Dashboard", url: "/app/slo", icon: HiOutlineHome },
        { title: "Antrian SLO", url: "/app/slo/queue", icon: HiOutlineInbox },
        { title: "Proses Dokumen", url: "/app/slo/process", icon: HiOutlineDocumentArrowUp },
        { title: "Riwayat", url: "/app/slo/history", icon: HiOutlineClipboardDocumentCheck },
      ],
    },
  ],
};

const roleAccent: Record<Role, string> = {
  super_admin: "from-blue-600 to-indigo-700",
  petugas: "from-emerald-600 to-teal-700",
  admin_nidi: "from-violet-600 to-purple-700",
  admin_slo: "from-amber-500 to-orange-600",
};

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const AppShell = ({ title, subtitle, children, actions }: AppShellProps) => {
  const session = getSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!session) return null;

  const groups = menus[session.role];
  const accent = roleAccent[session.role];
  const notifs = loadNotifs().filter((n) => n.to === session.username || n.to === session.role);
  const unread = notifs.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 px-5 flex items-center gap-2 border-b border-slate-200">
          <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", accent)}>
            <HiOutlineShieldCheck size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">CertHub</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">NIDI & SLO</p>
          </div>
        </div>

        <div className="px-3 py-3 border-b border-slate-100">
          <div className={cn("rounded-lg px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r", accent)}>
            {ROLE_LABEL[session.role]}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                {g.label}
              </p>
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const active =
                    location.pathname === item.url ||
                    (item.url !== "/app/super" && item.url !== "/app/petugas" && item.url !== "/app/nidi" && item.url !== "/app/slo" && location.pathname.startsWith(item.url));
                  return (
                    <li key={item.url}>
                      <NavLink
                        to={item.url}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <item.icon size={18} className={active ? "text-blue-600" : "text-slate-400"} />
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <HiOutlineArrowRightOnRectangle size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setOpen(true)}
            >
              <HiOutlineBars3 size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base lg:text-lg font-bold text-slate-900 truncate leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                placeholder="Cari..."
                className="pl-9 pr-3 h-9 w-56 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 relative"
              >
                <HiOutlineBell size={18} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-slate-100 font-semibold text-sm flex justify-between">
                    <span>Notifikasi</span>
                    <span className="text-xs text-slate-500">{unread} baru</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-400">Tidak ada notifikasi</div>
                    ) : (
                      notifs.slice(0, 10).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => markNotifRead(n.id)}
                          className={cn(
                            "w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50",
                            !n.read && "bg-blue-50/50"
                          )}
                        >
                          <p className="text-sm font-medium text-slate-900">{n.title}</p>
                          {n.body && <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>}
                          <p className="text-[10px] text-slate-400 mt-1">
                            {new Date(n.ts).toLocaleString("id-ID")}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <div className={cn("w-7 h-7 rounded-md bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold", accent)}>
                  {session.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-slate-700">{session.name}</span>
                <HiOutlineChevronDown size={14} className="text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-semibold text-sm">{session.name}</p>
                    <p className="text-xs text-slate-500">{session.email}</p>
                    <p className="text-[10px] text-blue-600 mt-1 font-semibold uppercase">{ROLE_LABEL[session.role]}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2">
                    <HiOutlineCog6Tooth size={16} /> Pengaturan
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-slate-100"
                  >
                    <HiOutlineArrowRightOnRectangle size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {actions && <div className="mb-4 flex flex-wrap gap-2">{actions}</div>}
          {children}
        </main>
      </div>
    </div>
  );
};
