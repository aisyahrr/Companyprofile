import { CertRecord } from "@/lib/certStore";
import { Modal } from "./Modal";
import { StatusBadge } from "./StatusBadge";
import {
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineBolt,
  HiOutlineDocumentText,
  HiOutlineClock,
} from "react-icons/hi2";

interface DetailProps {
  cert: CertRecord | null;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-900 break-words">{value || "-"}</p>
    </div>
  </div>
);

export const CertDetailModal = ({ cert, onClose, footer }: DetailProps) => {
  if (!cert) return null;
  return (
    <Modal
      open={!!cert}
      onClose={onClose}
      title={cert.customerName}
      subtitle={`ID: ${cert.id}`}
      size="lg"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={cert.status} />
        <span className="text-xs text-slate-500">
          Diperbarui {new Date(cert.updatedAt).toLocaleString("id-ID")}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-6">
        <Row icon={<HiOutlineUser size={16} />} label="Nama Pelanggan" value={cert.customerName} />
        <Row icon={<HiOutlineIdentification size={16} />} label="No. Identitas" value={cert.idNumber} />
        <Row icon={<HiOutlinePhone size={16} />} label="Telepon" value={cert.phone} />
        <Row icon={<HiOutlineMapPin size={16} />} label="Alamat" value={cert.address} />
        <Row icon={<HiOutlineBolt size={16} />} label="Kapasitas" value={cert.capacity} />
        <Row icon={<HiOutlineDocumentText size={16} />} label="Jenis Instalasi" value={cert.installationType} />
        {cert.plnStep1 && <Row icon={<HiOutlineBolt size={16} />} label="PLN Step 1" value={cert.plnStep1} />}
        {cert.plnStep2 && <Row icon={<HiOutlineBolt size={16} />} label="PLN Step 2" value={cert.plnStep2} />}
        {cert.nidiNumber && <Row icon={<HiOutlineIdentification size={16} />} label="No. NIDI" value={cert.nidiNumber} />}
        {cert.sloNumber && <Row icon={<HiOutlineIdentification size={16} />} label="No. SLO" value={cert.sloNumber} />}
      </div>

      {cert.documents.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Dokumen</p>
          <div className="flex flex-wrap gap-2">
            {cert.documents.map((d) => (
              <span key={d} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200 inline-flex items-center gap-1.5">
                <HiOutlineDocumentText size={14} /> {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {cert.sloDocuments && cert.sloDocuments.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Dokumen SLO</p>
          <div className="flex flex-wrap gap-2">
            {cert.sloDocuments.map((d) => (
              <span key={d} className="px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium border border-violet-200 inline-flex items-center gap-1.5">
                <HiOutlineDocumentText size={14} /> {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {cert.rejectReason && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-xs font-semibold text-red-700 mb-1">Alasan Penolakan</p>
          <p className="text-sm text-red-700">{cert.rejectReason}</p>
        </div>
      )}

      {cert.notes && (
        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs font-semibold text-slate-700 mb-1">Catatan</p>
          <p className="text-sm text-slate-700">{cert.notes}</p>
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-3 flex items-center gap-1.5">
          <HiOutlineClock size={14} /> Riwayat Workflow
        </p>
        <div className="space-y-3 border-l-2 border-slate-100 pl-4">
          {cert.history.slice().reverse().map((h, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
              <p className="text-sm font-medium text-slate-900">{h.action}</p>
              <p className="text-xs text-slate-500">
                oleh {h.by} • {new Date(h.ts).toLocaleString("id-ID")}
              </p>
              {h.note && <p className="text-xs text-slate-600 mt-1 italic">"{h.note}"</p>}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
