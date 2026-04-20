import { CrudPage } from "@/components/admin/CrudPage";

interface Portfolio {
  title: string;
  client: string;
  category: string;
  year: string;
  url: string;
}

export default function PortfolioAdmin() {
  return (
    <CrudPage<Portfolio>
      title="Portofolio"
      subtitle="Kelola proyek portofolio yang ditampilkan"
      storageKey="rca_portfolio"
      searchKeys={["title", "client"]}
      seed={[
        { id: "1", title: "Website Corporate Bank XYZ", client: "Bank XYZ", category: "Web", year: "2024", url: "https://example.com" },
        { id: "2", title: "Mobile App Retail", client: "PT Retail Maju", category: "Mobile", year: "2023", url: "https://example.com" },
      ]}
      columns={[
        { key: "title", label: "Judul Proyek" },
        { key: "client", label: "Klien" },
        { key: "category", label: "Kategori" },
        { key: "year", label: "Tahun" },
      ]}
      fields={[
        { name: "title", label: "Judul Proyek", required: true, maxLength: 150 },
        { name: "client", label: "Nama Klien", required: true, maxLength: 100 },
        { name: "category", label: "Kategori", type: "select", options: ["Web", "Mobile", "Branding", "Marketing"], required: true },
        { name: "year", label: "Tahun", required: true, maxLength: 4 },
        { name: "url", label: "URL Proyek", type: "url", maxLength: 255 },
      ]}
    />
  );
}
