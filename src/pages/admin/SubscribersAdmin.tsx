import { CrudPage } from "@/components/admin/CrudPage";

interface Subscriber {
  email: string;
  name: string;
  subscribedAt: string;
  status: string;
}

export default function SubscribersAdmin() {
  return (
    <CrudPage<Subscriber>
      title="Subscribers"
      subtitle="Kelola pelanggan newsletter"
      storageKey="rca_subscribers"
      searchKeys={["email", "name"]}
      seed={[
        { id: "1", email: "user1@mail.com", name: "Andi", subscribedAt: "2024-11-01", status: "Aktif" },
        { id: "2", email: "user2@mail.com", name: "Bayu", subscribedAt: "2024-10-20", status: "Aktif" },
      ]}
      columns={[
        { key: "email", label: "Email" },
        { key: "name", label: "Nama" },
        { key: "subscribedAt", label: "Tanggal Daftar" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
        { name: "name", label: "Nama", required: true, maxLength: 100 },
        { name: "subscribedAt", label: "Tanggal Daftar", required: true, placeholder: "YYYY-MM-DD" },
        { name: "status", label: "Status", type: "select", options: ["Aktif", "Berhenti"], required: true },
      ]}
    />
  );
}
