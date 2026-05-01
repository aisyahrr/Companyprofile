import { ReactNode } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

export const Modal = ({ open, onClose, title, subtitle, children, footer, size = "md" }: ModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn("w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col", sizes[size])}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
            <HiOutlineXMark size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};
