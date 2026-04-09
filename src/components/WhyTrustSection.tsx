import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiClock, FiHeadphones } from "react-icons/fi";
import whyTrustImg from "@/assets/why-trust.jpg";

const features = [
  { icon: FiCheckCircle, title: "Profesional", desc: "Tim bersertifikasi dengan pengalaman bertahun-tahun" },
  { icon: FiUsers, title: "Tim Berdedikasi", desc: "Setiap proyek ditangani oleh tim khusus yang fokus" },
  { icon: FiClock, title: "Tepat Waktu", desc: "Komitmen pengerjaan sesuai timeline yang disepakati" },
  { icon: FiHeadphones, title: "Dukungan 24/7", desc: "Tim support siap membantu kapan saja Anda butuhkan" },
];

const WhyTrustSection = () => (
  <section className="py-20 px-4 lg:px-8 bg-navy">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Mengapa Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-8 text-navy-foreground">
            Mengapa Mempercayai Kami untuk{" "}
            <span className="text-primary">Kebutuhan IT</span> Anda?
          </h2>
          <div className="rounded-2xl overflow-hidden">
            <img src={whyTrustImg} alt="Tim kerja" className="w-full h-auto" loading="lazy" width={768} height={512} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="bg-[hsl(220,20%,14%)] rounded-xl p-5 border border-[hsl(220,20%,20%)]">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground mb-3">
                  <f.icon size={18} />
                </div>
                <h3 className="font-bold text-navy-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyTrustSection;
