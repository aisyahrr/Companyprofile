import { CrudPage } from "@/components/admin/CrudPage";

interface About {
  section: string;
  title: string;
  content: string;
}

export default function AboutAdmin() {
  return (
    <CrudPage<About>
      title="Tentang Kami"
      subtitle="Kelola konten section About"
      storageKey="rca_about"
      searchKeys={["section", "title"]}
      seed={[
        { id: "1", section: "Visi", title: "Visi Kami", content: "Menjadi mitra digital terpercaya di Indonesia." },
        { id: "2", section: "Misi", title: "Misi Kami", content: "Memberikan solusi digital berkualitas tinggi." },
      ]}
      columns={[
        { key: "section", label: "Section" },
        { key: "title", label: "Judul" },
      ]}
      fields={[
        { name: "section", label: "Nama Section", required: true, maxLength: 50 },
        { name: "title", label: "Judul", required: true, maxLength: 150 },
        { name: "content", label: "Konten", type: "textarea", required: true, maxLength: 1000 },
      ]}
    />
  );
}
