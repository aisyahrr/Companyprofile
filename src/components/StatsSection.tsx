import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiAward, FiGlobe } from "react-icons/fi";

const stats = [
  { icon: FiUsers, value: "150+", label: "Klien Puas" },
  { icon: FiBriefcase, value: "300+", label: "Proyek Selesai" },
  { icon: FiAward, value: "15+", label: "Penghargaan" },
  { icon: FiGlobe, value: "10+", label: "Tahun Pengalaman" },
];

const StatsSection = () => (
  <section className="gradient-primary py-12 px-4 lg:px-8">
    <div className="max-w-7xl mx-auto">
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
            <stat.icon className="mx-auto mb-3" size={28} />
            <div className="text-2xl md:text-3xl font-extrabold">{stat.value}</div>
            <div className="text-xs opacity-80 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
