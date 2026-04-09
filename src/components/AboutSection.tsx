import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import aboutImg from "@/assets/about-team.jpg";

const highlights = [
  "Pengalaman lebih dari 10 tahun di industri IT",
  "Tim profesional bersertifikasi internasional",
  "Solusi yang disesuaikan dengan kebutuhan klien",
  "Dukungan teknis 24/7",
];

const AboutSection = () => (
  <section id="tentang" className="section-padding">
    <div className="container-main">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={aboutImg}
            alt="Tim PT Royal Citra Abadi"
            className="rounded-2xl shadow-xl w-full"
            loading="lazy"
            width={800}
            height={600}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
            Mengubah <span className="text-primary">Ide</span> Menjadi Realitas Digital
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            PT Royal Citra Abadi adalah perusahaan teknologi informasi yang berdedikasi untuk memberikan layanan
            terbaik dalam pengembangan website, aplikasi mobile, desain UI/UX, dan solusi IT enterprise.
            Kami percaya bahwa teknologi yang tepat dapat mempercepat pertumbuhan bisnis Anda.
          </p>
          <div className="space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <FiCheckCircle className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
