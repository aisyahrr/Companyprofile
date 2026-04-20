import { CrudPage } from "@/components/admin/CrudPage";

interface Faq {
  question: string;
  answer: string;
  category: string;
}

export default function FaqAdmin() {
  return (
    <CrudPage<Faq>
      title="FAQ"
      subtitle="Kelola pertanyaan yang sering diajukan"
      storageKey="rca_faq"
      searchKeys={["question"]}
      seed={[
        { id: "1", question: "Berapa lama proses pengerjaan?", answer: "Tergantung kompleksitas, rata-rata 2-8 minggu.", category: "Umum" },
        { id: "2", question: "Apakah ada garansi?", answer: "Ya, garansi 3 bulan untuk semua proyek.", category: "Layanan" },
      ]}
      columns={[
        { key: "question", label: "Pertanyaan" },
        { key: "category", label: "Kategori" },
      ]}
      fields={[
        { name: "question", label: "Pertanyaan", required: true, maxLength: 200 },
        { name: "answer", label: "Jawaban", type: "textarea", required: true, maxLength: 1000 },
        { name: "category", label: "Kategori", type: "select", options: ["Umum", "Layanan", "Pembayaran", "Teknis"], required: true },
      ]}
    />
  );
}
