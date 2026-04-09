import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCode, FiLayout, FiSmartphone, FiImage } from "react-icons/fi";
import { useState } from "react";

const contactInfo = [
  { icon: FiMapPin, value: "Jl. Jendral Sudirman No. 123, Jakarta Selatan" },
  { icon: FiPhone, value: "+62 21 1234 5678" },
  { icon: FiMail, value: "info@royalcitraabadi.co.id" },
  { icon: FiClock, value: "Senin - Jumat, 09:00 - 18:00" },
];

const QuoteSection = () => {
  const [form, setForm] = useState({ nama: "", email: "", layanan: "", pesan: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setForm({ nama: "", email: "", layanan: "", pesan: "" });
  };

  return (
    <section id="kontak" className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left - Dark card with contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-2xl p-8 text-navy-foreground"
          >
            <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
            <div className="space-y-5 mb-8">
              {contactInfo.map((item) => (
                <div key={item.value} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground flex-shrink-0 mt-0.5">
                    <item.icon size={16} />
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              Dapatkan <span className="text-primary">Konsultasi Gratis</span> Hari Ini!
            </h2>
            <p className="text-muted-foreground text-sm mb-6">Isi form berikut dan tim kami akan menghubungi Anda.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
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
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={form.layanan}
                onChange={(e) => setForm({ ...form, layanan: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Pilih Layanan</option>
                <option>Pengembangan Website</option>
                <option>Aplikasi Mobile</option>
                <option>Desain UI/UX</option>
                <option>Cloud & Server</option>
                <option>Keamanan Siber</option>
                <option>Digital Marketing</option>
              </select>
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
                className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition text-sm"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      {/* Service tags bar */}
      <div className="max-w-7xl mx-auto mt-14">
        <div className="gradient-primary rounded-xl overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { icon: FiCode, label: "Pengembangan Website" },
              { icon: FiLayout, label: "Desain UI/UX" },
              { icon: FiSmartphone, label: "Aplikasi Mobile" },
              { icon: FiImage, label: "Desain Grafis" },
            ].map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-2 px-8 py-4 text-primary-foreground text-sm font-medium whitespace-nowrap border-r border-primary-foreground/20 last:border-r-0"
              >
                <tag.icon size={16} />
                {tag.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
