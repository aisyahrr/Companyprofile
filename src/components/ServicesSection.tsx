import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCode, FiSmartphone, FiLayout, FiServer, FiShield, FiBarChart2, FiArrowRight } from "react-icons/fi";

export const services = [
  {
    id: "web-development",
    icon: FiCode,
    title: "Pengembangan Website",
    short: "Website profesional, cepat, dan responsif untuk bisnis Anda.",
    description: "Kami membangun website berkualitas tinggi menggunakan teknologi terbaru. Mulai dari company profile, e-commerce, hingga web application yang kompleks. Setiap proyek dikerjakan dengan standar internasional dan optimasi SEO terbaik.",
    features: ["Website Company Profile", "E-Commerce", "Web Application", "Landing Page", "CMS Custom"],
  },
  {
    id: "mobile-app",
    icon: FiSmartphone,
    title: "Aplikasi Mobile",
    short: "Aplikasi mobile native dan cross-platform untuk iOS & Android.",
    description: "Tim kami mengembangkan aplikasi mobile yang intuitif dan performa tinggi. Menggunakan React Native dan Flutter untuk pengalaman pengguna yang optimal di semua platform.",
    features: ["Aplikasi iOS", "Aplikasi Android", "Cross-Platform", "UI/UX Mobile", "Maintenance Aplikasi"],
  },
  {
    id: "ui-ux-design",
    icon: FiLayout,
    title: "Desain UI/UX",
    short: "Desain antarmuka yang intuitif dan pengalaman pengguna terbaik.",
    description: "Kami merancang antarmuka pengguna yang menarik dan mudah digunakan. Proses desain kami berbasis riset pengguna dan testing untuk memastikan hasil optimal.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
  },
  {
    id: "cloud-server",
    icon: FiServer,
    title: "Cloud & Server",
    short: "Infrastruktur cloud yang aman, scalable, dan handal.",
    description: "Kami menyediakan solusi cloud computing dan manajemen server yang memastikan bisnis Anda berjalan tanpa gangguan dengan uptime tinggi.",
    features: ["Cloud Migration", "Server Management", "DevOps", "Monitoring 24/7", "Backup & Recovery"],
  },
  {
    id: "cyber-security",
    icon: FiShield,
    title: "Keamanan Siber",
    short: "Proteksi data dan sistem dari ancaman keamanan digital.",
    description: "Layanan keamanan siber komprehensif untuk melindungi aset digital Anda. Mulai dari audit keamanan, penetration testing, hingga implementasi solusi keamanan.",
    features: ["Security Audit", "Penetration Testing", "Firewall Management", "Data Encryption", "Incident Response"],
  },
  {
    id: "digital-marketing",
    icon: FiBarChart2,
    title: "Digital Marketing",
    short: "Strategi pemasaran digital untuk meningkatkan brand awareness.",
    description: "Kami membantu Anda menjangkau lebih banyak pelanggan dengan strategi digital marketing yang terukur dan efektif.",
    features: ["SEO Optimization", "Social Media Marketing", "Content Marketing", "Google Ads", "Analytics & Reporting"],
  },
];

const ServicesSection = () => (
  <section id="layanan" className="section-padding bg-section-alt">
    <div className="container-main">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Layanan Kami</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Solusi untuk <span className="text-primary">Bisnis Anda</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              to={`/layanan/${service.id}`}
              className="block bg-card rounded-xl p-6 shadow-sm hover:shadow-lg border hover:border-primary/30 transition-all group h-full"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground mb-4">
                <service.icon size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.short}</p>
              <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Selengkapnya <FiArrowRight />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
