import { CrudPage } from "@/components/admin/CrudPage";

interface Blog {
  title: string;
  author: string;
  category: string;
  date: string;
  excerpt: string;
}

export default function BlogAdmin() {
  return (
    <CrudPage<Blog>
      title="Blog"
      subtitle="Kelola artikel blog"
      storageKey="rca_blog"
      searchKeys={["title", "author"]}
      seed={[
        { id: "1", title: "Tips Memilih Vendor Digital", author: "Admin", category: "Tips", date: "2024-11-01", excerpt: "Panduan singkat memilih vendor..." },
        { id: "2", title: "Tren Desain 2025", author: "Citra", category: "Desain", date: "2024-10-20", excerpt: "Tren desain yang akan populer..." },
      ]}
      columns={[
        { key: "title", label: "Judul" },
        { key: "author", label: "Penulis" },
        { key: "category", label: "Kategori" },
        { key: "date", label: "Tanggal" },
      ]}
      fields={[
        { name: "title", label: "Judul Artikel", required: true, maxLength: 200 },
        { name: "author", label: "Penulis", required: true, maxLength: 100 },
        { name: "category", label: "Kategori", type: "select", options: ["Tips", "Desain", "Teknologi", "Marketing", "Bisnis"], required: true },
        { name: "date", label: "Tanggal Publish", required: true, placeholder: "YYYY-MM-DD" },
        { name: "excerpt", label: "Ringkasan", type: "textarea", required: true, maxLength: 300 },
      ]}
    />
  );
}
