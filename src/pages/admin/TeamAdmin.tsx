import { CrudPage } from "@/components/admin/CrudPage";

interface Team {
  name: string;
  position: string;
  email: string;
  linkedin: string;
}

export default function TeamAdmin() {
  return (
    <CrudPage<Team>
      title="Tim"
      subtitle="Kelola anggota tim yang ditampilkan di landing page"
      storageKey="rca_team"
      searchKeys={["name", "position"]}
      seed={[
        { id: "1", name: "Ahmad Royal", position: "CEO & Founder", email: "ahmad@rca.id", linkedin: "ahmad-royal" },
        { id: "2", name: "Citra Dewi", position: "CTO", email: "citra@rca.id", linkedin: "citra-dewi" },
        { id: "3", name: "Budi Santoso", position: "Lead Designer", email: "budi@rca.id", linkedin: "budi-santoso" },
      ]}
      columns={[
        { key: "name", label: "Nama" },
        { key: "position", label: "Posisi" },
        { key: "email", label: "Email" },
      ]}
      fields={[
        { name: "name", label: "Nama Lengkap", required: true, maxLength: 100 },
        { name: "position", label: "Posisi/Jabatan", required: true, maxLength: 100 },
        { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
        { name: "linkedin", label: "LinkedIn Username", maxLength: 100 },
      ]}
    />
  );
}
