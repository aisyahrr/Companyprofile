import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiAward, FiGlobe } from "react-icons/fi";

const stats = [
  { icon: FiUsers, value: "150+", label: "Klien Puas" },
  { icon: FiBriefcase, value: "300+", label: "Proyek Selesai" },
  { icon: FiAward, value: "15+", label: "Penghargaan" },
  { icon: FiGlobe, value: "10+", label: "Tahun Pengalaman" },
];

const StatsSection = () => (
  <section className="gradient-primary section-padding">
    <div className="container-main">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center text-primary-foreground"
          >
            <stat.icon className="mx-auto mb-3" size={32} />
            <div className="text-3xl md:text-4xl font-extrabold">{stat.value}</div>
            <div className="text-sm opacity-80 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
