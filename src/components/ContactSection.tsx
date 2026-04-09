import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { useState } from "react";

const contactInfo = [
  { icon: FiMapPin, label: "Alamat", value: "Jl. Jendral Sudirman No. 123, Jakarta Selatan" },
  { icon: FiPhone, label: "Telepon", value: "+62 21 1234 5678" },
  { icon: FiMail, label: "Email", value: "info@royalcitraabadi.co.id" },
  { icon: FiClock, label: "Jam Operasional", value: "Senin - Jumat, 09:00 - 18:00" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setForm({ nama: "", email: "", pesan: "" });
  };

  return (
    <section id="kontak" className="section-padding bg-section-alt">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Kontak</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Hubungi <span className="text-primary">Kami</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-muted-foreground text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-6 border shadow-sm space-y-4"
          >
            <input
              type="text"
              placeholder="Nama Lengkap"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Alamat Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              placeholder="Pesan Anda"
              required
              rows={4}
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button
              type="submit"
              className="w-full gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
