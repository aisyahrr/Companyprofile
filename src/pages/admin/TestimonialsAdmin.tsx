import { CrudPage } from "@/components/admin/CrudPage";

interface Testimonial {
  name: string;
  company: string;
  rating: number;
  message: string;
}

export default function TestimonialsAdmin() {
  return (
    <CrudPage<Testimonial>
      title="Testimoni"
      subtitle="Kelola testimoni klien"
      storageKey="rca_testimonials"
      searchKeys={["name", "company"]}
      seed={[
        { id: "1", name: "Pak Hendra", company: "PT Maju Jaya", rating: 5, message: "Pelayanan sangat profesional!" },
        { id: "2", name: "Ibu Sari", company: "Toko Berkah", rating: 5, message: "Hasil sesuai ekspektasi." },
      ]}
      columns={[
        { key: "name", label: "Nama" },
        { key: "company", label: "Perusahaan" },
        { key: "rating", label: "Rating", render: (r) => "★".repeat(r.rating) + "☆".repeat(5 - r.rating) },
      ]}
      fields={[
        { name: "name", label: "Nama Klien", required: true, maxLength: 100 },
        { name: "company", label: "Perusahaan", required: true, maxLength: 100 },
        { name: "rating", label: "Rating (1-5)", type: "number", required: true },
        { name: "message", label: "Pesan Testimoni", type: "textarea", required: true, maxLength: 500 },
      ]}
    />
  );
}
