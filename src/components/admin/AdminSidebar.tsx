import { NavLink, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiUsers,
  FiMessageSquare,
  FiHelpCircle,
  FiFileText,
  FiMail,
  FiChevronsLeft,
  FiChevronDown,
  FiCircle,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const mainMenu = [
  { title: "Dashboard", url: "/admin", icon: FiHome },
  { title: "Tentang Kami", url: "/admin/about", icon: FiInfo },
  { title: "Layanan", url: "/admin/services", icon: FiBriefcase },
  { title: "Tim", url: "/admin/team", icon: FiUsers },
  { title: "Portofolio", url: "/admin/portfolio", icon: FiFileText },
  { title: "Testimoni", url: "/admin/testimonials", icon: FiMessageSquare },
];

const secondaryMenu = [
  { title: "Blog", url: "/admin/blog", icon: FiFileText },
  { title: "FAQ", url: "/admin/faq", icon: FiHelpCircle },
  { title: "Subscribers", url: "/admin/subscribers", icon: FiMail },
];

const projects = [
  { title: "Website Redesign", color: "text-orange-500" },
  { title: "Mobile App", color: "text-sky-500" },
  { title: "Branding RCA", color: "text-emerald-500" },
];

export const AdminSidebar = () => {
  const location = useLocation();

  const itemClass = (active: boolean) =>
    cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
      active
        ? "bg-secondary text-foreground"
        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
    );

  return (
    <aside className="w-64 shrink-0 bg-background border-r border-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            R
          </div>
          <span className="font-bold text-lg text-foreground">RoyalCMS</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <FiChevronsLeft size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-10 py-2 text-sm rounded-lg bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground">
            K
          </kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-6">
        {/* Main Menu */}
        <div>
          <p className="text-[11px] font-semibold uppercase text-muted-foreground/60 px-3 mb-2">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {mainMenu.map((item) => {
              const active = location.pathname === item.url;
              return (
                <li key={item.title}>
                  <NavLink to={item.url} className={itemClass(active)}>
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r" />
                    )}
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Secondary */}
        <div>
          <p className="text-[11px] font-semibold uppercase text-muted-foreground/60 px-3 mb-2">
            Konten
          </p>
          <ul className="space-y-0.5">
            {secondaryMenu.map((item) => {
              const active = location.pathname === item.url;
              return (
                <li key={item.title}>
                  <NavLink to={item.url} className={itemClass(active)}>
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[11px] font-semibold uppercase text-muted-foreground/60">
              Projects
            </p>
            <button className="text-muted-foreground hover:text-foreground">
              <FiCircle size={12} />
            </button>
          </div>
          <ul className="space-y-0.5">
            {projects.map((p) => (
              <li key={p.title}>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground">
                  <FiCircle className={cn("fill-current", p.color)} size={10} />
                  <span>{p.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <button className="w-full text-center text-xs text-muted-foreground py-2 mt-1 hover:text-foreground flex items-center justify-center gap-1">
            See all <FiChevronDown size={12} />
          </button>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Admin RCA</p>
            <p className="text-xs text-muted-foreground truncate">Workspace</p>
          </div>
          <FiChevronDown size={14} className="text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};
