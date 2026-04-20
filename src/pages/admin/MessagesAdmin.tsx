import { CrudPage } from "@/components/admin/CrudPage";

interface Message {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  receivedAt: string;
}

export default function MessagesAdmin() {
  return (
    <CrudPage<Message>
      title="Pesan Kontak"
      subtitle="Kelola pesan masuk dari form kontak"
      storageKey="rca_messages"
      searchKeys={["name", "email", "subject"]}
      seed={[
        { id: "1", name: "Pak Joko", email: "joko@mail.com", phone: "081234567890", subject: "Konsultasi Web", message: "Saya butuh website company profile.", receivedAt: "2024-11-05" },
      ]}
      columns={[
        { key: "name", label: "Nama" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subjek" },
        { key: "receivedAt", label: "Tanggal" },
      ]}
      fields={[
        { name: "name", label: "Nama", required: true, maxLength: 100 },
        { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
        { name: "phone", label: "Telepon", maxLength: 20 },
        { name: "subject", label: "Subjek", required: true, maxLength: 200 },
        { name: "message", label: "Pesan", type: "textarea", required: true, maxLength: 1000 },
        { name: "receivedAt", label: "Tanggal Diterima", required: true, placeholder: "YYYY-MM-DD" },
      ]}
    />
  );
}
