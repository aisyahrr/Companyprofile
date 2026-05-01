import { CertStatus, STATUS_COLORS } from "@/lib/certStore";
import { cn } from "@/lib/utils";

export const StatusBadge = ({ status, className }: { status: CertStatus; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap",
      STATUS_COLORS[status],
      className
    )}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
    {status}
  </span>
);
