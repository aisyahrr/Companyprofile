import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    name: "Rina Permatasari",
    role: "CEO, PT Maju Bersama",
    img: testimonial1,
    text: "Royal Citra Abadi membantu kami membangun website e-commerce yang luar biasa. Hasilnya melebihi ekspektasi dan penjualan online kami meningkat 200%.",
    rating: 5,
  },
  {
    name: "Hendra Wijaya",
    role: "CTO, Startup Inovasi",
    img: testimonial2,
    text: "Tim yang sangat profesional dan responsif. Aplikasi mobile yang mereka kembangkan sangat stabil dan user-friendly. Sangat merekomendasikan!",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-20 px-4 lg:px-8 bg-navy">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Testimoni</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-navy-foreground">
          Testimoni, <span className="text-primary">Dipercaya</span> oleh Klien Kami
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-[hsl(220,20%,14%)] border border-[hsl(220,20%,20%)] rounded-2xl p-6"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <FiStar key={j} className="text-yellow-400 fill-yellow-400" size={16} />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-semibold text-sm text-navy-foreground">{t.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
