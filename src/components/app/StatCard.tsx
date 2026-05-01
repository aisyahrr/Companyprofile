import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  accent?: "blue" | "emerald" | "violet" | "amber" | "red" | "slate";
}

const accents = {
  blue: "from-blue-500 to-indigo-600",
  emerald: "from-emerald-500 to-teal-600",
  violet: "from-violet-500 to-purple-600",
  amber: "from-amber-500 to-orange-600",
  red: "from-red-500 to-rose-600",
  slate: "from-slate-500 to-slate-700",
};

export const StatCard = ({ label, value, icon, trend, trendUp, accent = "blue" }: StatCardProps) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br text-white flex items-center justify-center", accents[accent])}>
        {icon}
      </div>
      {trend && (
        <span className={cn("text-xs font-semibold", trendUp ? "text-emerald-600" : "text-red-600")}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
    <p className="text-sm text-slate-500 mt-0.5">{label}</p>
  </div>
);
