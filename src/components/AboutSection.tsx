import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import aboutImg from "@/assets/about-team.jpg";

const stats = [
  { value: "150+", label: "Klien" },
  { value: "300+", label: "Proyek" },
  { value: "98%", label: "Kepuasan" },
];

const AboutSection = () => (
  <section id="tentang" className="py-20 px-4 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Image with play button */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl relative">
            <img
              src={aboutImg}
              alt="Tim PT Royal Citra Abadi"
              className="w-full h-auto"
              loading="lazy"
              width={800}
              height={600}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <FiPlay className="text-primary-foreground ml-1" size={24} />
              </div>
            </div>
          </div>
          {/* Blue accent bar */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 gradient-primary rounded-2xl -z-10" />
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-5">
            Mengubah <span className="text-primary">Ide</span> Menjadi Realitas Digital
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            PT Royal Citra Abadi adalah perusahaan teknologi informasi yang berdedikasi untuk memberikan layanan
            terbaik dalam pengembangan website, aplikasi mobile, desain UI/UX, dan solusi IT enterprise.
            Kami percaya bahwa teknologi yang tepat dapat mempercepat pertumbuhan bisnis Anda.
          </p>
          {/* Stats row */}
          <div className="flex gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
