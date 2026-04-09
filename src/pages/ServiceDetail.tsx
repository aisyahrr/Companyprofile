import { useParams, Link } from "react-router-dom";
import { services } from "@/components/ServicesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Layanan tidak ditemukan</h1>
          <Link to="/" className="text-primary font-semibold hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 section-padding">
        <div className="container-main">
          <Link to="/#layanan" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline">
            <FiArrowLeft /> Kembali ke Layanan
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground mb-6">
                <service.icon size={28} />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{service.title}</h1>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-xl border shadow-sm p-8"
            >
              <h3 className="font-bold text-lg mb-6">Yang Kami Tawarkan</h3>
              <div className="space-y-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <FiCheck size={12} />
                    </div>
                    <span className="font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <a
                href="/#kontak"
                className="block mt-8 gradient-primary text-primary-foreground py-3 rounded-lg font-semibold text-center hover:opacity-90 transition"
              >
                Konsultasi Gratis
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
