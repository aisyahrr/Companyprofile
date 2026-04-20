import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { logout } from "@/lib/auth";
import { FiBell, FiLogOut, FiMessageSquare } from "react-icons/fi";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const AdminLayout = ({ title, subtitle, children, actions }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/40 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary">
              <FiMessageSquare size={16} />
            </button>
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary relative">
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={handleLogout}
              className="h-9 px-3 rounded-lg border border-border flex items-center gap-2 text-sm text-foreground hover:bg-secondary"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          {actions && <div className="mb-4">{actions}</div>}
          {children}
        </main>
      </div>
    </div>
  );
};
