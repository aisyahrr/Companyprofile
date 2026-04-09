import { motion } from "framer-motion";
import { FiSearch, FiPenTool, FiCode, FiCheckCircle } from "react-icons/fi";

const steps = [
  { icon: FiSearch, title: "Analisis", desc: "Memahami kebutuhan bisnis dan tujuan proyek Anda" },
  { icon: FiPenTool, title: "Desain", desc: "Merancang solusi visual dan arsitektur sistem" },
  { icon: FiCode, title: "Pengembangan", desc: "Membangun produk dengan teknologi terbaik" },
  { icon: FiCheckCircle, title: "Pengiriman", desc: "Testing, deployment, dan dukungan berkelanjutan" },
];

const WorkProcessSection = () => (
  <section className="py-20 px-4 lg:px-12 bg-section-alt">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Proses Kerja</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Proses Kerja <span className="text-primary">Terbukti</span> Kami
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center relative"
          >
            <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-4 bg-background">
              <step.icon className="text-primary" size={24} />
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
            )}
            <h3 className="font-bold text-base mb-2">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    {/* Service tags bar */}
    <div className="max-w-7xl mx-auto mt-14">
      <div className="gradient-primary rounded-xl overflow-hidden">
        <div className="flex overflow-x-auto justify-center">
          {["Pengembangan Website", "Desain UI/UX", "Desain Grafis", "Keamanan Siber"].map((tag, i) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-8 py-4 text-primary-foreground text-sm font-medium whitespace-nowrap border-r border-primary-foreground/20 last:border-r-0"
            >
              <span className="w-2 h-2 rounded-full bg-primary-foreground/60" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WorkProcessSection;
