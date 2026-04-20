import { CrudPage } from "@/components/admin/CrudPage";

interface Service {
  title: string;
  category: string;
  description: string;
  price: string;
}

export default function ServicesAdmin() {
  return (
    <CrudPage<Service>
      title="Layanan"
      subtitle="Kelola daftar layanan PT Royal Citra Abadi"
      storageKey="rca_services"
      searchKeys={["title", "category"]}
      seed={[
        { id: "1", title: "Web Development", category: "Digital", description: "Pembuatan website korporat", price: "Mulai Rp 5.000.000" },
        { id: "2", title: "Branding", category: "Desain", description: "Logo & identitas visual", price: "Mulai Rp 3.000.000" },
        { id: "3", title: "Digital Marketing", category: "Marketing", description: "Strategi pemasaran online", price: "Mulai Rp 4.000.000" },
      ]}
      columns={[
        { key: "title", label: "Judul" },
        { key: "category", label: "Kategori" },
        { key: "price", label: "Harga" },
      ]}
      fields={[
        { name: "title", label: "Judul Layanan", required: true, maxLength: 100 },
        { name: "category", label: "Kategori", type: "select", options: ["Digital", "Desain", "Marketing", "Konsultasi"], required: true },
        { name: "description", label: "Deskripsi", type: "textarea", required: true, maxLength: 500 },
        { name: "price", label: "Harga", required: true, maxLength: 50 },
      ]}
    />
  );
}
