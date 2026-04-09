import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Tim Royal Citra Abadi" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-navy/80" />
    </div>
    <div className="relative container-main px-4 md:px-8 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <span className="inline-block gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          Solusi Digital Terpercaya
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-navy-foreground leading-tight mb-6">
          Kreativitas Bertemu{" "}
          <span className="text-primary">Teknologi</span> Terdepan
        </h1>
        <p className="text-lg text-navy-foreground/70 mb-8 max-w-lg">
          PT Royal Citra Abadi menghadirkan solusi teknologi informasi terbaik untuk mendorong pertumbuhan bisnis Anda ke level berikutnya.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#layanan"
            className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition"
          >
            Jelajahi Layanan <FiArrowRight />
          </a>
          <a
            href="#tentang"
            className="border border-primary-foreground/30 text-navy-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition"
          >
            Tentang Kami
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
