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
  <section id="tentang" className="py-20 px-4 lg:px-8 mx-0 md:mx-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 items-center">
        {/* Left - Photo Collage Mosaic */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative grid grid-cols-2 gap-4">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              {/* Top Left */}
              <div className="overflow-hidden h-44 md:h-56 rounded-[5px] rounded-tl-[90px]">
                <img
                  src={aboutImg1}
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Left */}
              <div className="overflow-hidden h-52 md:h-64 rounded-[5px] rounded-bl-[90px]">
                <img
                  src={aboutImg2}
                  alt="Meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4 ">
              {/* Top Right */}
              <div className="overflow-hidden h-52 w-2/3 md:h-60 rounded-[5px] rounded-tr-[90px]">
                <img
                  src={aboutImg3}
                  alt="Executive"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Right */}
              <div className="overflow-hidden h-44 w-2/3 md:h-60 rounded-[5px] rounded-br-[90px]">
                <img
                  src={aboutImg4}
                  alt="Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CENTER BADGE (kayak seal biru di gambar) */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl border-4 border-white">
                  <FiPlay size={20} className="ml-1" />
                </div>

                {/* outer ring */}
                <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 opacity-40 animate-ping"></div>
              </div>
            </div>

            {/* DECORATIVE SHAPES */}
            <div className="absolute -top-4 right-20 w-32 h-32 bg-blue-800 rounded-[5x] rounded-tr-[90px] -z-10 opacity-80" />
            <div className="absolute -bottom-5 -left-4 w-52 h-52 bg-blue-600 rounded-[5px] rounded-bl-[90px] -z-10 opacity-80" />

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

          <p className="text-muted-foreground leading-relaxed text-justify">
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
