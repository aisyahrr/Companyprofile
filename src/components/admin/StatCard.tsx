import { FiArrowRight } from "react-icons/fi";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: IconType;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}

export const StatCard = ({ icon: Icon, value, label, iconBg, iconColor }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon className={iconColor} size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
      <button className="flex items-center justify-between w-full pt-3 border-t border-border text-xs text-muted-foreground hover:text-foreground">
        <span>Lihat detail</span>
        <FiArrowRight size={12} />
      </button>
    </div>
  );
};
