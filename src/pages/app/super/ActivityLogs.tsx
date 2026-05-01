import { AppShell } from "@/components/app/AppShell";
import { loadActivity } from "@/lib/certStore";
import { HiOutlineClock } from "react-icons/hi2";

const ActivityLogs = () => {
  const list = loadActivity();
  return (
    <AppShell title="Activity Logs" subtitle="Riwayat seluruh aksi sistem">
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        {list.length === 0 ? (
          <p className="text-center text-slate-400 py-12">Belum ada aktivitas tercatat</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {list.map((a, i) => (
              <li key={i} className="py-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <HiOutlineClock size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{a.action}</p>
                  <p className="text-xs text-slate-500">
                    oleh <span className="font-semibold">{a.by}</span> • {new Date(a.ts).toLocaleString("id-ID")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
};

export default ActivityLogs;
