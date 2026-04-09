import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCode, FiSmartphone, FiLayout, FiServer, FiShield, FiBarChart2, FiArrowRight } from "react-icons/fi";

export const services = [
  {
    id: "web-development",
    icon: FiCode,
    title: "Pengembangan Website",
    short: "Website profesional, cepat, dan responsif untuk mendukung pertumbuhan bisnis Anda secara online.",
    description: "Kami membangun website berkualitas tinggi menggunakan teknologi terbaru. Mulai dari company profile, e-commerce, hingga web application yang kompleks.",
    features: ["Website Company Profile", "E-Commerce", "Web Application", "Landing Page", "CMS Custom"],
  },
  {
    id: "mobile-app",
    icon: FiSmartphone,
    title: "Aplikasi Mobile",
    short: "Aplikasi mobile native dan cross-platform untuk iOS & Android dengan performa tinggi.",
    description: "Tim kami mengembangkan aplikasi mobile yang intuitif dan performa tinggi menggunakan React Native dan Flutter.",
    features: ["Aplikasi iOS", "Aplikasi Android", "Cross-Platform", "UI/UX Mobile", "Maintenance Aplikasi"],
  },
  {
    id: "ui-ux-design",
    icon: FiLayout,
    title: "Desain UI/UX",
    short: "Desain antarmuka yang intuitif dan pengalaman pengguna terbaik berbasis riset.",
    description: "Kami merancang antarmuka pengguna yang menarik dan mudah digunakan dengan proses desain berbasis riset.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
  },
  {
    id: "cloud-server",
    icon: FiServer,
    title: "Cloud & Server",
    short: "Infrastruktur cloud yang aman, scalable, dan handal untuk bisnis Anda.",
    description: "Solusi cloud computing dan manajemen server yang memastikan bisnis Anda berjalan tanpa gangguan.",
    features: ["Cloud Migration", "Server Management", "DevOps", "Monitoring 24/7", "Backup & Recovery"],
  },
  {
    id: "cyber-security",
    icon: FiShield,
    title: "Keamanan Siber",
    short: "Proteksi data dan sistem dari ancaman keamanan digital secara komprehensif.",
    description: "Layanan keamanan siber komprehensif untuk melindungi aset digital Anda.",
    features: ["Security Audit", "Penetration Testing", "Firewall Management", "Data Encryption", "Incident Response"],
  },
  {
    id: "digital-marketing",
    icon: FiBarChart2,
    title: "Digital Marketing",
    short: "Strategi pemasaran digital terukur untuk meningkatkan brand awareness dan penjualan.",
    description: "Kami membantu Anda menjangkau lebih banyak pelanggan dengan strategi digital marketing yang efektif.",
    features: ["SEO Optimization", "Social Media Marketing", "Content Marketing", "Google Ads", "Analytics & Reporting"],
  },
];

const ServicesSection = () => (
  <section id="layanan" className="py-20 px-4 lg:px-8 mx-0 md:mx-12">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Layanan Kami</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Layanan yang Kami Sediakan untuk{" "}
          <span className="text-primary">Mengembangkan Bisnis</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 6).map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
                to={`/layanan/${service.id}`}
                className="group relative block bg-card rounded-2xl p-7 border hover:border-primary/20 transition-all duration-300 h-full overflow-hidden"
              >
                {/* ICON */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <service.icon size={24} />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.short}
                </p>

                {/* LINK */}
                <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <FiArrowRight size={14} />
                </span>

                {/* 🔵 BOTTOM CURVE EFFECT */}
                <div className="absolute left-0 bottom-0 w-full h-2 bg-primary rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                {/* ✨ HOVER LIFT */}
                <div className="absolute inset-0 rounded-2xl group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 pointer-events-none"></div>
              </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
