import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import aboutImg1 from "@/assets/about-team.jpg";
import aboutImg2 from "@/assets/about-2.jpg";
import aboutImg3 from "@/assets/about-3.jpg";
import aboutImg4 from "@/assets/about-4.jpg";

const stats = [
  { value: "150+", label: "Klien" },
  { value: "300+", label: "Proyek" },
  { value: "95%", label: "Kepuasan" },
];

const AboutSection = () => (
  <section id="tentang" className="py-20 px-4 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Photo Collage Mosaic */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Top-left image */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-40 md:h-48">
                <img src={aboutImg1} alt="Tim kerja" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl overflow-hidden h-52 md:h-64">
                <img src={aboutImg2} alt="Meeting tim" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            {/* Right column - offset upward */}
            <div className="space-y-4 -mt-6">
              <div className="rounded-2xl overflow-hidden h-52 md:h-64">
                <img src={aboutImg3} alt="Eksekutif" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl overflow-hidden h-40 md:h-48">
                <img src={aboutImg4} alt="Kolaborasi tim" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform border-4 border-white">
                <FiPlay className="text-primary-foreground ml-0.5" size={20} />
              </div>
            </div>

            {/* Blue decorative shapes */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary rounded-2xl -z-10 opacity-80" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-primary rounded-2xl -z-10 opacity-80" />
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-5 leading-tight">
            Mengubah <span className="text-primary">Ide</span> Menjadi Realitas Digital
          </h2>

          {/* Stats row */}
          <div className="flex gap-8 mb-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            PT Royal Citra Abadi adalah perusahaan teknologi informasi yang berdedikasi untuk memberikan layanan
            terbaik dalam pengembangan website, aplikasi mobile, desain UI/UX, dan solusi IT enterprise.
            Kami percaya bahwa teknologi yang tepat dapat mempercepat pertumbuhan bisnis Anda.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
