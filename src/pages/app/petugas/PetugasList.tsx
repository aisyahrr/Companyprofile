import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { CertDetailModal } from "@/components/app/CertDetailModal";
import { CertRecord, CertStatus, loadCerts, deleteCert } from "@/lib/certStore";
import { getSession } from "@/lib/auth";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlinePlus } from "react-icons/hi2";

const STATUSES: CertStatus[] = ["Draft", "Revisi", "Validasi NIDI", "NIDI Selesai", "Proses SLO", "Final Approval", "Selesai", "Ditolak"];

const PetugasList = () => {
  const session = getSession()!;
  const navigate = useNavigate();
  const [data, setData] = useState<CertRecord[]>(loadCerts().filter((c) => c.createdBy === session.username));
  const [selected, setSelected] = useState<CertRecord | null>(null);

  const refresh = () => setData(loadCerts().filter((c) => c.createdBy === session.username));

  const remove = (id: string) => {
    if (confirm("Hapus data ini?")) { deleteCert(id); refresh(); }
  };

  return (
    <AppShell
      title="Daftar Data Pelanggan"
      subtitle="Semua data yang Anda input"
      actions={
        <button onClick={() => navigate("/app/petugas/new")} className="ml-auto h-9 px-4 rounded-lg bg-emerald-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-emerald-700">
          <HiOutlinePlus size={16} /> Buat Baru
        </button>
      }
    >
      <DataTable<CertRecord>
        data={data}
        searchKeys={["customerName", "idNumber"]}
        filterKey="status"
        filterOptions={STATUSES}
        columns={[
          { key: "customerName", label: "Pelanggan", render: (r) => <div><p className="font-semibold text-slate-900">{r.customerName}</p><p className="text-xs text-slate-500">{r.idNumber}</p></div> },
          { key: "capacity", label: "Kapasitas" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "updatedAt", label: "Update", render: (r) => <span className="text-xs text-slate-500">{new Date(r.updatedAt).toLocaleDateString("id-ID")}</span> },
          {
            key: "actions",
            label: "",
            className: "text-right",
            render: (r) => (
              <div className="flex justify-end gap-1">
                <button onClick={() => setSelected(r)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlineEye size={16} /></button>
                {(r.status === "Draft" || r.status === "Revisi") && (
                  <button onClick={() => navigate(`/app/petugas/edit/${r.id}`)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500"><HiOutlinePencil size={16} /></button>
                )}
                {r.status === "Draft" && (
                  <button onClick={() => remove(r.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><HiOutlineTrash size={16} /></button>
                )}
              </div>
            ),
          },
        ]}
      />

      <CertDetailModal cert={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
};

export default PetugasList;
