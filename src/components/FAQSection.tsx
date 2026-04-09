import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan proyek website?",
    a: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk website company profile, biasanya 2-4 minggu. Untuk web application, bisa memakan waktu 2-3 bulan.",
  },
  {
    q: "Apakah ada garansi setelah proyek selesai?",
    a: "Ya, kami memberikan garansi maintenance selama 3 bulan setelah proyek selesai. Selama masa garansi, kami akan memperbaiki bug dan masalah teknis tanpa biaya tambahan.",
  },
  {
    q: "Teknologi apa yang digunakan untuk pengembangan?",
    a: "Kami menggunakan teknologi terkini seperti React, Next.js, Node.js, React Native, Flutter, dan berbagai framework modern lainnya sesuai kebutuhan proyek.",
  },
  {
    q: "Bagaimana cara memulai proyek dengan Royal Citra Abadi?",
    a: "Anda bisa menghubungi kami melalui form kontak atau langsung menghubungi kami via telepon/email. Tim kami akan mengatur jadwal konsultasi gratis untuk membahas kebutuhan proyek Anda.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Pertanyaan? <span className="text-primary">Temukan di sini.</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <FiChevronDown
                    className={`text-primary flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                    size={18}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
