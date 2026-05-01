import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DataTable } from "@/components/app/DataTable";
import { Modal } from "@/components/app/Modal";
import { ManagedUser, loadUsers, upsertUser, deleteUser } from "@/lib/usersStore";
import { Role, ROLE_LABEL } from "@/lib/auth";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";

const roles: Role[] = ["super_admin", "petugas", "admin_nidi", "admin_slo"];

const empty: Partial<ManagedUser> = { name: "", username: "", email: "", role: "petugas", password: "", active: true };

const UsersAdmin = () => {
  const [users, setUsers] = useState<ManagedUser[]>(loadUsers());
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<ManagedUser>>(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const refresh = () => setUsers(loadUsers());

  const startCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const startEdit = (u: ManagedUser) => { setForm(u); setEditing(u.id); setOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.username || !form.email) return;
    upsertUser({ ...form, id: editing || undefined });
    setOpen(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus user ini?")) {
      deleteUser(id);
      refresh();
    }
  };

  return (
    <AppShell
      title="User Management"
      subtitle="Kelola pengguna dan role"
      actions={
        <button
          onClick={startCreate}
          className="ml-auto h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 hover:bg-blue-700"
        >
          <HiOutlinePlus size={16} /> Tambah User
        </button>
      }
    >
      <DataTable<ManagedUser>
        data={users}
        searchKeys={["name", "username", "email"]}
        filterKey="role"
        filterOptions={roles.map((r) => r)}
        columns={[
          {
            key: "name",
            label: "Nama",
            render: (u) => (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500">@{u.username}</p>
                </div>
              </div>
            ),
          },
          { key: "email", label: "Email" },
          {
            key: "role",
            label: "Role",
            render: (u) => (
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                {ROLE_LABEL[u.role]}
              </span>
            ),
          },
          {
            key: "active",
            label: "Status",
            render: (u) =>
              u.active ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                  <HiOutlineCheck size={14} /> Aktif
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                  <HiOutlineXMark size={14} /> Nonaktif
                </span>
              ),
          },
          {
            key: "actions",
            label: "",
            render: (u) => (
              <div className="flex justify-end gap-1">
                <button onClick={() => startEdit(u)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">
                  <HiOutlinePencil size={16} />
                </button>
                <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500">
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit User" : "Tambah User"}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="px-4 h-9 rounded-lg border border-slate-200 text-sm">Batal</button>
            <button onClick={handleSave} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Simpan</button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { k: "name", label: "Nama Lengkap" },
            { k: "username", label: "Username" },
            { k: "email", label: "Email", type: "email" },
            { k: "password", label: "Password" },
          ].map((f) => (
            <div key={f.k} className={f.k === "name" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
              <input
                type={f.type || "text"}
                value={(form as Record<string, string>)[f.k] || ""}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {roles.map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
            <select
              value={form.active ? "1" : "0"}
              onChange={(e) => setForm({ ...form, active: e.target.value === "1" })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="1">Aktif</option>
              <option value="0">Nonaktif</option>
            </select>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
};

export default UsersAdmin;
